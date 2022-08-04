const sequelize = require("sequelize")
const { Course } = require("../models")

// Create, Read, Update, Delete


module.exports = {
    async index(req, res){
        try {
            const courses = await Course.findAll({})
            res.status(200).send({
                message: courses
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Error while getting courses, try it again later."
            })
        }
    },

    async post(req, res){
        try {
            const newCourse = await Course.create(req.body)
            res.status(201).send({
                message: newCourse
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Error while creating course, try it again later."
            })
        }
    },

    async put(req, res){
        try {
            const updateCourse = await Course.update({
                name: req.body.name,
                description: req.body.description,
                duration: req.body.duration
            }, 
                {returning: true, where: {id: req.body.id}}
            )

            if(!updateCourse){
                return res.status(404).send({
                    error: "Course with this ID was not found."
                })
            }
            return res.status(200).send({
                message: "Course updated successfully."
            })
        }
        
        catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Error while updating courses, try it again later."
            })
        }
    },
    async delete(req, res){
        try {
            const deleteCourse = await Course.destroy({
                where: {
                    id: req.body.id
                }
            })

            if(!deleteCourse){
                return res.status(404).send({
                    error: "Course with this ID was not found."
                })
            }
            return res.status(200).send({
                message: "Course successfully deleted."
            })
        }
        
        catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Error while deleting courses, try it again later." 
            })
        }
    }
}