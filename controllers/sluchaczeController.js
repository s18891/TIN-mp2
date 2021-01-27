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
    res.render('ankieta3', {
        sluchacz: {},
        pageTitle: 'Nowy sluchacz',
        formMode: 'createNew',
        btnLabel: 'Dodaj Sluchacza',
        formAction: '/sluchacze/add',
        navLocation: 'sluchacz'
    });
}

exports.showEditSluchaczeForm = (req, res, next) => {
    res.render('ankieta3', {
        sluchacz: sluchacz,
        pageTitle: 'Edycja sluchacza',
        formMode: 'edit',
        btnLabel: 'Edytuj sluchacza',
        formAction: '/sluchacze/edit',
        navLocation: 'sluchacz'
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
                    navLocation: 'sluchacz'
                });
            });
    }


exports.addSluchacze = (req, res, next) => {
    const sluchaczData = { ...req.body };
    SluchaczeRepository.createSluchacze(sluchaczData)
        .then( result => {
            res.redirect('/sluchacze');
        });


};

exports.updateSluchacze = (req, res, next) => {

    const sluchaczId = req.body._idSluchacza;
    const sluchaczData = { ...req.body };
    SluchaczeRepository.updateSluchacze(sluchaczId, sluchaczData)
        .then( result => {
            res.redirect('/sluchacze');
        });
};

exports.deleteSluchacze = (req, res, next) => {
    const sluchaczId = req.params.sluchaczId;
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