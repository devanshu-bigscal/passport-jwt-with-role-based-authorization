const passport = require("passport")

exports.isAuth = (roles) => (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(401).json({ error: { message: "Unauthorized User" } })
        }
        else {
            if (!roles || !Array.isArray(roles) && roles == user.role) {
                req.user = user
                return next()
            }
            if (roles.includes(user.role)) {
                req.user = user
                return next()
            }
            else {
                return res.status(401).json({ error: { message: "Unauthorized User" } })

            }
        }
    })(req, res, next)
}
