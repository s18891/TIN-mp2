const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Koncerty = sequelize.define('Koncerty', {
    _IdKoncertu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Miejsce_koncertu: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Data_koncertu: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Maksymalna_ilosc_miejsc: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Czas_trwania_koncertu: {
        type: Sequelize.TIME,
        allowNull: true

    }
});

module.exports = Koncerty;