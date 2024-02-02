//Importo la clase sequelize: Sequelize es la clase principal de Sequelize que se utiliza para configurar la conexión a la base de datos.

const { Sequelize } = require('sequelize');



//Instancio la clase 
const bd = new Sequelize({
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    database: 'Extreme Climbing',
    username: 'root',
    password: 'aHg0729675397'
});



module.exports = bd;
