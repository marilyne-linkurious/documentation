request.get({
    uri: 'http://crunchbase.linkurio.us/api/status'
}, function(err, res) {
    console.log(res.body);
});
