
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
//relación "uno a muchos" (one-to-many): Cada Imagen pertenece a un producto, y cada producto tiene muchas imagenes
Imagenes.belongsTo(Productos, { foreignKey: 'producto_id' });
Productos.hasMany(Imagenes, { foreignKey: 'producto_id', onDelete: 'CASCADE' }); //onDelete: 'CASCADE' ==> explicado abajo


Favoritos.belongsTo(Productos, { foreignKey: 'productos_id' });
Favoritos.belongsTo(Usuarios, { foreignKey: 'usuarios_id' });

Productos.belongsToMany(Usuarios, { through: Favoritos, foreignKey: 'productos_id' });
Usuarios.belongsToMany(Productos, { through: Favoritos, foreignKey: 'usuarios_id' });

//relación "uno a muchos" (one-to-many): Cada orden de compra pertenece a un solo usuario, y un usuario puede tener mas de una orden de compra activa
OrdenDeCompra.belongsTo(Usuarios, { foreignKey: 'user_id' });
Usuarios.hasMany(OrdenDeCompra, { foreignKey: 'user_id' });

//relación "uno a muchos" (one-to-many): DetalleOrden pertenece a OrdenDeCompra y una orden de compra puede tener muchos detalles
DetalleOrden.belongsTo(OrdenDeCompra, { foreignKey: 'orden_id' });
OrdenDeCompra.hasMany(DetalleOrden, { foreignKey: 'orden_id' });

//Exportacion de modelos
module.exports = {
    Productos, 
    Usuarios,
    Imagenes,
    Favoritos,
    OrdenDeCompra,
    DetalleOrden
};

