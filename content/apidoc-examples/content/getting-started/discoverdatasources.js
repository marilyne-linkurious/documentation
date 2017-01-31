request.get({
    uri: '{{baseurl}}/api/dataSources'
}, function(err, res) {
    console.log(res.body);
});
