// creando una instancia de un enrutador de Express.

const Router = require('express');

const usuariosRouter = Router();

const usuariosController = require('../controllers/usuarios.controller');

//Importo validadores

const { validarErrores } = require('../middlewares/validadorerr.middleware');

const {
    validarNombre,
    validarApellido,
    validarFormatoNacimiento,
    validarEdad,
    validarEmail,
    validarContraseña,
    validarAutenticacion
} = require('../middlewares/validadoresUsuario.middleware');

/*
    obtenerTodos,
    signUp,
    login,
    logout,
    actualizarUsuario,
*/

//ruta obtener todos:

usuariosRouter.get('/', usuariosController.obtenerTodos); //!Funcionando

usuariosRouter.get("/perfil", usuariosController.verificarSesion);

usuariosRouter.get(
    '/:id',
    usuariosController.buscarPorId
);

usuariosRouter.post(//!Funcionando
    "/signin", 
    [validarEmail, validarContraseña, validarErrores], 
    usuariosController.signIn
);

usuariosRouter.post(//!Funcionando
    "/",
    [validarNombre, validarApellido, validarFormatoNacimiento, validarEmail, validarContraseña, validarErrores], 
    usuariosController.signUp
);

usuariosRouter.post("/signout", usuariosController.signOut); //!Funcionando



usuariosRouter.put( //!Funcionando
    "/actualizarEmail", 
    [validarAutenticacion, validarEmail, validarErrores], 
    usuariosController.actualizarEmail
);

usuariosRouter.put(
    "/actualizarPassword", 
    [validarAutenticacion, validarContraseña, validarErrores], 
    usuariosController.actualizarContraseña
);

usuariosRouter.delete( //!Funcionando
    "/",
    [validarAutenticacion],
    usuariosController.borrarUsuario
);

module.exports = usuariosRouter;