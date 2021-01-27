const SluchaczeRepository = require("../repository/sequelize/SluchaczeRepository");
const KoncertyRepository = require("../repository/sequelize/KoncertyRepository");
const RezerwacjeRepository = require('../repository/sequelize/RezerwacjeRepository');


exports.showRezerwacjeList = (req, res, next) => {
    RezerwacjeRepository.getRezerwacje()
        .then(rezerwacja => {
            res.render('artykul2', {
                rezerwacja: rezerwacja,
                navLocation: 'rezerwacja'
            });
        });
}

exports.showAddRezerwacjeForm = (req, res, next) => {
    let allSluchacze, allKoncerty;
    SluchaczeRepository.getSluchacze()
        .then(sluchacze => {
            allSluchacze = sluchacze;
            return KoncertyRepository.getKoncerty();
        })
        .then(koncerty => {
            allKoncerty = koncerty;
            res.render('ankieta', {
                rezerwacja: {},
                formMode: 'createNew',
                allEmps: allSluchacze,
                allDepts: allKoncerty,
                pageTitle: 'Nowe rezerwacje',
                btnLabel: 'Dodaj rezerwacje',
                formAction: '/rezerwacje/add',
                navLocation: 'rezerwacja'
            });
        });
}

exports.showEditRezerwacjeForm = (req, res, next) => {
    let allSluchacze, allKoncerty;
    SluchaczeRepository.getSluchacze()
        .then(sluchacze => {
            allSluchacze = sluchacze;
            return KoncertyRepository.getKoncerty();
        })
        .then(koncerty => {
            allKoncerty = koncerty;
            res.render('ankieta', {
                rezerwacja: rezerwacja,
                formMode: 'edit',
                allEmps: allSluchacze,
                allDepts: allKoncerty,
                pageTitle: 'Edycja rezerwacje',
                btnLabel: 'Edytuj rezerwacje',
                formAction: '/rezerwacje/edit',
                navLocation: 'rezerwacja'
            });
        });
}

exports.showRezerwacjeDetails = (req, res, next) => {
    const IdRezerwacji = req.params.IdRezerwacji;
    let allSluchacze, allKoncerty;
    SluchaczeRepository.getSluchacze()
        .then(sluchacze => {
            allSluchacze = sluchacze;
            return KoncertyRepository.getKoncerty();
        }).then(RezerwacjeRepository.getRezerwacjeById(IdRezerwacji))
        .then(koncerty => {
            allKoncerty = koncerty;
            res.render('ankieta', {
                rezerwacja: rezerwacja,
                formMode: 'showDetails',
                allEmps: allSluchacze,
                allDepts: allKoncerty,
                pageTitle: 'Szczegóły rezerwacji',
                formAction: '',
                navLocation: 'rezerwacja'
            });
        });
}



exports.addRezerwacje = (req, res, next) => {
    const rezerwacjaData = { ...req.body };
    RezerwacjeRepository.createRezerwacje(rezerwacjaData)
        .then( result => {
            res.redirect('/rezerwacje');
        });


};

exports.updateRezerwacje = (req, res, next) => {

    const rezerwacjaId = req.body._idRezerwacji;
    const rezerwacjaData = { ...req.body };
    RezerwacjeRepository.updateRezerwacje(rezerwacjaId, rezerwacjaData)
        .then( result => {
            res.redirect('/rezerwacje');
        });
};

exports.deleteRezerwacje = (req, res, next) => {
    const rezerwacjaId = req.params.rezerwacjaId;
    RezerwacjeRepository.deleteKoncerty(rezerwacjaId)
        .then( () => {
            res.redirect('/rezerwacje');
        });
};









exports.showReservationsList = (req, res, next) => {
    res.render('artykul2', {});
}

exports.showReservationsForm = (req, res, next) => {
    res.render('ankieta', {});
}

exports.showReservationsDetails = (req, res, next) => {
    res.render('ankieta1', {});
}