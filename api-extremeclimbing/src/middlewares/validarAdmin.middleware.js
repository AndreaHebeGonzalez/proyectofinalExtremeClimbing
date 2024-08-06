const validarAdmin = (req, res, next) => {
    if(req.session && req.session.rol === "admin") {
        next();
    } else {
        return res.status(403).json({ msg:'Acceso denegado' }); 
    };
};

module.exports = { validarAdmin };