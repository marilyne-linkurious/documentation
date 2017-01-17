/**
 * @param {string}   src Code to eval
 * @param {function} log Log function
 */
function evalCode(src, log) {
    src = 'try { with (sandbox) {' + src + '} } catch (e) {sandbox.console.log(e)}';
    new Function('sandbox', src) ({
        request: request.defaults({json: true, log: log}), console: {log: log}, window: null, document: null, alert: null
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
                    responseBox.setValue(responseBox.getValue() + text + '\n')
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
