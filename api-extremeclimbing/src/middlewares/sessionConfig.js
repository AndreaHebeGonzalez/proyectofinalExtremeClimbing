const sesion = require('express-session');

const sesionConfig = {
    secret: "shhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
};

module.exports = sesionConfig;
