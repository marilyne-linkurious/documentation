// ----------------
// AJAX NAVIGATION
// ----------------
(function() {
  'use strict';

  if (!window.LKDOC) { window.LKDOC = {}; }

  var USE_AJAX_LINKS = true;
  var HTML_PARSER = new DOMParser();
  var ajaxState = false;

  /**
   * @param {NodeList<HTMLAnchorElement>} links list of HTMLAnchorElement
   * @param {string[]} classes
   * @param {function|null} onAjaxLoad
   */
  window.LKDOC.makeAjaxLinks = function makeAjaxLinks(links, classes, onAjaxLoad) {

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

    window.addEventListener('popstate', function(e) {
      // use default behavior if:
      // - the event is a hashchange (used clicked an hash link in the page)
      // - the current state was not loaded via ajax
      if (document.location.hash || (!ajaxState && !(e.state && e.state.ajax))) {
        return true;
      }

      ajaxOpenPage(links, document.location.href, classes, false, onAjaxLoad);
    }, false);
  };

  /**
   *
   * @param {string} url
   * @param {function(Error, XMLHttpRequest)} cb
   */
  function httpReq(url, cb) {
    var oReq = new XMLHttpRequest();

    oReq.addEventListener('load', function() {
      if (oReq.status !== 200) {
        return cb(new Error('Unexpected HTTP status: ' + oReq.status), oReq);
      }
      cb(null, oReq);
    });

    oReq.addEventListener('error', function(e) {
      cb(e, null);
    });

    //console.log(JSON.stringify(url, null, ' '));
    oReq.open('GET', url);
    oReq.send();
  }

  /**
   * @param {string} url
   * @returns {string}
   */
  function fixUrl(url) {
    return url.endsWith('/') || url.endsWith('.html') ? url : url + '/';
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
      var newDoc = HTML_PARSER.parseFromString(req.responseText, 'text/html');

      // set navigation
      targetUrl = fixUrl(targetUrl);

      if (addToHistory) {
        //console.log('+h '+JSON.stringify(newDoc.title, null, ' '))
        window.history.pushState({ajax: true}, newDoc.title, targetUrl);
      }

      document.title = newDoc.title;

      // replace content
      for (var i = 0, l = classes.length; i < l; ++i) {
        document.getElementsByClassName(classes[i])[0].innerHTML = newDoc.getElementsByClassName(classes[i])[0].innerHTML;
      }

      ajaxState = true;

      if (onAjaxLoad) {
        onAjaxLoad();
      }

      // reset scroll
      document.body.scrollTop = 0;
    });
  }


})();

