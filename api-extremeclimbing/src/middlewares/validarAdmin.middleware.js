const validarAdmin = (req, res, next) => {
    if(req.session && req.session.rol === "admin") {
        next();
    } else {
        return res.status(403).json({ msg:'Acceso denegado' }); 
        //El código de estado HTTP 403 significa "Forbidden" (Prohibido). Este código se utiliza cuando el servidor entiende la solicitud, pero se niega a cumplirla debido a restricciones en el lado del servidor
    };
};

module.exports = { validarAdmin };