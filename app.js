const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const sequelize = require("./connections/db_connection")
require("dotenv").config()
const userRoutes = require("./routes/user")
const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const userModel = require("./models/user")

const port = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())
app.use("/auth", userRoutes)


const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET


passport.use(new jwtStrategy(jwtOptions, (payload, done) => {
    userModel.findOne({ where: { email: payload.email } }).then(user => {
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false)
        }
    }).catch(err => console.log(err))
}))



sequelize.authenticate().then(() => app.listen(port, () => {
    console.log(`Server running at port :${port} and DB Connected`);
})).catch(err => console.log("DB CONNECTION FAILED"))
