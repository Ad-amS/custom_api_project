const {User} = require("../models")
const jwt = require("jsonwebtoken")
const config = require("../config/config")
const { response } = require("express")

function jwtSignUser (user) {
    const ONE_HOUR = 60*60 //seconds time minutes
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_HOUR}
    )
}

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body)
            const userJson = user.toJSON()
            res.status(201).send({
               message: "User registered succesfully." 
            })
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: "Username already exists, please choose a different one."
            })
        }
    },
    async login (req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({
                where: {
                    username: username
                }
            })
            if (!user) {
                return res.status(403).send( {
                    error: "Username or password is incorrect."
                })
            }
            const isPasswordValid = await user.comparePassword(password, user.password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: "Username or password is incorrect."
                })
            }
            const userJson = user.toJSON()
            delete userJson.password
            res.cookie("token", jwtSignUser(userJson), {
                maxAge: "3600000",
                httpOnly: false, // same as below
                secure: false //true for production where HTTPS certificate is used
            })
            res.send({
                id: response.id,
                user: userJson,
                token: jwtSignUser(userJson)
            })

        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Error while logging in, try it again later."
            })
        }
    
    },
    async logout (req, res) {
        res.clearCookie("token")
        res.status(200).send({message: "Logout successful."})
    },
    async deleteUser (req, res) {
            try {
                const deleteRegisteredUser = await User.destroy({
                    where: {
                        username: req.body.username
                    }
                })
    
                if(!deleteRegisteredUser){
                    return res.status(404).send({
                        error: "User with this username was not found."
                    })
                }
                return res.status(200).send({
                    message: "User successfully deleted."
                })
            }
            
            catch (err) {
                console.log(err)
                res.status(500).send({
                    error: "Error while deleting user, try it again later." 
                })
            }
    },
}