const { Router } = require('express');

const imagenesRouter = Router();

const imagenesController = require('../controllers/imagenes.controller');

/*

    agregar,
    borrarPorIdImagen,

*/

//Importo el middleware validador de errores:
const { validarErrores } = require('../middlewares/validadorerr.middleware');

const { validarId } = require('../middlewares/validadoresProducto.middleware');

imagenesRouter.post('/', imagenesController.agregar);

imagenesRouter.delete('/:idImagen', [validarId, validarErrores], imagenesController.borrarPorIdImagen);

imagenesRouter.get('/:idProducto', [validarId, validarErrores], imagenesController.buscarPorIdProducto);
module.exports = imagenesRouter;
