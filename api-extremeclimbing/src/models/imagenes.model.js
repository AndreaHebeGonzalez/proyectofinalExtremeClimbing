const { DataTypes } = require('sequelize');

module.exports = (bd) => {
    const Imagenes = bd.define('Imagenes', {
        idImagen: {
            type: DataTypes.INTEGER,
            field: 'id_imagen',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, 
            unique: true,
            validate: {
                isInt: {
                    args: [0], //se especifica un rango con el limite inferior
                    msg: 'El valor de idImagenes debe ser un número entero positivo.',
                },
            },
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'producto_id'
        },
    }, {
        tableName: 'imagenes', // Especifica el nombre exacto de la tabla en la base de datos
    });
    return Imagenes;
};


