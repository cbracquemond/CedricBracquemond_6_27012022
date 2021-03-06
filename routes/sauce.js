const express = require("express")
const auth = require("../middlewares/auth")
const sauceCtrl = require("../controlers/sauce")
const multer = require("../middlewares/multer-config")
const router = express.Router()

router.post("/", auth, multer, sauceCtrl.createSauce)
router.get("/", auth, sauceCtrl.getSauces)
router.get("/:id", auth, sauceCtrl.getOneSauce)
router.put("/:id", auth, multer, sauceCtrl.updateSauce)
router.delete("/:id", auth, sauceCtrl.deleteSauce)
router.post("/:id/like", auth, sauceCtrl.likeSauce)

module.exports = router
