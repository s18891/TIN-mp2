const Sluchacze = require("../../model/sequelize/Sluchacze");
const Rezerwacje = require("../../model/sequelize/Rezerwacje");
const Koncerty = require("../../model/sequelize/Koncerty");

exports.getKoncerty = () => {
    return Koncerty.findAll();
};

exports.getKoncertyById = (IdKoncertu) => {
    return Koncerty.findOne(
        {
            where: {
                _IdKoncertu: IdKoncertu
            },
            include: [{
                model: Rezerwacje,
                required: false,
                include: [{
                    model: Sluchacze,
                    required: false,
                }]
            }]
        });
};

exports.createKoncerty = (newKoncertData) => {
    return Koncerty.create({
        Miejsce_koncertu: newKoncertData.Miejsce_koncertu,
        Data_koncertu: newKoncertData.Data_koncertu,
        Maksymalna_ilosc_miejsc: newKoncertData.Maksymalna_ilosc_miejsc,
        Czas_trwania_koncertu: newKoncertData.Czas_trwania_koncertu
    });
};

exports.updateKoncerty = (IdKoncertu, KoncertData) => {
    return Koncerty.update(KoncertData, {where: {_IdKoncertu: IdKoncertu }});
};

exports.deleteKoncerty = (IdKoncertu) => {
    return Koncerty.destroy({
        where: { _IdKoncertu: IdKoncertu }
    });

};
