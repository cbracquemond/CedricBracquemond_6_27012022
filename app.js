//Pour faciliter l'utilisation des variables d'environnement, pour la sécurité
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const sauceRoute = require("./routes/sauce")
const userRoute = require("./routes/user")

//Pour pouvoir trouver le chemin statique du dossier images
const path = require("path")

const app = express()
require("./mongoose")

//Middlewares:
//Permet d'éviter les erreurs CORS
app.use(cors())
//Permet d'acceder au corps de la requête
app.use(express.json())

//Routes:

//Route d'authentification
app.use("/api/auth", userRoute)
//Route de controle
app.use("/api/sauces", sauceRoute)
app.use("/images", express.static(path.join(__dirname, "images")))

//Permet d'accéder à app.js depuis server.js
module.exports = app
