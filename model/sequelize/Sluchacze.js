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
        allowNull: false,
        validate: {

            len: {
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    Nazwisko: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

            len: {
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },

    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3,60],
                msg: "Pole powinno zawierać od 3 do 60 znaków"
            },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5,60],
                msg: "Pole powinno zawierać od 5 do 60 znaków"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }


});

module.exports = Sluchacze;
