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

