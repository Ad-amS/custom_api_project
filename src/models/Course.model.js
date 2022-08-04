module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        description: DataTypes.STRING,
        duration: DataTypes.STRING
    })

    return Course
}