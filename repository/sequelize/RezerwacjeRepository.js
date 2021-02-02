const Sequelize = require('sequelize');

const Rezerwacje = require('../../model/sequelize/Rezerwacje');
const Sluchacze = require('../../model/sequelize/Sluchacze');
const Koncerty = require('../../model/sequelize/Koncerty');



exports.getRezerwacje = () => {
    return Rezerwacje.findAll({include: [
            {
                model: Sluchacze,
            },
            {
                model: Koncerty,
            }]
    });
};

exports.getRezerwacjeByUser = (user) => {
  return Rezerwacje.findAll({
    where: {
      SluchaczeIdSluchacza: user._IdSluchacza,
    },
    include: [
      {
        model: Sluchacze,
      },
      {
        model: Koncerty,
      }]
  });
};


exports.getRezerwacjeById = (IdRezerwacji) => {
    return Rezerwacje.findByPk(IdRezerwacji, {include: [
            {
                model: Sluchacze,
            },
            {
                model: Koncerty,
            }]
    });
};




exports.createRezerwacje = (data) => {
    console.log(JSON.stringify(data));

    return Rezerwacje.create({
        Sluchacze_IdSluchacza: data.Sluchacze_IdSluchacza,
        Koncerty_IdKoncertu: data.Koncerty_IdKoncertu,
        Ilosc_osob: data.Ilosc_osob,
        Czy_przedplata: data.Czy_przedplata,
        Skad_wie_o_koncercie: data.Skad_wie_o_koncercie
    });
};

exports.updateRezerwacje = (IdRezerwacji, data) => {
    return Rezerwacje.update(data, {where: {_idRezerwacji: IdRezerwacji }});
}

exports.deleteRezerwacje = (IdRezerwacji) => {
    return Rezerwacje.destroy({
        where: { _idRezerwacji: IdRezerwacji }
    });
}

exports.deleteManyRezerwacje = (IdRezerwacjiWiele) => {
    return Rezerwacje.find({ _idRezerwacji: { [Sequelize.Op.in]: IdRezerwacjiWiele }})
}
