const express = require("express")
const auth = require("../middlewares/auth")
const sauceCtrl = require("../controlers/sauce")
const multer = require("../middlewares/multer-config")

const router = express.Router()

router.post("/", sauceCtrl.createSauce)
// router.put(":id/", auth, sauceCtrl.updateSauce)

module.exports = router
