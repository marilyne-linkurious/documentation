window.onload = function() {

    _.forEach($('textarea'), textarea => {
        var myCodeMirror = CodeMirror.fromTextArea(textarea);
    });


};
