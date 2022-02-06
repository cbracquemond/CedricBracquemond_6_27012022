const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const sauceRoute = require("./routes/sauce")
const userRoute = require("./routes/user")
const path = require("path") //Pour pouvoir trouver le chemin statique du dossier images
const app = express()

//Middlewares:
//Permet d'éviter les erreurs CORS
app.use(cors())
//permet d'acceder au corps de la requete
app.use(express.json())

// connection a MongoDB
mongoose
	.connect(
		"mongodb+srv://cbracquemond:userk421ys@hottakes.lsuue.mongodb.net/HotTakes?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"))

//Routes
app.use("/api/auth", userRoute)
app.use("/api/sauces", sauceRoute)
app.use("/images", express.static(path.join(__dirname, "images")))

app.get("/", (req, res) => {
	res.send("Hello World!")
})

module.exports = app
