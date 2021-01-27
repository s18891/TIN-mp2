const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Sluchacze = sequelize.define('Sluchacze', {
    _IdSluchacza: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Imie: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Nazwisko: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Data_dolaczenia: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Skad_wie_o_koncercie: {
        type: Sequelize.STRING,
        allowNull: true
    }


});

module.exports = Sluchacze;