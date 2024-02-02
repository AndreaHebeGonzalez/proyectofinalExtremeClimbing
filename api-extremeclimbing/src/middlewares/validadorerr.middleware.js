//Este controlador maneja errores de validación utilizando la biblioteca express-validator. Se ejecuta al final del array de middleware a ejecutar para manejar los posibles errores de validación que haya en las solicitudes.

//Se importa la función validationResult de la biblioteca express-validator. Esta función verifica si hay errores de validación en la solicitud.

/*
validationResult:
Es una función proporcionada por la librería express-validator en Express.js que se utiliza para obtener y trabajar con los resultados de las validaciones que se han realizado en una ruta específica.

Cuando defines validaciones utilizando express-validator, puedes recuperar y trabajar con los resultados de esas validaciones utilizando validationResult.
*/
const { validationResult } = require("express-validator");

//! CON EXPRESS-VALIDATOR LOS ERRORES SIEMPRE TIENEN QUE MANEJARSE A TRAVÉS DE VALIDATIONRESULT

//Se define la función validarErrores que toma tres parámetros: req (objeto de solicitud), res (objeto de respuesta), y next (función para pasar al siguiente middleware).
const validarErrores = (req, res, next) => {
    //validationResult(req) devuelve un objeto que contiene información sobre los errores de validación encontrados en la solicitud req
    const resultado = validationResult(req);

  //resultado.isEmpty() // Pregunta si la variable resultado que es un objeto que almacena errores de la validación está vacía, es true si no tiene errores y está vacía, como delante de  resultado.isEmpty() hay un NOT (!), esto invierte la respuesta, por tanto si está vacía sin errores el resultado del condicional es false y no entra, solo retorna

    if (!resultado.isEmpty()) {
        //Un código de estado HTTP 422 indica que la solicitud fue bien formada, pero el servidor no pudo procesarla debido a errores de semántica.
        //El código de estado 422 es comúnmente utilizado para indicar errores de validación
        res.status(422).send({
            errors: resultado.array(),
        });
        return;
    }
    next();
};

module.exports = {
    validarErrores,
};