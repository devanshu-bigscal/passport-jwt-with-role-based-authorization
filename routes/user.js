const { signup, login, getProfile } = require("../controllers/user")

const router = require("express")()

const passport = require("passport")

const { isAuth } = require("../middlewares/auth")
router.post("/signup", signup)
router.post("/login", login)
router.get("/profile", isAuth(['USER']), getProfile)


module.exports = router