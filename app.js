/**		A faire: Effacer ancienne image du back après un put
 * 		refactor createSauce pour retirer le code redondant de récupération de l'id
 * 		Change deleteSauce pour passer l'erreur en haut avec un return
 * 		Tout commenter
 */

require("dotenv").config()
const express = require("express")
const cors = require("cors")
const sauceRoute = require("./routes/sauce")
const userRoute = require("./routes/user")
const path = require("path") //Pour pouvoir trouver le chemin statique du dossier images
const app = express()
require("./mongoose")

//Middlewares:
//Permet d'éviter les erreurs CORS
app.use(cors())
//permet d'acceder au corps de la requête
app.use(express.json())

//Routes
app.use("/api/auth", userRoute)
app.use("/api/sauces", sauceRoute)
app.use("/images", express.static(path.join(__dirname, "images")))

app.get("/", (req, res) => {
	res.send("Hello World!")
})

module.exports = app
