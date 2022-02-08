const mongoose = require("mongoose")

const password = process.env.DB_PASSWORD
const uri = `mongodb+srv://cbracquemond:${password}@hottakes.lsuue.mongodb.net/HotTakes?retryWrites=true&w=majority`

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"))

module.exports = { mongoose }
