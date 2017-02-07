// --------------
// VERSION POPUP
// --------------
(function() {
  'use strict';
  if (!window.LKDOC) { window.LKDOC = {}; }

  /**
   * @param {string} rootPath
   * @param {string} [linkSuffix=""]
   */
  window.LKDOC.initVersionPopup = function initVersionPopup(rootPath, linkSuffix) {
    if (!linkSuffix) { linkSuffix = ''; }
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
          linkSuffix,
          '">Manual for version <strong>',
          versions[i],
          '</strong></a></li>\n'
        );
      }
      html.push('</ul>');
      list.innerHTML = html.join('');
    });
  };

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

})();
