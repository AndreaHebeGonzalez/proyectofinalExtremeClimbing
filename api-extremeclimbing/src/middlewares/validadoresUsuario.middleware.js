const { body } = require('express-validator');

/* 
validadores:
validador de nombre y apellido

validador de nacimiento
validador de contraseña
*/

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

//en un elemento <input> con type="date" en HTML, el valor del input se devuelve como una cadena en formato ISO 8601 cuando el usuario selecciona una fecha. La cadena se formatea en el siguiente formato: "YYYY-MM-DD".
//Se utilizará express-validator y la libreria Luxon para convertir la fecha en formato de texto ISO 8601 a un objeto de tipo DateTime de luxon.


const validarFormatoNacimiento = body('nacimiento')
//Desde el frontend la fecha de nacimiento se envía en formato ISO8601, 

//en un elemento <input> con type="date" en HTML, el valor del input se devuelve como una cadena en formato ISO 8601 cuando el usuario selecciona una fecha. La cadena se formatea en el siguiente formato: "YYYY-MM-DD".
.notEmpty()
.withMessage('La fecha de nacimiento es obligatoria')
.isISO8601()
.withMessage('La fecha de nacimiento debe estar en formato ISO8601');

const validarEdad = body('nacimiento') 
    .custom((value) => {
        const nacimiento = new Date(value);
        console.log(nacimiento);
        const fechaActual = new Date();
        console.log(fechaActual);
        const edad = fechaActual.getFullYear() - nacimiento.getFullYear();
        console.log(edad);
        if (edad > 18) {
            return true
        } else {
            //Capturo la excepción y genero un objeto Error para que detenga la ejecucion del codigo
            throw new Error('La persona debe ser mayor de 18 años');
        }; 
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
        /*
        matches
        Es un método de express-validator que se utiliza para aplicar validaciones basadas en expresiones regulares. Nuevamente, lamento la confusión y agradezco tu paciencia.
        */

    
    //Centralizo validacion de autenticacion
    const validarAutenticacion = (req, res, next) => {
        if(req.session.idUsuario) {
            next()
        } else {
            res.redirect('/login');
        };
    };
/*
Aclaracion:
Si puedo garantizar que req.session.idUsuario siempre está correctamente configurado y que solo los usuarios autenticados pueden llegar a la ruta del controlador de actualización de contraseña, es posible que no necesites un middleware de autenticación adicional en ese controlador específico.
Sin embargo, si hay otras rutas o controladores en tu aplicación que requieren autenticación, o si quieres centralizar la lógica de autenticación en un solo middleware para mantener la consistencia en toda la aplicación, entonces tener un middleware de autenticación general podría ser beneficioso.
*/
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

/*
formato ISO 8601:

El formato ISO 8601 es un estándar internacional para la representación de fechas y horas. Define varios formatos para representar fechas y horas de manera legible y consistente. El formato básico para fechas en ISO 8601 es el siguiente:

YYYY-MM-DD
Donde:

YYYY: Representa el año con cuatro dígitos (por ejemplo, 2022).
MM: Representa el mes con dos dígitos, comenzando desde 01 para enero hasta 12 para diciembre.
DD: Representa el día del mes con dos dígitos, comenzando desde 01 hasta 31.
Este formato proporciona una representación clara y ordenada de la fecha, y es ampliamente utilizado en sistemas informáticos y en la comunicación de fechas en formatos de intercambio de datos, como en JSON, XML, y otros.

Ejemplos de fechas en formato ISO 8601:

2022-01-15: 15 de enero de 2022.
1990-12-31: 31 de diciembre de 1990.

Cuando hablamos de ISO 8601 en el contexto de fechas y horas, también puede incluir información sobre la hora del día, la zona horaria, y otros detalles. Por ejemplo, una representación completa de fecha y hora podría ser:

YYYY-MM-DDTHH:mm:ssZ

Donde:

THH:mm:ss: Representa la hora, los minutos y los segundos (por ejemplo, 12:30:45).
Z: Indica que la hora está en UTC (tiempo coordinado universal).

En el input de tipo date:
Cuando utilizas un elemento <input> con el atributo type="date" en HTML y un usuario selecciona una fecha, el valor devuelto está en formato ISO 8601. El formato específico es el siguiente:
YYYY-MM-DD

En MySQL con tipo DATE:
Cuando defines un campo en MySQL con el tipo de dato DATE, el formato en el que se almacena la fecha es "YYYY-MM-DD". Este formato es compatible con el formato ISO 8601 para fechas.

Manejo de fechas con métodos nativos de JS:

Metodo new Date()

Metodo getFullYear()
*/