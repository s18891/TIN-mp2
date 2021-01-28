const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Rezerwacje = sequelize.define('Rezerwacje', {
    _IdRezerwacji: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    SluchaczeIdSluchacza: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    KoncertyIdKoncertu: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Ilosc_osob: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Czy_przedplata: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }


});

module.exports = Rezerwacje;