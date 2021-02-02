const SluchaczeRepository = require("../repository/sequelize/SluchaczeRepository");
const KoncertyRepository = require("../repository/sequelize/KoncertyRepository");
const RezerwacjeRepository = require('../repository/sequelize/RezerwacjeRepository');
const Guard = require('../services/guard');


exports.showRezerwacjeList = async (req, res, next) => {
    if (!Guard.isLoggedIn(req)) {
        return res.redirect('/auth/login');
    }
    let rezerwacje = [];
    if (req.session.user.isAdmin) {
        rezerwacje = await RezerwacjeRepository.getRezerwacje();
    } else {
        rezerwacje = await RezerwacjeRepository.getRezerwacjeByUser(req.session.user);
    }
    return res.render('artykul2', {
        rezerwacje,
        navLocation: 'rezerwacja'
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
                allKoncerty: allKoncerty,
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
    const user = req.session.user;
    const rezerwacjaData = { ...req.body, UserId: user._id };
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
