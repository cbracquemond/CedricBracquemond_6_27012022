const express = require("express")
const router = express.Router()
const userCtrl = require("../controlers/user")
const auth = require("../middlewares/auth")

router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)

module.exports = router