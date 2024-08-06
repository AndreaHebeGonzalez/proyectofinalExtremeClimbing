
const bd = require('../config/bd');

const productosModel = require('./productos.model.js');  
const usuariosModel = require ('./users.model.js');
const imagenesModel = require ('./imagenes.model.js');
const FavoritosModel = require ('./favoritos.model.js');
const OrdenDeCompraModel = require('./ordenDeCompra.model.js');
const DetalleOrdenModel = require('./detalleOrden.model.js');


const Productos = productosModel(bd);
const Usuarios = usuariosModel(bd);
const Imagenes = imagenesModel(bd);
const Favoritos = FavoritosModel(bd);
const OrdenDeCompra = OrdenDeCompraModel(bd);
const DetalleOrden = DetalleOrdenModel(bd);


//Relaciones entre modelos
Imagenes.belongsTo(Productos, { foreignKey: 'producto_id' });
Productos.hasMany(Imagenes, { foreignKey: 'producto_id', onDelete: 'CASCADE' }); //onDelete: 'CASCADE' ==> explicado abajo


Favoritos.belongsTo(Productos, { foreignKey: 'productos_id' });
Favoritos.belongsTo(Usuarios, { foreignKey: 'usuarios_id' });

Productos.belongsToMany(Usuarios, { through: Favoritos, foreignKey: 'productos_id' });
Usuarios.belongsToMany(Productos, { through: Favoritos, foreignKey: 'usuarios_id' });

OrdenDeCompra.belongsTo(Usuarios, { foreignKey: 'user_id' });
Usuarios.hasMany(OrdenDeCompra, { foreignKey: 'user_id' });

DetalleOrden.belongsTo(OrdenDeCompra, { foreignKey: 'orden_id' });
OrdenDeCompra.hasMany(DetalleOrden, { foreignKey: 'orden_id' });

module.exports = {
    Productos, 
    Usuarios,
    Imagenes,
    Favoritos,
    OrdenDeCompra,
    DetalleOrden
};

