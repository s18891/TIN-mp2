const KoncertyRepository = require('../repository/sequelize/KoncertyRepository');

exports.showKoncertyList = (req, res, next) => {
    KoncertyRepository.getKoncerty()
        .then(koncerty => {
            res.render('artykul1', {
                koncerty: koncerty,
                navLocation: 'koncert'
            });
        });
}

exports.showAddKoncertyForm = (req, res, next) => {
    res.render('artykul3', {
        koncert: {},
        pageTitle: 'Nowy koncert',
        formMode: 'createNew',
        btnLabel: 'Dodaj Koncert',
        formAction: '/koncerty/add',
        navLocation: 'koncert'
    });
}

exports.showEditKoncertyForm = (req, res, next) => {
    res.render('artykul3', {
        koncert: koncert,
        pageTitle: 'Edycja koncertu',
        formMode: 'edit',
        btnLabel: 'Edytuj koncert',
        formAction: '/koncerty/edit',
        navLocation: 'koncert'
    });
}

exports.showKoncertyDetails = (req, res, next) => {
    const IdKoncertu = req.params.IdKoncertu;
    KoncertyRepository.getKoncertyById(IdKoncertu)
        .then(koncert => {
            res.render('artykul3', {
                koncert: koncert,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły koncertu',
                formAction: '',
                navLocation: 'koncert'
            });
        });
}


exports.addKoncerty = (req, res, next) => {
    const koncertData = { ...req.body };
    KoncertyRepository.createKoncerty(koncertData)
        .then( result => {
            res.redirect('/koncerty');
        });


};

exports.updateKoncerty = (req, res, next) => {

    const koncertId = req.body._idKoncertu;
    const koncertData = { ...req.body };
    KoncertyRepository.updateKoncerty(koncertId, koncertData)
        .then( result => {
            res.redirect('/koncerty');
        });
};

exports.deleteKoncerty = (req, res, next) => {
    const koncertId = req.params.koncertId;
    KoncertyRepository.deleteKoncerty(koncertId)
        .then( () => {
            res.redirect('/koncerty');
        });
};

exports.showConcertsList = (req, res, next) => {
    res.render('artykul1', {});
}

exports.showConcertsForm = (req, res, next) => {
    res.render('artykul3', {});
}

exports.showConcertsDetails = (req, res, next) => {
    res.render('artykul4', {});
}