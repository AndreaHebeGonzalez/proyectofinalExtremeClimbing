const { DataTypes } = require('sequelize');

module.exports = (bd) => {
    const OrdenDeCompra = bd.define('OrdenDeCompra', {
        idOrden: {
            type: DataTypes.INTEGER,
            field:'id_orden',
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            field: 'user_id',
            allowNull: false,
        },
        fechaOrden: {
            type: DataTypes.DATE, // Para almacenar solo la fecha sin la hora
            field: 'fecha_de_orden',
            allowNull: false,
            //Capa de validacion adicional
            validate: {
                isDate: {
                    msg: 'La fecha debe estar en formato de fecha válido.',
                },
            },
        },
        precioFinal: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'precio_final',
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pendiente',
        }
        // Otras columnas según sea necesario
    }, {
        timestamps: false,
        tableName: 'orden_de_compra',
    });
    return OrdenDeCompra;
};
/*
con que lineas de este codigo estarias logrando esto y porque? Si deseas limitar a un usuario a tener solo una cantidad específica de un producto en su carrito, podrías hacer lo siguiente:
En el código que proporcioné, el cambio clave está en la definición de la tabla CarritoCompras. Aquí está el fragmento relevante con explicaciones:
idUsuario y idProducto como Claves Primarias:

Al especificar primaryKey: true para idUsuario y idProducto, estoy indicando que estos dos campos, junto con idCarrito, formarán la clave primaria compuesta de la tabla CarritoCompras.
Clave Primaria Compuesta:

Esto significa que la combinación única de idUsuario, idProducto, y idCarrito identificará de manera única cada entrada en la tabla. Como resultado, no puede haber duplicados de la combinación idUsuario e idProducto.
Un Usuario, Una Cantidad Específica de un Producto:

Este diseño asegura que un usuario solo pueda tener una cantidad específica de un producto en su carrito. Si intentan agregar el mismo producto nuevamente, se actualizará la entrada existente con la nueva cantidad en lugar de agregar una nueva fila.
*/