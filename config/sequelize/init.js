const sequelize = require('./sequelize');

const Koncerty = require('../../model/sequelize/Koncerty');
const Rezerwacje = require('../../model/sequelize/Rezerwacje');
const Sluchacze = require('../../model/sequelize/Sluchacze');

module.exports = () => {
    Sluchacze.hasMany(Rezerwacje, {as: 'rezerwacje', foreignKey: {name: 'IdSluchacza', allowNull: false}, constraints: true, onDelete: 'CASCADE'}); //klucze obce do poprawy, walidacja pół unikalnych, przy próbie dodania 2 osob o tym samym mailu ma wyjśc błąd
    Rezerwacje.belongsTo(Sluchacze, {as: 'sluchacze', foreignKey: {name: 'Sluchacze_IdSluchacza', allowNull: false} } );
    Koncerty.hasMany(Rezerwacje, {as: 'rezerwacje', foreignKey: {name: 'IdKoncertu', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rezerwacje.belongsTo(Koncerty, {as: 'koncert', foreignKey: {name: 'Koncerty_IdKoncertu', allowNull: false} });

    let wszystkieKoncerty, wszyscySluchacze;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Sluchacze.findAll();
        })
        .then(sluchacze => {
            if( !sluchacze || sluchacze.length == 0 ) {
                return Sluchacze.bulkCreate([
                    {Imie: 'Jan', Nazwisko: 'Kowalski', Data_dolaczenia: '2020-01-01', Skad_wie_o_koncercie: 'facebook'},
                    {Imie: 'Adam', Nazwisko: 'Wójcik', Data_dolaczenia: '2021-01-01', Skad_wie_o_koncercie: 'plakat'},
                    {Imie: 'Tomasz', Nazwisko: 'Tomaszewski', Data_dolaczenia: '2020-02-01', Skad_wie_o_koncercie: 'reklama'},
                ])
                    .then( () => {
                        return Sluchacze.findAll();
                    });
            } else {
                return sluchacze;
            }
        })
        .then( sluchacze => {
            wszyscySluchacze = sluchacze;
            return Koncerty.findAll();
        })
        .then( koncerty => {
            if( !koncerty || koncerty.length == 0 ) {
                return Koncerty.bulkCreate([
                    { Miejsce_koncertu: 'Stodola', Data_koncertu: '2020-01-01', Maksymalna_ilosc_miejsc: 200, Czas_trwania_koncertu: '01:00' },
                    { Miejsce_koncertu: 'Progresja', Data_koncertu: '2021-01-01', Maksymalna_ilosc_miejsc: 300, Czas_trwania_koncertu: '01:30' },
                ])
                    .then( () => {
                        return Sluchacze.findAll();
                    });
            } else {
                return koncerty;
            }
        })
        .then( koncerty => {
            wszystkieKoncerty = koncerty;
            return Rezerwacje.findAll();
        })
        .then( rezerwacje => {
            if( !rezerwacje || rezerwacje.length == 0 ) {/*
                return Rezerwacje.bulkCreate([
                    {_IdSluchacza: wszyscySluchacze[0]._IdSluchacza, _IdKoncertu: wszystkieKoncerty[0]._idKoncertu, Ilosc_osob: 5000, Czy_przedplata: 'true'},
                    {_IdSluchacza: wszyscySluchacze[1]._IdSluchacza, _IdKoncertu: wszystkieKoncerty[0]._idKoncertu, Ilosc_osob: 4000, Czy_przedplata: 'false'},
                    {_IdSluchacza: wszyscySluchacze[0]._IdSluchacza, _IdKoncertu: wszystkieKoncerty[1]._idKoncertu, Ilosc_osob: 3000, Czy_przedplata: 'true'}
                ]);
            */} else {
                return rezerwacje;
            }
        });
};