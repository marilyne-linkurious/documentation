/**
 * @param {string}   src Code to eval
 * @param {function} log Log function
 */
function evalCode(src, log) {
    src = 'with (sandbox) {' + src + '}';
    try {
        new Function('sandbox', src)({
            request: request.defaults({json: true, log: log}),
            console: {log: log},
            window: null,
            document: null,
            alert: null
        });
    } catch (e) {
        log(e)
    }
}

/**
 * Add the class 'cm-url' to any link in a CodeMirror instance.
 *
 * @param {CodeMirror} cm
 */
function hyperlinkOverlay(cm) {
  if (!cm) return;

  const rx_word = "\" "; // Define what separates a word

  function isUrl(s) {
    return s.indexOf('http') === 0;
  }

  cm.addOverlay({
        token: function(stream) {
          let ch = stream.peek();
          let word = "";

          if (rx_word.includes(ch) || ch==='\uE000' || ch==='\uE001') {
            stream.next();
            return null;
          }

          while ((ch = stream.peek()) && !rx_word.includes(ch)) {
            word += ch;
            stream.next();
          }

          if (isUrl(word)) return "url"; // CSS class: cm-url
        }},
      { opaque : true }  // opaque will remove any spelling overlay etc
  );
}

/**
 * Add to any tag with id 'cm-url' an anchor that redirects to the content.
 */
function hyperlinkRefresh() {
  _.forEach($('.cm-url'), function (cmurl) {
    cmurl = $(cmurl);

    // if it's not already wrapped in a A tag
    if (cmurl.parent().prop("tagName") !== 'A') {
      var newA = $('<a>');
      newA.attr("href", "javascript:;");
      newA.attr("onClick", `window.open('${cmurl.text()}');`);

      cmurl.wrap(newA);
    }
  });
}

window.onload = function() {
    // scroll "current" menu item into visible pane
    var offset = document.getElementsByClassName('current')[0].offsetTop;
    document.getElementsByClassName('menu')[0].scrollTop = offset - 15;

    var allRequestBoxes = [];

    // for each textarea (created by dokapi)
    _.forEach($('textarea'), function(textarea) {
        // we replace it with a codemirror box
        var requestBox = CodeMirror.fromTextArea(textarea, {
            lineNumbers: true
        });

        allRequestBoxes.push(requestBox);

        var div = $('<div>');
        // we create the button to execute the code
        var button = $('<input>').attr({ type: 'button', value: 'Run code'});
        div.append(button);
        var responseDiv = $('<div>');
        div.append(responseDiv);

        // on button click
        button.click(function() {
            // we clean up previous responses
            responseDiv.empty();

            var textarea = $('<textarea>');
            responseDiv.append(textarea);
            // we create a textarea (an uneditable codemirror box) for the response
            var responseBox = CodeMirror.fromTextArea(textarea.get(0), {readOnly: true});
            hyperlinkOverlay(responseBox);

            // we execute the code in a sandbox. console.log is redirected to the responseBox
            evalCode(requestBox.getValue(), function(text) {
                if (text instanceof Error) {
                    // if it's an error we color it red
                    var beforeLineCount = responseBox.lineCount();
                    responseBox.setValue(responseBox.getValue() + text.stack + '\n');
                    responseBox.markText({line: beforeLineCount - 1, ch: 0}, {line: responseBox.lineCount() - 1, ch: 0}, {css: "color: red"});
                } else if (typeof text === 'object') {
                    // we pass it to JSON::stringify, that it's going to prettify it
                    responseBox.setValue(responseBox.getValue() + JSON.stringify(text, null, 2) + '\n')
                } else {
                    responseBox.setValue(responseBox.getValue() + text + '\n');
                    hyperlinkRefresh();
                    hyperlinkRefresh();
                }
            });
        });

        div.insertAfter(requestBox.getWrapperElement());
    });

    // show content after every codemirror block was created
    $('.content').css("display", "block");
    _.forEach(allRequestBoxes, function(codeMirrorBox) {
       codeMirrorBox.refresh();
    });
};
