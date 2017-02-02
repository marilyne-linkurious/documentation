/**
 * Copyright Linkurious SAS 2012 - 2017
 * Created by david on 2017-01-25.
 */
'use strict';

/**
 * @param {string} rootPath
 * @param {string} ajaxContentClasses
 * @param {function|null} onAjaxLoad
 */
function initDocSite(rootPath, ajaxContentClasses, onAjaxLoad) {

  // scroll "current" menu item into visible pane
  var menu = document.getElementsByClassName('menu')[0];
  if (menu) {
    var offset = document.getElementsByClassName('current')[0].offsetTop;
    menu.scrollTop = offset - 15;
  }

  initVersionPopup(rootPath);

  // make menu links AJAX links
  var menuLinks = document.querySelectorAll('.menu a');
  makeAjaxLinks(menuLinks, ajaxContentClasses, onAjaxLoad);

}

// --------------
// VERSION POPUP
// --------------

function initVersionPopup(rootPath) {
  var versionPopup = document.getElementById('versionPopup');
  var popupLayer = document.getElementById('popupLayer');

  // add version popup close button
  onClick('versionClose', function() {
    versionPopup.style.display = 'none';
    popupLayer.style.display = 'none';
  });
  onClick('popupLayer', function() {
    versionPopup.style.display = 'none';
    popupLayer.style.display = 'none';
  });

  // add version popup open button
  onClick('versionOpen', function() {
    versionPopup.style.display = 'block';
    popupLayer.style.display = 'block';
  });

  // load versions menu
  loadAvailableVersions(rootPath, function(err, versions) {
    if (err) {
      console.log('XHR error: ' + (err.message ? err.message : JSON.stringify(err)));
      versions = ['latest'];
    } else {
      versions.unshift('latest');
    }

    //console.log(JSON.stringify(versions, null, ' '))
    var list = document.getElementById('versionList');
    var html = ['<ul>'];
    for (var i = 0, l = versions.length; i < l; ++i) {
      html.push(
        '<li><a class="versionLink" href="',
        rootPath,
        '/../',
        versions[i],
        '">Manual for version <strong>',
        versions[i],
        '</strong></a></li>\n'
      );
    }
    html.push('</ul>');
    list.innerHTML = html.join('');
  });
}

/**
 * @param {string} itemId
 * @param {function} fn
 */
function onClick(itemId, fn) {
  document.getElementById(itemId).addEventListener('click', fn, false);
}

/**
 * @param {string} rootPath
 * @param {function(Error, string[]|string)} cb
 */
function loadAvailableVersions(rootPath, cb) {
  var oReq = new XMLHttpRequest();
  var CT_JSON = 'application/json';

  oReq.addEventListener("load", function() {
    if (oReq.status !== 200) {
      return cb(new Error('Unexpected HTTP status: ' + oReq.status), oReq.responseText);
    }

    var ct = oReq.getResponseHeader('Content-Type');
    if ((ct + '').indexOf(CT_JSON) !== 0) {
      return cb(new Error('Unexpected Content-Type ' + ct), oReq.responseText);
    }

    try {
      return cb(null, JSON.parse(oReq.responseText))
    } catch(e) {
      return cb(new Error('JSON parse error: ' + e.message), oReq.responseText);
    }
  });

  oReq.addEventListener("error", function(e) {
    cb(e, null);
  });

  oReq.open("GET", rootPath + "/../");
  oReq.setRequestHeader('Accept', CT_JSON);
  oReq.send();
}


// ----------------
// AJAX NAVIGATION
// ----------------

var USE_AJAX_LINKS = true;

var HTML_PARSER = new DOMParser();

/**
 *
 * @param {string} url
 * @param {function(Error, XMLHttpRequest)} cb
 */
function httpReq(url, cb) {
  var oReq = new XMLHttpRequest();

  oReq.addEventListener("load", function() {
    if (oReq.status !== 200) {
      return cb(new Error('Unexpected HTTP status: ' + oReq.status), oReq);
    }
    cb(null, oReq);
  });

  oReq.addEventListener("error", function(e) {
    cb(e, null);
  });

  //console.log(JSON.stringify(url, null, ' '));
  oReq.open("GET", url);
  oReq.send();
}

/**
 * @param {string} url
 * @returns {string}
 */
function fixUrl(url) {
  return url.endsWith('/') ? url : url + '/';
}

/**
 * @param {string} url1
 * @param {string} url2
 * @returns {boolean}
 */
function sameFolder(url1, url2) {
  return url1.split('/').length === url2.split('/').length;
}

/**
 * @param {NodeList<HTMLAnchorElement>} links list of HTMLAnchorElement
 * @param {string[]} classes
 * @param {function|null} onAjaxLoad
 */
function makeAjaxLinks(links, classes, onAjaxLoad) {

  /**
   * @param {HTMLAnchorElement} link
   */
  function makeLink(link) {
    var url = fixUrl(link.href);

    link.addEventListener('click', function(event) {
      var changedFolder = !sameFolder(url, fixUrl(document.location.href));

      if (USE_AJAX_LINKS && !changedFolder) {
        event.preventDefault();
        ajaxOpenPage(links, url, classes, true, onAjaxLoad);
      } else {
        return true;
      }
    }, false);
  }

  for (var i = 0, l = links.length; i < l; ++i) {
    makeLink(links[i]);
  }

  window.addEventListener('popstate', function() {
    ajaxOpenPage(links, document.location.href, classes, false, onAjaxLoad);
  }, false);
}

/**
 * @param {NodeList} links
 * @param {string} targetUrl
 * @param {string[]} classes
 * @param {boolean} addToHistory
 * @param {function|null} onAjaxLoad
 */
function ajaxOpenPage(links, targetUrl, classes, addToHistory, onAjaxLoad) {

  for (var i = 0, l = links.length; i < l; ++i) {
    var uu = links[i].href;
    if (uu === targetUrl || uu + '/' === targetUrl) {
      links[i].className = 'current';
    } else {
      links[i].className = '';
    }
  }

  httpReq(targetUrl, function(err, req) {
    if (err) {
      console.log('AJAX load error: ' + err.message);
      USE_AJAX_LINKS = false;
      return;
    }

    // parse response doc
    var newDoc = HTML_PARSER.parseFromString(req.responseText, "text/html");

    // set navigation
    document.title = newDoc.title;
    if (!targetUrl.endsWith('/')) { targetUrl = targetUrl + '/'; }

    if (addToHistory) {
      window.history.pushState({ajax: true, url: targetUrl}, newDoc.title, targetUrl);
    }

    // replace content
    for (var i = 0, l = classes.length; i < l; ++i) {
      document.getElementsByClassName(classes[i])[0].innerHTML = newDoc.getElementsByClassName(classes[i])[0].innerHTML;
    }

    if (onAjaxLoad) {
      onAjaxLoad();
    }

    // reset scroll
    document.body.scrollTop = 0;
  });
}
