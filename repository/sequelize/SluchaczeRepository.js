const Sluchacze = require("../../model/sequelize/Sluchacze");
const Rezerwacje = require("../../model/sequelize/Rezerwacje");
const Koncerty = require("../../model/sequelize/Koncerty");
const crypto = require('crypto');

exports.getSluchacze = () => {
    return Sluchacze.findAll();
};

exports.getSluchaczeById = (IdSluchacza) => {
    return Sluchacze.findByPk(IdSluchacza,
        {
            include: [{
                model: Rezerwacje,
                include: [{
                    model: Koncerty,
                }]
            }]
        });
};

exports.createSluchacze = (newSluchaczData) => {
    return Sluchacze.create({
        Imie: newSluchaczData.Imie,
        Nazwisko: newSluchaczData.Nazwisko,
        Data_dolaczenia: newSluchaczData.Data_dolaczenia,
        Skad_wie_o_koncercie: newSluchaczData.Skad_wie_o_koncercie
    });
};

exports.updateSluchacze = (IdSluchacza, SluchaczData) => {
    const Imie = SluchaczData.Imie;
    const Nazwisko = SluchaczData.Nazwisko;
    const Data_dolaczenia = SluchaczData.Data_dolaczenia;
    const Skad_wie_o_koncercie = SluchaczData.Skad_wie_o_koncercie;
    return Sluchacze.update(SluchaczData, {where: {_IdSluchacza: IdSluchacza }});
};

exports.deleteSluchacze = (IdSluchacza) => {
    return Sluchacze.destroy({
        where: { _IdSluchacza: IdSluchacza }
    });

};

const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password, 'utf8').digest().toString('hex');
}

exports.createUser = (auth) => {
    const user = { ...auth, isAdmin: false };
    user.password = hashPassword(user.password);
    return Sluchacze.create(user);
};

exports.findUserByLoginAndPassword = (auth) => {
    console.log("WEJŚCIE W SPRAWDZENIE LOGOWANIA w repo.js")

    const user = { ...auth };
    user.password = hashPassword(user.password);
    return Sluchacze.findOne(
      {
          where: {
              login: auth.login,
              password: hashPassword(auth.password),
          },
          include: [{
              model: Rezerwacje,
              required: false,
          }],
      });
}

exports.isAdmin = (auth) => {
    console.log("WEJŚCIE W SPRAWDZENIE ADMINA w repo.js")

    const user = { ...auth };

    user.password = hashPassword(user.password);
    return Sluchacze.findOne(
        {
            where: {
                login: auth.login,
                password: hashPassword(auth.password),
                isAdmin : true,
            },
            include: [{
                model: Rezerwacje,
                required: false,
            }],
        });
}
