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
        navLocation: 'koncert',
        validationErrors: [],
    });
}

exports.showEditKoncertyForm = async (req, res, next) => {
    const koncert = await KoncertyRepository.getKoncertyById(req.params.IdKoncertu);
    return res.render('artykul3', {
        koncert,
        pageTitle: 'Edycja koncertu',
        formMode: 'edit',
        btnLabel: 'Edytuj koncert',
        formAction: '/koncerty/edit',
        navLocation: 'koncert',
        validationErrors: [],
    });
}

exports.showKoncertyDetails = async (req, res, next) => {
    const IdKoncertu = req.params.IdKoncertu;
    const koncert = await KoncertyRepository.getKoncertyById(IdKoncertu);
    return res.render('artykul3', {
        koncert,
        formMode: 'showDetails',
        pageTitle: 'Szczegóły koncertu',
        formAction: '',
        navLocation: 'koncert',
        validationErrors: [],
    });
}


exports.addKoncerty = (req, res, next) => {
    const koncertData = { ...req.body };
    KoncertyRepository.createKoncerty(koncertData)
        .then( result => {
            req.session.flashMessage = 'Dodano nowy rekord';
            res.redirect('/koncerty');
        }).catch(err => {
        res.render('artykul3', {
            koncert: koncertData,
            pageTitle: 'Nowy koncert',
            formMode: 'createNew',
            btnLabel: 'Nowy koncert',
            formAction: '/koncerty/add',
            navLocation: 'koncert',
            validationErrors: err.errors
        });
    });
};

exports.updateKoncerty = (req, res, next) => {

    const koncertId = req.params.IdKoncertu;
    const koncertData = { ...req.body };
    KoncertyRepository.updateKoncerty(koncertId, koncertData)
        .then( result => {
            res.redirect('/koncerty');
        }).catch(err => {
        res.render('artykul3', {
            koncert: koncertData,
            pageTitle: 'Edycja koncertu',
            formMode: 'edit',
            btnLabel: 'Edytuj koncert',
            formAction: '/koncerty/edit',
            navLocation: 'koncert',
            validationErrors: err.errors
        });
    });
};

exports.deleteKoncerty = (req, res, next) => {
    const koncertId = req.params.IdKoncertu;
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
