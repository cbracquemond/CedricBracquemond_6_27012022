const mongoose = require("mongoose")
const password = process.env.DB_PASSWORD
const userName = process.env.DB_USERNAME
const database = process.env.DB_NAME
const clusterName = process.env.DB_CLUSTERNAME

const uri = `mongodb+srv://${userName}:${password}@${clusterName}.lsuue.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"))

module.exports = { mongoose }
