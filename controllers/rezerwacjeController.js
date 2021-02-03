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
    if (!Guard.isLoggedIn(req)) {
        console.log("WEJŚCIE W SPRAWDZENIE LOGOWANIA w controller.js")

        return res.redirect('/auth/login');
    }
    if (!Guard.isAdmin(req)) {
        console.log("WEJŚCIE W SPRAWDZENIE Admina w controller.js")

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
                    allSluchacze: allSluchacze,
                    allKoncerty: allKoncerty,
                    pageTitle: 'Nowe rezerwacje',
                    btnLabel: 'Dodaj rezerwacje',
                    formAction: '/rezerwacje/add',
                    navLocation: 'rezerwacja',
                    validationErrors: [],
                });
            });
    }else {

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
                    formMode: 'createNewAsAdmin',
                    allSluchacze: allSluchacze,
                    allKoncerty: allKoncerty,
                    pageTitle: 'Nowe rezerwacjeADMIN',
                    btnLabel: 'Dodaj rezerwacje',
                    formAction: '/rezerwacje/add',
                    navLocation: 'rezerwacja',
                    validationErrors: [],
                });
            });
    }
}

exports.showEditRezerwacjeForm = async (req, res, next) => {
    if (!Guard.isLoggedIn(req)) {
        return res.redirect('/auth/login');
    }
    if (!Guard.isAdmin(req)) {

        const IdRezerwacji = req.params.IdRezerwacji;
        const rezerwacja = await RezerwacjeRepository.getRezerwacjeById(IdRezerwacji)
        return res.render('ankieta', {
            rezerwacja: rezerwacja,
            formMode: 'edit',
            allSluchacze: await SluchaczeRepository.getSluchacze(),
            allKoncerty: await KoncertyRepository.getKoncerty(),
            pageTitle: 'Edycja rezerwacje',
            btnLabel: 'Edytuj rezerwacje',
            formAction: '/rezerwacje/edit',
            navLocation: 'rezerwacja',
            validationErrors: [],
        });
    } else {
        const IdRezerwacji = req.params.IdRezerwacji;
        const rezerwacja = await RezerwacjeRepository.getRezerwacjeById(IdRezerwacji)
        return res.render('ankieta', {
            rezerwacja: rezerwacja,
            formMode: 'editAsAdmin',
            allSluchacze: await SluchaczeRepository.getSluchacze(),
            allKoncerty: await KoncertyRepository.getKoncerty(),
            pageTitle: 'Edycja rezerwacje',
            btnLabel: 'Edytuj rezerwacje',
            formAction: '/rezerwacje/edit',
            navLocation: 'rezerwacja',
            validationErrors: [],
        });

    }
}

exports.showRezerwacjeDetails = async (req, res, next) => {
    if (!Guard.isLoggedIn(req)) {
        return res.redirect('/auth/login');
    }
    const IdRezerwacji = req.params.IdRezerwacji;
    const rezerwacja = await RezerwacjeRepository.getRezerwacjeById(IdRezerwacji)
    return res.render('ankieta', {
        rezerwacja: rezerwacja,
        formMode: 'showDetails',
        allSluchacze: await SluchaczeRepository.getSluchacze(),
        allKoncerty: await KoncertyRepository.getKoncerty(),
        pageTitle: 'Szczegóły rezerwacji',
        btnLabel: 'Edytuj rezerwacje',
        formAction: '/rezerwacje/edit',
        navLocation: 'rezerwacja',
        validationErrors: [],
    });
}



exports.addRezerwacje = async (req, res, next) => {
    if (!Guard.isLoggedIn(req)) {
        return res.redirect('/auth/login');
    }
    console.log("DODAWANIE REZERWACJI")
    const user = req.session.user;
    let rezerwacjaData = { ...req.body, SluchaczeIdSluchacza: user._IdSluchacza };
    if(Guard.isAdmin(req)){
        rezerwacjaData = { ...req.body};
    }
    try {
        await RezerwacjeRepository.createRezerwacje(rezerwacjaData);
    } catch(e) {
        return res.render('ankieta', {
            rezerwacja: rezerwacjaData,
            formMode: 'createNewAsAdmin',
            allSluchacze: await SluchaczeRepository.getSluchacze(),
            allKoncerty: await KoncertyRepository.getKoncerty(),
            pageTitle: 'Dodanie rezerwacji',
            btnLabel: 'Dodaj rezerwacje',
            formAction: '/rezerwacje/add',
            navLocation: 'rezerwacja',
            validationErrors: e.errors,
        });
    }
    return res.redirect('/rezerwacje');
};

exports.updateRezerwacje = async (req, res, next) => {
    if (!Guard.isLoggedIn(req)) {
        return res.redirect('/auth/login');
    }
    const IdRezerwacji = req.params.IdRezerwacji;
    const rezerwacjaData = { ...req.body };
    let errors = [];
    try {
        await RezerwacjeRepository.updateRezerwacje(IdRezerwacji, rezerwacjaData);
    } catch (e) {
        errors = e.errors
        return res.render('ankieta', {
            rezerwacja: rezerwacjaData,
            formMode: 'edit',
            allSluchacze: await SluchaczeRepository.getSluchacze(),
            allKoncerty: await KoncertyRepository.getKoncerty(),
            pageTitle: 'Edycja rezerwacje',
            btnLabel: 'Edytuj rezerwacje',
            formAction: '/rezerwacje/edit',
            navLocation: 'rezerwacja',
            validationErrors: errors,
        });
    }
    return res.redirect('/rezerwacje')
};

exports.deleteRezerwacje = (req, res, next) => {
    if (!Guard.isLoggedIn(req)) {
        return res.redirect('/auth/login');
    }
    const rezerwacjaId = req.params.IdRezerwacji;
    RezerwacjeRepository.deleteRezerwacje(rezerwacjaId)
        .then( () => {
            res.redirect('/rezerwacje');
        });
};
