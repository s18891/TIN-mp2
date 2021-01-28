const Sluchacze = require("../../model/sequelize/Sluchacze");
const Rezerwacje = require("../../model/sequelize/Rezerwacje");
const Koncerty = require("../../model/sequelize/Koncerty");

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
