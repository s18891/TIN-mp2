const SluchaczeRepository = require('../repository/sequelize/SluchaczeRepository');

exports.showSluchaczeList = (req, res, next) => {
    SluchaczeRepository.getSluchacze()
        .then(sluchacze => {
            res.render('artykul5', {
                sluchacze: sluchacze,
                navLocation: 'sluchacz'
            });
        });
}

exports.showAddSluchaczeForm = (req, res, next) => {
    res.render('register', {
        auth: {},
        validationErrors: [],
    });
}

exports.showEditSluchaczeForm = async (req, res, next) => {
    return res.render('ankieta3', {
        sluchacz: await SluchaczeRepository.getSluchaczeById(req.params.IdSluchacza),
        pageTitle: 'Edycja sluchacza',
        formMode: 'edit',
        btnLabel: 'Edytuj sluchacza',
        formAction: '/sluchacze/edit',
        navLocation: 'sluchacz',
        validationErrors: [],
    });
}

exports.showSluchaczeDetails = (req, res, next) => {
    const IdSluchacza = req.params.IdSluchacza;
        SluchaczeRepository.getSluchaczeById(IdSluchacza)
            .then(sluchacz => {
                res.render('ankieta3', {
                    sluchacz: sluchacz,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły sluchacza',
                    formAction: '',
                    navLocation: 'sluchacz',
                    validationErrors: [],
                });
            });
    }


exports.addSluchacze = async (req, res, next) => {
    const auth = { ...req.body };console.log(auth);
    if (!auth.password || auth.password.length < 5) {
        return res.render('register', {validationErrors: [{path: 'password', message: 'Wymagane więcej niż 4 znaki'}], auth: auth});
    }
    try {
        await SluchaczeRepository.createUser({...auth});
    }  catch (e) {
        return res.render('register', {validationErrors: e.errors, auth: auth});
    }

    return res.redirect('/sluchacze');
};

exports.updateSluchacze = async (req, res, next) => {

    const sluchaczId = req.params.IdSluchacza;
    const sluchaczData = { ...req.body };
    try {
        await SluchaczeRepository.updateSluchacze(sluchaczId, sluchaczData)
    } catch (e) {
        return res.render('ankieta3', {
            sluchacz: await SluchaczeRepository.getSluchaczeById(req.params.IdSluchacza),
            pageTitle: 'Edycja sluchacza',
            formMode: 'edit',
            btnLabel: 'Edytuj sluchacza',
            formAction: '/sluchacze/edit',
            navLocation: 'sluchacz',
            validationErrors: e.errors,
        });
    }

    return res.redirect('/sluchacze');
};

exports.deleteSluchacze = (req, res, next) => {
    const sluchaczId = req.params.IdSluchacza;
    SluchaczeRepository.deleteSluchacze(sluchaczId)
        .then( () => {
            res.redirect('/sluchacze');
        });
};






















exports.showListenersList = (req, res, next) => {
    res.render('artykul5', {});
}

exports.showListenersForm = (req, res, next) => {
    res.render('ankieta3', {});
}

exports.showListenersDetails = (req, res, next) => {
    res.render('ankieta4', {});
}
