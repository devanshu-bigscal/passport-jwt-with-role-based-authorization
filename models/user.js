const { DataTypes } = require("sequelize")
const sequelize = require("../connections/db_connection")

const User = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    }
})
User.sync({ force: true })
module.exports = User