const { Router } = require('express');

const ordenDeCompraRouter = Router();

const ordenDeCompraController = require('../controllers/ordenDeCompra.controller');


ordenDeCompraRouter.get('/', ordenDeCompraController.obtenerTodas); //Todas las entradas, para renderizado en pagina de admin
ordenDeCompraRouter.get('/detalles-orden/:idOrden', ordenDeCompraController.DetallesPorIdOrden);
ordenDeCompraRouter.get('/ordenes-sesion-usuario', ordenDeCompraController.obtenerOrdenPorIdUsuario);  //se obtiene la orden con detalles de un usuario especifico por su id de sesion
ordenDeCompraRouter.post('/', ordenDeCompraController.cargarOrden); 
ordenDeCompraRouter.delete('/:idOrden', ordenDeCompraController.eliminarOrdenPorId);

module.exports = ordenDeCompraRouter;