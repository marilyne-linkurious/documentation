request.post({
    uri: 'http://crunchbase.linkurio.us/api/auth/login',
    body: {
        usernameOrEmail: 'student@linkurio.us',
        password: 'student0'
    }
}, function(err, res) {
    console.log(res.body);

    request.get({
        uri: 'http://crunchbase.linkurio.us/api/auth/authenticated'
    }, function(err, res) {
        console.log(res);
    })
});