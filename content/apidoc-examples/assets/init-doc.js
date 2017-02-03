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

  window.LKDOC.initVersionPopup(rootPath);

  // make menu links AJAX links
  var menuLinks = document.querySelectorAll('.menu a');
  window.LKDOC.makeAjaxLinks(menuLinks, ajaxContentClasses, onAjaxLoad);

}
