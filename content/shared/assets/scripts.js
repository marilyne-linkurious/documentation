/**
 * Copyright Linkurious SAS 2012 - 2017
 * Created by david on 2017-01-25.
 */
'use strict';

/**
 * @param {string} rootPath
 * @param {function(Error, string[]|string)} cb
 */
function getVersions(rootPath, cb) {
  var oReq = new XMLHttpRequest();
  var CT_JSON = 'application/json';

  oReq.addEventListener("load", function() {
    if (oReq.status !== 200) {
      return cb(new Error('Unexpected HTTP status: ' + oReq.status), oReq.responseText);
    }

    var ct = oReq.getResponseHeader('Content-Type');
    if (ct !== CT_JSON) {
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

/**
 * @param {string} itemId
 * @param {function} fn
 */
function onClick(itemId, fn) {
  document.getElementById(itemId).addEventListener('click', fn, false);
}

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

var useAjaxLinks = true;

/**
 * @param {HTMLAnchorElement} link
 * @param {string[]} classes
 */
function makeAjaxLink(links, link, classes) {
  var parser = new DOMParser();
  var url = link.href;
  link.addEventListener('click', function(event) {
    if (useAjaxLinks) {
      event.preventDefault();
    } else {
      return true;
    }

    for (var i = 0, l = links.length; i < l; ++i) {
      if (link === links[i]) {
        links[i].className = 'current';
      } else {
        links[i].className = '';
      }
    }

    httpReq(url, function(err, req) {
      if (err) {
        console.log('state change error: ' + err.message);
        useAjaxLinks = false;
        return;
      }

      // parse response doc
      var newDoc = parser.parseFromString(req.responseText, "text/html");

      // set navigation
      document.title = newDoc.title;
      if (!url.endsWith('/')) { url = url + '/'; }
      window.history.pushState({}, newDoc.title, url);

      // replace content
      for (var i = 0, l = classes.length; i < l; ++i) {
        document.getElementsByClassName(classes[i])[0].innerHTML = newDoc
          .getElementsByClassName(classes[i])[0].innerHTML;
      }

      // reset scroll
      document.body.scrollTop = 0;
    });

  }, false);
}

/**
 * @param {string} rootPath
 */
function initDocSite(rootPath) {
  var versionPopup = document.getElementById('versionPopup');
  var popupLayer = document.getElementById('popupLayer');

  // scroll "current" menu item into visible pane
  var menu = document.getElementsByClassName('menu')[0];
  if (menu) {
    var offset = document.getElementsByClassName('current')[0].offsetTop;
    menu.scrollTop = offset - 15;
  }

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
  getVersions(rootPath, function(err, versions) {
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

  // make menu links AJAX links
  var link;
  var menuLinks = document.querySelectorAll('.menu a');
  for (var i = 0, l = menuLinks.length; i < l; ++i) {
    makeAjaxLink(menuLinks, menuLinks[i], ['content', 'content-nav', 'content-title']);
  }
}
