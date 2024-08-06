


const { DataTypes } = require('sequelize');


module.exports = (bd) => {
    //Creo el modelo de productos
    const Productos = bd.define('Productos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, //No puede ser nulo
            unique: true,
        },          
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field:'stock',
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subcategoriaUno: {
            type: DataTypes.STRING,
            field: 'subcategoria_1',
            defaultValue: '', 
        },
        subcategoriaDos: {
            type: DataTypes.STRING,
            field: 'subcategoria_2',
            defaultValue: '', 
        },
        subcategoriaTres: {
            type: DataTypes.STRING,
            field: 'subcategoria_3',
            defaultValue: '', 
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        caracteristicas: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        infoTecnica: {
            type: DataTypes.JSON,
            allowNull: true,
            field: 'informacion_tecnica',
        },
        ventas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, 
        },
        oferta: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }      
    }, {
        tableName: 'productos',
    });
    return Productos;
};






