
const sesionConfig = {
    secret: "shhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        secure: false,
    }
};

module.exports = sesionConfig;