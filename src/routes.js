const CoursesController = require('./controllers/CoursesController');
const AuthenticationController = require('./controllers/AuthenticationController');

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
    CoursesController.index)

    app.post('/api/courses',
    CoursesController.post)

    app.put('/api/courses',
    CoursesController.put)

    app.delete('/api/courses',
    CoursesController.delete)
}