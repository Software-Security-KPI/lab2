const request = require('request');
require('dotenv').config();

const getTokenOptions = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form:
    {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: 'client_credentials'
    }
};

const createUserOptions = (token) => {
    return {
        method: 'POST',
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
        headers: { 
            'content-type': 'application/json', 
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            'email': 'john.doe2@gmail.com',
            'given_name': 'John',
            'family_name': 'Doe',
            'name': 'John Doe',
            'nickname': 'Johnny',
            'picture': 'https://secure.gravatar.com/avatar/15626c5e0c749cb912f9d1ad48dba440?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png',
            'connection': 'Username-Password-Authentication',
            'password': 'P4ssW0rd'
        })
    }
};

request(getTokenOptions, (error, response, body) => {
    if (error) throw new Error(error);

    const token = JSON.parse(body).access_token;
    console.log(token);

    request(createUserOptions(token), (error, response, body) => {
        if (error) throw new Error(error);

        console.log(body);
    });
});