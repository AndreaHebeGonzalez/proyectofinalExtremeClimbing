const { DataTypes } = require('sequelize');

module.exports = (bd) => {
    const Favoritos = bd.define('Favoritos',  {
        idFavoritos: {
            type: DataTypes.INTEGER,
            field: 'id_favoritos',
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false, 
            unique: true,
            validate: {
                isInt: {
                    args: [0], //se especifica un rango con el limite inferior
                    msg: 'El valor de idFavoritos debe ser un número entero positivo.',
                },
            },
        },
        productos_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usuarios_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return Favoritos;
}