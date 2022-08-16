const CoursesController = require('./controllers/CoursesController');
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthorisationController = require("./controllers/AuthorisationController");

module.exports = (app) => {
    /******** AUTHENTICATION *******/
    app.get('/api/logout', 
    AuthenticationController.logout),

    app.delete('/api/deleteUser', 
    AuthenticationController.deleteUser),

    app.post('/api/login', 
    AuthenticationController.login),

    app.post('/api/register', 
    AuthenticationController.register),

    /******** COURSES *******/
    app.get('/api/courses',
    AuthorisationController.validateLogin,
    CoursesController.index)

    app.post('/api/courses',
    AuthorisationController.validateLogin,
    CoursesController.post)

    app.put('/api/courses',
    AuthorisationController.validateLogin,
    CoursesController.put)

    app.delete('/api/courses',
    AuthorisationController.validateLogin,
    CoursesController.delete)
}