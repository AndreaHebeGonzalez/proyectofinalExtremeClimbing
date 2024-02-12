

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

productosRouter.get(
    "/categorias/categorias",
    productosController.categories
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