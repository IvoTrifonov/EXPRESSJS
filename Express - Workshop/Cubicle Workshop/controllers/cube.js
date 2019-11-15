const { cubeModel } = require('../models');

function index(req, res, next) {
    const { search, from, to } = req.query;
    const user = req.user;
    let query = {};
    if (search) {
        query = { ...query, name: { $regex: search } };
    }
    if (to) {
        query = { ...query, difficultyLevel: { $lte: +to } };
    }
    if (from) {
        query = {
        ...query,
        difficultyLevel: { ...query.difficultyLevel, $gte: +from }
        };
    }

    cubeModel.find(query).then(cubes => {
        res.render('index.hbs', {
            cubes,
            search,
            from,
            to,
            user
        });
    }).catch(next);
}

function details(req, res) {
    const id = req.params.id;
    const user = req.user;
    cubeModel.findById(id).populate('accessories').then(cube => {
        if(!cube) { res.redirect('/not-found'); return; }
        res.render('details.hbs', { cube, user });
    });
}

function notFound(req, res) {
    res.render('404.hbs');
}

function about(req, res) {
    res.render('about.hbs', { user: req.user });
}

function getCreateCube(req, res) {
    res.render('create.hbs', { user: req.user });
}

function postCreateCube(req, res) {
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    const user = req.user;
    cubeModel.create({ name, description, imageUrl, difficultyLevel, creatorId: user._id }).then(cube => {
        res.redirect('/');
    });
}

function getEdit(req, res, next) {
    const id = req.params.id;
    const userId = req.user.id;
    cubeModel.findOne({ _id: id, creatorId: userId }).then(cube => {
        const options = [
            { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel },
            { title: '2 - Easy', selected: 2 === cube.difficultyLevel },
            { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel },
            { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel },
            { title: '5 - Expert', selected: 5 === cube.difficultyLevel },
            { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel }
          ];

        res.render('editCube.hbs', { cube, options });
    });
}

function postEdit(req, res) {
    const id = req.params.id;
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    const user = req.user; // or const { user } = req.user;
    cubeModel.updateOne({ _id: id }, { name, description, imageUrl, difficultyLevel, creatorId: user._id }).then(cube => {
        res.redirect('/');
    });
}

function getDelete(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    cubeModel.findOne({ _id: id, creatorId: userId }).then(cube => {
        const options = [
            { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel },
            { title: '2 - Easy', selected: 2 === cube.difficultyLevel },
            { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel },
            { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel },
            { title: '5 - Expert', selected: 5 === cube.difficultyLevel },
            { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel }
          ];

        res.render('deleteCube.hbs', { cube, options });
    });
}

function postDelete(req, res) {
    const id = req.params.id;
    const user = req.user;
    cubeModel.findByIdAndDelete({ _id: id, creatorId: user._id }).then(() => { res.redirect('/') });
}

module.exports = { 
    index,
    details,
    notFound,
    about,
    getCreateCube,
    postCreateCube,
    getEdit,
    postEdit,
    getDelete,
    postDelete
}