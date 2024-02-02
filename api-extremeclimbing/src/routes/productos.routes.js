/*
Creando una instancia de un enrutador de Express.
Luego puedes definir rutas, middleware y controladores en ese enrutador específico.
Un enrutador en Express.js es un middleware que puede manejar rutas y peticiones de manera modular, permitiendo organizar de manera más limpia y estructurada el manejo de rutas en una aplicación.
En enrutador define las rutas de la aplicación y conecta las solicitudes HTTP con los controladores apropiados.

Actúa como un enrutador para dirigir las solicitudes a los controladores correspondientes

El enrutador debe montarse en el entry point con la ruta base, que conectará con las rutas definidas en este modulo
*/

//Se importa el objeto Router desde express para crear instancias de rutas.
const { Router } = require('express');

//Creación de la Instancia del Enrutador
const productosRouter = Router();

//Se deben importar los controladores para asociarlos a las rutas correspondientes
const productosController = require('../controllers/productos.controller');

/*
    buscarTodos,
    agregar,
    buscarPorId,
    actualizar,
    borrar,
    
*/

//Importo el middleware validador de errores:
const { validarErrores } = require('../middlewares/validadorerr.middleware');

//Importo funciones de validación creadas en carpeta middlewares
const { 
    validarId,
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
} = require('../middlewares/validadoresProducto.middleware');


const { validarAdmin  } = require('../middlewares/validarAdmin.middleware');

//Creo los endpoint para el manejo de solicitudes HTTP:

//En cada solicitud se pasa la referencia a las funciones controlodaras,  La ejecución se realiza automáticamente por Express cuando una solicitud coincide con la ruta definida. 

productosRouter.get("/", productosController.buscarTodos);


productosRouter.post(
    "/", 
    [/* validarAdmin, */ validarNombre,  validarPrecio, validarDescripcion, validarCaract, validarinformacionTecnica, validarStock, validarErrores],
    productosController.agregar
);

productosRouter.get(
    "/:id",
    [validarId, validarErrores],
    productosController.buscarPorId
);

productosRouter.get(
    "/categoria/:categoria",
    productosController.buscarPorCategoria
);

productosRouter.get(
    "/aleatorio/:categoria",
    productosController.busquedaAleatoria
);

productosRouter.put(
    "/:id",
    [
    /* validarAdmin, */
    validarId, 
    validarActualizarNombre, 
    validarActualizarDesc,
    validarActualizarCaract,
    validarActualizarinfoTecnica,
    validarActualizarPrecio,
    validarActualizarStock,
    validarErrores
    ],
    productosController.actualizar
);

productosRouter.delete(
    '/:id',
    /* [validarAdmin, validarId, validarErrores], */
    productosController.borrarProducto
);

module.exports = productosRouter; //Se importa en el entrypoint