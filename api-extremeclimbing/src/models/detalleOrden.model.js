const { DataTypes } = require('sequelize');

module.exports = (bd) => {
    const DetalleOrden = bd.define('DetalleOrden', {
        idDetalleOrden: {
            type: DataTypes.INTEGER,
            field: 'id_detalle_orden',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        idOrden: {
            type: DataTypes.INTEGER,
            field:'orden_id',
            allowNull: false,
        },
        productoId: {
            type: DataTypes.INTEGER,
            field: 'producto_id',
            allowNull: false,
        },
        precioUnitario: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'precio_unitario',
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull:false
        },   
    }, {
        timestamps: false,
        tableName: 'detalle_orden',
    });
    return DetalleOrden;
}