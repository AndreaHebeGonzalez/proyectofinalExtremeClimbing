const { Router } = require('express');

const ordenDeCompraRouter = Router();

const ordenDeCompraController = require('../controllers/ordenDeCompra.controller');

//validadores:

//Rutas:

ordenDeCompraRouter.get('/', ordenDeCompraController.obtenerTodas); //Todas las entradas, para renderizado en pagina de admin
ordenDeCompraRouter.get('/detalles-orden/:idOrden', ordenDeCompraController.DetallesPorIdOrden);// Se obtiene detalles de una orden por id de orden
ordenDeCompraRouter.get('/ordenes-sesion-usuario', ordenDeCompraController.obtenerOrdenPorIdUsuario);  //se obtiene el la orden con detalles de un usuario especifico por su id de sesion
ordenDeCompraRouter.post('/', ordenDeCompraController.cargarOrden); //se agrega una orden desde una sesion de usuario especifica
ordenDeCompraRouter.delete('/:idOrden', ordenDeCompraController.eliminarOrdenPorId);

module.exports = ordenDeCompraRouter; //Se importa en el entrypoint