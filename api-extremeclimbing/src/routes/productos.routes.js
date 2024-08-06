
const { Router } = require('express');

const productosRouter = Router();

const productosController = require('../controllers/productos.controller');


const { validarErrores } = require('../middlewares/validadorerr.middleware');


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

module.exports = productosRouter;