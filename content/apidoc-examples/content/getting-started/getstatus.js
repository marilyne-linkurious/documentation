request.get({
    uri: '{{baseurl}}/api/status'
}, function(err, res) {
    console.log(res.body);
});
