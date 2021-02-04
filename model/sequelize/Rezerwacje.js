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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            max: 1000,
            min: 1
        }
    },
    Czy_przedplata: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    Skad_wie_o_koncercie: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Komentarz: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {

            len: {
                args: [0,600],
                msg: "Pole powinno zawierać od 0 do 600 znaków"
            },
        }
    }


});

module.exports = Rezerwacje;
