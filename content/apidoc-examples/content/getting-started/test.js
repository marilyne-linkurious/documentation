req.get({
    json: true,
    uri: 'http://crunchbase.linkurio.us/api/status'
}, function(err, res) {
    console.log(res.body);
});
