const CoursesController = require('./controllers/CoursesController');
;

module.exports = (app) => {
    /******** COURSES *******/


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