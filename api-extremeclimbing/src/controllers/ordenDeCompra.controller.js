

const { OrdenDeCompra, DetalleOrden } = require('../models/index');

const obtenerTodas = async (req, res) => { //Se renderizan en la pagina del administrador
    try {
        const ordenes = await OrdenDeCompra.findAll();
        res.json(ordenes);
    } catch (error) {
        console.error('Error al buscar las ordenes de compras', error);
        res.status(500).json({ msg: 'Error al buscar las ordenes de compras', error });
    };
};

const DetallesPorIdOrden = async (req, res) => { //Devuelve el detalle de la orden por id de orden
    try {
        const  idOrden = Number(req.params.idOrden);
        const detalles = await DetalleOrden.findAll({
            where: { idOrden }
        });
        res.json(detalles);
    } catch (error) {
        console.error('Error al buscar los detalles de esta orden', error);
        res.status(500).json({ msg: 'Error al buscar los detalles de esta orden', error })
    };
};

const obtenerOrdenPorIdUsuario = async (req, res) => {//Buscar orden de compra incluyendo detalles por id de session
    try {
        const idUsuario = req.session.idUsuario;
        const ordenesConDetalles = await OrdenDeCompra.findAll({
            where: { idUsuario },
            include: [{
                model: DetalleOrden,
                as: 'detalles', 
            }], 
        });
        res.json(ordenesConDetalles);
    } catch (error) {
        console.error('Error al obtener las órdenes de compra con detalles por ID de sesion', error);
        res.status(500).json({ msg:'Error al obtener las órdenes de compra con detalles por ID de sesion' })
    };
};

const cargarOrden = async (req, res) => { //recibo del front un array de objetos, cada objeto contiene, id_producto, cantidad, precioUnitario

    try {
        const idUsuario = req.session.idUsuario;
        const detallesOrden = req.body;
        console.log(detallesOrden);
        const detallesConCostoParcial = detallesOrden.map((detalle) => ({ //se usan parentesis encerrando las llaves para devolver un objeto literal, si no se utilizaran js podria interpretar el inicio de un bloque, se evita ambiguedad sintactica 
            ...detallesOrden,
            costoParcial: detalle.precioUnitario * detalle.cantidad,
        }));
        const precioTotal = detallesConCostoParcial.reduce((precioTotal, detalleOrden) => precioTotal + detalleOrden.costoParcial, 0);
            
        const nuevaOrden = await OrdenDeCompra.create({
            idUsuario,
            fechaOrden: new Date(),
            precioFinal: precioTotal, //Precio total sin tener encuenta posibles descuentos de cada producto
        });
        await Promise.all(detallesOrden.map(async (detalle) => {
            await DetalleOrden.create({
                idOrden: nuevaOrden.idOrden,
                productoId: detalle.productoId,
                precioUnitario: detalle.precioUnitario,
                cantidad: detalle.cantidad
            });
        }));
        res.status(201).json({ msg: 'Orden de compra creada exitosamente' });
    } catch (error) {
        console.error('Error al crear la orden de compra', error);
        res.status(500).json({ msg:'Error al crear la orden de compra', error });
    };
};

const eliminarOrdenPorId = async (req, res) => {
    const idOrden = Number(req.params.idOrden);
    try {
        const orden = await OrdenDeCompra.findByPk(ordenId);
        if(!orden) {
            res.status(404).json({ msg:'Orden de compra no encontrada'});
        } else {
            await DetalleOrden.destroy({
                where: { idOrden }
            });
            await OrdenDeCompra.destroy({
                where: { idOrden }
            });
            res.status(200).json({ msg: 'Orden de compra cancelada exitosamente' })        }
    } catch (error) {
        console.error('Error al cancelar orden', error);
        res.status(500).json({ msg:'Error al cancelar orden', error });
    };
};

module.exports = {
    obtenerTodas,
    DetallesPorIdOrden,
    obtenerOrdenPorIdUsuario,
    cargarOrden,
    eliminarOrdenPorId,
};

/*

Persistir el carrito solo después de la confirmación:

Ventajas:

Datos más consistentes: La base de datos solo contendrá datos confirmados, lo que puede simplificar el manejo de la base de datos y reducir la complejidad de la lógica de negocio.
Menos limpieza de datos: No hay necesidad de lidiar con carritos no confirmados o abandonados en la base de datos.
Desventajas:

Experiencia del usuario menos flexible: Los usuarios no pueden volver y encontrar los productos que agregaron anteriormente si abandonan la página antes de confirmar la compra.
Consideraciones adicionales:

Seguridad: Si el carrito contiene información sensible y confidencial, como detalles de pago, puede ser más seguro esperar hasta que se confirme la orden antes de persistir en la base de datos.
Requerimientos de negocio: Algunos negocios pueden preferir una estrategia sobre la otra según sus necesidades y procesos comerciales específicos.
*/