//Importo la instancia de sequelize para pasarla como argumento en la carga del modelo
const bd = require('../config/bd');

//Importo la funcion flecha que crea el modelo productos de producto.model.js, luego la ejecuto para cargar el modelo pasandole como parámetro la instancia de sequelize y lo exporto para que sea usado en productos.controller

const productosModel = require('./productos.model.js');  
const usuariosModel = require ('./users.model.js');
const imagenesModel = require ('./imagenes.model.js');
const FavoritosModel = require ('./favoritos.model.js');
const OrdenDeCompraModel = require('./ordenDeCompra.model.js');
const DetalleOrdenModel = require('./detalleOrden.model.js');

//Cargo el modelo de productos en la constante Productos, esta va a ser usada para realizar las consultas a la base de datos

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
    Productos, //Lo importo en productos.controller y index.js (entry point)
    Usuarios,
    Imagenes,
    Favoritos,
    OrdenDeCompra,
    DetalleOrden
};

/*

La opción onDelete: 'CASCADE' en una relación Sequelize indica que cuando se elimina el registro principal, se deben eliminar automáticamente todos los registros secundarios asociados a ese registro principal. En el contexto de una relación uno a muchos, como la que se establece con hasMany y belongsTo, significa que cuando eliminas el registro principal, Sequelize también eliminará todos los registros secundarios asociados.

Vamos a desglosar lo que sucede cuando utilizas onDelete: 'CASCADE' en el ejemplo de Producto e Imagen:

Cuando eliminas un producto:
Todos los registros en la tabla Imagen que están asociados a ese producto (por medio de la clave foránea producto_id) también se eliminan automáticamente.
Esto es útil cuando deseas mantener la integridad referencial en tu base de datos. Si tienes un producto con imágenes asociadas y decides eliminar ese producto, es probable que también quieras eliminar las imágenes asociadas para evitar datos huérfanos o sin referencias en tu base de datos.
*/