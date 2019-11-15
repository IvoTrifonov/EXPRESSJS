// TODO: Require Controllers...
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const authController = require('../controllers/auth');
const { auth } = require('../utils');
const { body } = require('express-validator'); 

module.exports = (app) => {
    app.get('/create/accessory', auth(), accessoryController.createGet);
    app.post('/create/accessory', accessoryController.createPost);

    app.get('/attach/accessory/:id', accessoryController.attachGet);
    app.post('/attach/accessory/:id', accessoryController.attachPost);
    
    // register
    app.get('/register', authController.getRegister);
    app.post('/register', body(['password', 'repeatPassword', 'Passwords don\' match!']).custom(([password, repeatPassword]) => {
        return password === repeatPassword;  
    }), authController.postRegister);

    // login
    app.get('/login', authController.getLogin);
    app.post('/login', authController.postLogin)

    app.get('/details/:id',auth(false), cubeController.details);
    app.get('/about', auth(false), cubeController.about);
    app.get('/not-found', cubeController.notFound);
    app.get('/create', auth(), cubeController.getCreateCube);
    app.post('/create', auth(), cubeController.postCreateCube);
    
    app.get('/edit/:id', auth(), cubeController.getEdit);
    app.post('/edit/:id', auth(), cubeController.postEdit);

    app.get('/delete/:id', auth(), cubeController.getDelete);
    app.post('/delete/:id', auth(), cubeController.postDelete);

    app.get('/logout', authController.logout);
    app.get('/', auth(false), cubeController.index);
};