const express = require('express');
const session = require('express-session');
const { Issuer, generators } = require('openid-client');
const app = express();

let client;

// Initialize OpenID Client
async function initializeClient() {
    const issuer = await Issuer.discover('https://cognito-idp.us-east-1.amazonaws.com/us-east-1_wy31Eebb');
    client = new issuer.Client({
        client_id: '7nneifpukjuedpjiabncuakt19',
        client_secret: '<client secret>', // Replace with your actual client secret
        redirect_uris: ['http://localhost:5500/Dashboard/authentication/signin.html'],
        response_types: ['code']
    });
};

initializeClient().catch(console.error);

// Configure session middleware
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}));

// Authentication middleware
const checkAuth = (req, res, next) => {
    req.isAuthenticated = !!req.session.userInfo;
    next();
};

// Home route
app.get('/', checkAuth, (req, res) => {
    res.render('home', {
        isAuthenticated: req.isAuthenticated,
        userInfo: req.session.userInfo
    });
});

// Login route
app.get('/login', (req, res) => {
    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce;
    req.session.state = state;

    const authUrl = client.authorizationUrl({
        scope: 'phone openid email',
        state: state,
        nonce: nonce,
    });

    res.redirect(authUrl);
});

// Callback URL handling
app.get('/Dashboard/authentication/signin.html', async (req, res) => {
    try {
        const params = client.callbackParams(req);
        const tokenSet = await client.callback(
            'http://localhost:5500/Dashboard/authentication/signin.html',
            params,
            {
                nonce: req.session.nonce,
                state: req.session.state
            }
        );

        const userInfo = await client.userinfo(tokenSet.access_token);
        req.session.userInfo = userInfo;

        res.redirect('/');
    } catch (err) {
        console.error('Callback error:', err);
        res.redirect('/');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    const logoutUrl = `https://<user pool domain>/logout?client_id=7nneifpukjuedpjiabncuakt19&logout_uri=http://localhost:5500/Dashboard/authentication/signin.html`;
    res.redirect(logoutUrl);
});

// Set view engine
app.set('view engine', 'ejs');

// Start the server
app.listen(5500, () => {
    console.log('Server is running on http://localhost:5500');
});