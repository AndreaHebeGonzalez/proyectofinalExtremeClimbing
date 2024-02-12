const { body, param } = require('express-validator');

/* 
Que validaciones tengo que hacer:

    validarId,
    validarNombre,
    validarPrecio,
    validarDesc,
    validarCaract,
    validarinformacionTecnica,
    validarStock,
    validarImg,
    validarErrores

*/

const validarId = param('id')
    .notEmpty()
    .withMessage('El id es obligatorio')
    .isInt({
    min: 0,
    });

const validarUrl = body('url')
    .notEmpty() //Asegura que el campo no este vacio
    .withMessage('La URL no puede estar vacía')
    .isURL()
    .withMessage('La URL no es válida')



const validarNombre = body('nombre') 
    .isString()
    .withMessage('El nombre tiene que ser un string')
    .isLength({  
        min: 8,
    })
    .withMessage('El nombre tiene que tener al menos 8 caracteres');

const validarPrecio = body('precio')
    .notEmpty() 
    .withMessage('El Precio es obligatorio')
    .isDecimal({
    min: 0,
    decimal_digits: '1,10',
    })
    .withMessage('El precio debe ser un número decimal con un máximo de 10 dígitos en total')
    .withMessage('El precio no puede ser un valor falso');


const validarDescripcion = body('descripcion')
.isString()
.isLength({ min: 5, max: 800 })
.withMessage('La descripción debe tener entre 5 y 800 caracteres')

const validarCaract = body('caracteristicas')
//Validación custom para el json de este campo:
    .custom((value) => { //Value tiene el valor del campo que se esta validando
        try { //Bloque susceptible a errores
            const caracteristicas = value; //Parseo el json
            console.log(caracteristicas);
            const numCaracteristicas = Object.keys(caracteristicas).length;

            if (numCaracteristicas > 10) {
                throw new Error('No puede haber más de 10 características');
            }            

            return true;

        } catch (error) {
            throw new Error('No puede haber mas de 10 items');
        }
    });


const validarinformacionTecnica = body('informacion_tecnica')
    .custom((value) => { 
        try {
            const infoTecnica = value; //Parseo el json

            

            const cantidadInfoTecnica = Object.keys(infoTecnica).length;

            if (cantidadInfoTecnica > 10) {
                throw new Error('No puede haber más de 10 características');
            }            

            return true; //Si pasa todos los condicionales se valida

        } catch (error) {
            throw new Error('No puede haber mas de 10 items');
        }
    });

const validarStock = body('stock')
.isInt({ min:0 })
.withMessage('El numero debe ser un entero positivo')


const validarActualizarNombre = validarNombre.optional();

const validarActualizarDesc = validarDescripcion.optional();

const validarActualizarCaract = validarCaract.optional();

const validarActualizarinfoTecnica = validarinformacionTecnica.optional();

const validarActualizarPrecio = validarPrecio.optional();

const validarActualizarStock = validarStock.optional();


module.exports = {
    validarId,
    validarUrl,
    validarNombre,
    validarPrecio,
    validarDescripcion,
    validarCaract,
    validarinformacionTecnica,
    validarStock,
    //Validaciones de operaciones de actualización
    validarActualizarNombre,
    validarActualizarDesc,
    validarActualizarCaract,
    validarActualizarinfoTecnica,
    validarActualizarPrecio,
    validarActualizarStock,
}

