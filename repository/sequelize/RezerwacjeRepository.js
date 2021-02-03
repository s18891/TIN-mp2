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
    return Rezerwacje.create(data);
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
