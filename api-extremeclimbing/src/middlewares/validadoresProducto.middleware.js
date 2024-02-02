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

//dentro del parentesis de body se establece el campo que se va a validar, en este caso se valida el campo nombre, es lo que esta dentro del req.body:

const validarNombre = body('nombre') //es como si se accediera a req.body.nombre . Despues de esto sigue la cadena de validación:
    .isString()//Establece la restriccion de que sea un string para validarlo. 
    .withMessage('El nombre tiene que ser un string')//Se imprime un mensaje de error en el caso de que no lo sea
   .isLength({ //Se establce para su validacion que tenga como mínimo 8 caracteres 
        min: 8,
    })
    .withMessage('El nombre tiene que tener al menos 8 caracteres');

const validarPrecio = body('precio')
    .notEmpty() //la validación notEmpty() fallará si el campo no está presente o está presente y tiene una cadena vacía (''), tambien si es null o undefined.
    .withMessage('El Precio es obligatorio')
    .isDecimal({
    min: 0,
    decimal_digits: '1,10',
    })
    .withMessage('El precio debe ser un número decimal con un máximo de 10 dígitos en total')
    .withMessage('El precio no puede ser un valor falso');

/*
notEmpty(): Asegura que el campo:
1- Este presente en el body
2- Esté presente y NO SEA NULL
3- Esté presente y NO SEA UNDEFINED
4- Este presente y no sea una cadena de texto vacia --> ""


Si el campo esta presente y contiene una cadena con espacio en blanco, no devuelve error porque se considera NO VACIA --> "    "


Envio de un campo null o undefined en soli POST: 
'{"url": null ...
Envio de un campo vacio en soli POST: 
'{"url": "", ...


.optional({ checkFalsy: true }) en express-validator permite que la validación sea opcional si el campo es undefined, null, o una cadena de longitud cero (''). En tu contexto de validación para el precio, si consideras que el campo no puede ser nulo, entonces no sería necesario utilizar .optional({ checkFalsy: true }). 

La opción .optional({ checkFalsy: false }) en express-validator hace que la validación NO sea opcional si el campo es undefined, null, o una cadena de longitud cero (''). Si se le da el valor false, significa que la validación será obligatoria incluso si el campo tiene uno de esos valores.

Entonces, si tu campo 'precio' puede ser undefined, null, o una cadena vacía ('') y quieres que la validación sea opcional en esos casos, deberías usar .optional({ checkFalsy: true }). Si usas .optional({ checkFalsy: false }), la validación será obligatoria incluso si el campo es undefined, null, o una cadena vacía.

!Dato: 
.optional({ nullable: true }): Permite que el campo url esté ausente. Esto significa que la validación no fallará si el campo no está presente en la solicitud.
*/

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
    .custom((value) => { //Value tiene el valor del campo que se esta validando
        try { //Bloque susceptible a errores
            const infoTecnica = value; //Parseo el json

            //Cuando se ejecuta throw new Error, se detiene la ejecución del código actual y el flujo de control se transfiere al bloque catch más cercano. Si no hay un bloque catch, el programa se detendrá por completo y se imprimirá un mensaje de error en la consola.

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

/*Aclaraciones: 
Al utilizar .optional() después de la validación inicial, se indica que para la operación de actualización (como PUT), el campo precio es opcional. Esto significa que si el campo no está presente en la solicitud PUT, no se aplicarán las validaciones posteriores. O dicho de otra forma (o a la inversa) si no impongo .optional(), la validación será obligatoria, eso hace que si el campo no está presente en la request, la validación falla y devolvueve error.
*/


/*

const { body, param } = require('express-validator');, estás utilizando la destructuración de objetos en JavaScript para importar específicamente los métodos body y param del módulo express-validator. Aquí hay una breve descripción de cada uno:

body: Este método se utiliza para definir validaciones en los campos del cuerpo (body) de una solicitud HTTP. Por lo general, se utiliza para validar datos enviados a través de formularios o en el cuerpo de solicitudes POST
const { body } = require('express-validator');

Validar el campo 'nombre' en el cuerpo de la solicitud
body('nombre').notEmpty().withMessage('El nombre no puede estar vacío');

param: Este método se utiliza para definir validaciones en los parámetros de la URL de una solicitud HTTP. Puedes usarlo para validar valores presentes en la ruta de la URL.

Ejemplo de uso:
const { param } = require('express-validator');

Validar el parámetro 'id' en la ruta de la URL
param('id').isInt().withMessage('El ID debe ser un número entero');

Estos métodos proporcionados por express-validator permiten definir reglas de validación para diferentes partes de una solicitud HTTP. Al usarlos, puedes asegurarte de que los datos cumplen con ciertos criterios antes de procesarlos en tu aplicación.
*/