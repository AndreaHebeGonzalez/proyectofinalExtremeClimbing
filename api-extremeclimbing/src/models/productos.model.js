/*
Modelo (Model):

Representa la estructura y la lógica de los datos de la aplicación.
Interactúa con la base de datos y realiza operaciones relacionadas con los datos.
No tiene conocimiento directo de la interfaz de usuario ni de cómo se presentan los datos
*/

/*
Los modelos deben incronizarse en index.js
*/

//Importo DataTypes para definir los tipos de datos, y QueryTypes que es un objeto proporcionado por Sequelize que se utiliza para especificar el tipo de consulta que se está realizando.
const { DataTypes } = require('sequelize');

//Definicion del modelo producto 

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
        tableName: 'productos', // Especifica el nombre exacto de la tabla en la base de datos
    });
    return Productos;
};


/*
    la opción tableName se utiliza para especificar el nombre exacto de la tabla en la base de datos a la cual el modelo está asociado.
 */





