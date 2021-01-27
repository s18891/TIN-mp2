const Sluchacze = require("../../model/sequelize/Sluchacze");
const Rezerwacje = require("../../model/sequelize/Rezerwacje");
const Koncerty = require("../../model/sequelize/Koncerty");

exports.getKoncerty = () => {
    return Koncerty.findAll();
};

exports.getKoncertyById = (IdKoncertu) => {
    return Koncerty.findByPk(IdKoncertu,
        {
            include: [{
                model: Rezerwacje,
                as: 'rezerwacje',
                include: [{
                    model: Sluchacze,
                    as: 'sluchacze'
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
    const Miejsce_koncertu = SluchaczData.Miejsce_koncertu;
    const Data_koncertu = SluchaczData.Data_koncertu;
    const Maksymalna_ilosc_miejsc = SluchaczData.Maksymalna_ilosc_miejsc;
    const Czas_trwania_koncertu = SluchaczData.Czas_trwania_koncertu;
    return Koncerty.update(KoncertData, {where: {_IdKoncertu: IdKoncertu }});
};

exports.deleteKoncerty = (IdKoncertu) => {
    return Koncerty.destroy({
        where: { _IdKoncertu: IdKoncertu }
    });

};