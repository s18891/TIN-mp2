const sequelize = require('./sequelize');

const Koncerty = require('../../model/sequelize/Koncerty');
const Rezerwacje = require('../../model/sequelize/Rezerwacje');
const Sluchacze = require('../../model/sequelize/Sluchacze');

module.exports = () => {
    Sluchacze.hasMany(Rezerwacje, { onDelete: 'CASCADE'}); //klucze obce do poprawy, walidacja pół unikalnych, przy próbie dodania 2 osob o tym samym mailu ma wyjśc błąd
    Rezerwacje.belongsTo(Sluchacze, { } );
    Koncerty.hasMany(Rezerwacje, { onDelete: 'CASCADE'});
    Rezerwacje.belongsTo(Koncerty, { });


    let wszystkieKoncerty, wszyscySluchacze;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Sluchacze.findAll();
        })
        .then(sluchacze => {
            if( !sluchacze || sluchacze.length == 0 ) {
                return Sluchacze.bulkCreate([
                    {
                        Imie: 'Jan',
                        Nazwisko: 'Kowalski',
                        Data_dolaczenia: '2020-01-01',
                        Skad_wie_o_koncercie: 'facebook',
                        login: 'admin',
                        email: 'test@test.test',
                        password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
                        isAdmin: 'true'
                    },
                    {
                        Imie: 'Adam',
                        Nazwisko: 'Wójcik',
                        Data_dolaczenia: '2021-01-01',
                        Skad_wie_o_koncercie: 'plakat',
                        login: 'user1',
                        email: 'test1@test.test',
                        password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
                        isAdmin: 'false'
                    },
                    {
                        Imie: 'Tomasz',
                        Nazwisko: 'Tomaszewski',
                        Data_dolaczenia: '2020-02-01',
                        Skad_wie_o_koncercie: 'reklama',
                        login: 'user2',
                        email: 'test2@test.test',
                        password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
                        isAdmin: 'false'
                    },
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
          .then( () => {
              return Koncerty.findAll();
          })
        .then( koncerty => {
            wszystkieKoncerty = koncerty;
            return Rezerwacje.findAll();
        })
        .then( rezerwacje => {console.log(rezerwacje);
            if( !rezerwacje || rezerwacje.length == 0 ) {
                return Rezerwacje.bulkCreate([
                    {SluchaczeIdSluchacza: wszyscySluchacze[1]._IdSluchacza, KoncertyIdKoncertu: wszystkieKoncerty[0]._IdKoncertu, Ilosc_osob: 5000, Czy_przedplata: 'true'},
                ]);
            } else {
                return rezerwacje;
            }
        })
      ;
};
