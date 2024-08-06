const { body } = require('express-validator');

const validarNombre = body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio') 
    .isString()
    .withMessage('El nombre tiene que ser un string')
    .isLength({
        min: 3
    })
    .withMessage('El nombre tiene que tener al menos 3 caracteres');

const validarApellido = body('apellido')
    .notEmpty()
    .withMessage('El apellido es obligaotorio')
    .isString()
    .withMessage('El apellido tiene que ser un string')
    .isLength({
        min: 3
    })
    .withMessage('El apellido tiene que tener al menos 3 caracteres');


const validarFormatoNacimiento = body('nacimiento')

.notEmpty()
.withMessage('La fecha de nacimiento es obligatoria')
.isISO8601()
.withMessage('La fecha de nacimiento debe estar en formato ISO8601');

const validarEdad = body('nacimiento') //!ESTE VALIDADOR GENERA ERROR DE 422 Unprocessable Entity PUEDE QUE TENGA QUE VER CON EL FORMATO DE LA FECHA
    .custom((value) => {
        try {
            const nacimiento = new Date(value);
            console.log(nacimiento);
            const fechaActual = new Date();
            console.log(fechaActual);
            const edad = fechaActual.getFullYear() - nacimiento.getFullYear();
            console.log(edad);
            if (edad > 18) {
                return true
            } else {
                throw new Error('La persona debe ser mayor de 18 años');
            }; 
        } catch (error) {
            console.error('Error al procesar la fecha de nacimiento:', error);
        }
        
    });

    const validarEmail = body('email')
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('Por favor, ingresa un correo electronico valido')
    

    const validarContraseña = body('contraseña')
        .notEmpty() 
        .withMessage('La contraseña es obligatoria')
        .isLength({ min:8 })
        .withMessage('La contraseña debe contener un mínimo de 8 caracteres')
        .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayuscula')
        .matches(/[0-9]/).withMessage('La contraseña debe contener al menos 1 digito del 0 al 9')

    const validarAutenticacion = (req, res, next) => {
        if(req.session.idUsuario) {
            next()
        } else {
            res.redirect('/login');
        };
    };

module.exports = {
    validarNombre,
    validarApellido,
    validarFormatoNacimiento,
    validarEdad,
    validarEmail,
    validarContraseña,
    //! Faltan estos validadores
    /* validarTelefono,
    validarProvincia,
    validarLocalidad,
    validarCalle,
    validarNumCalle, */
    validarAutenticacion
};

