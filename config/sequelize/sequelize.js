const Sequelize = require('sequelize');



const sequelize = new Sequelize('tin-projekt-stepien-s18891', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});



module.exports = sequelize;
