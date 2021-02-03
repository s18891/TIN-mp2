const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const Instant = require("moment");
console.log(Instant.now().toString().substring(0, 10));
const Koncerty = sequelize.define('Koncerty', {
    _IdKoncertu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Miejsce_koncertu: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    Data_koncertu: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isAfter: new Date().toISOString() ,
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
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
