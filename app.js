const express = require("express")
const app = express()
const mongoose = require("mongoose")

const userRoute = require("./routes/user")

//permet d'acceder au corps de la requete
app.use(express.json)

//connection a MongoDB
mongoose.connect('mongodb+srv://cbracquemond:userk421ys@hottakes.lsuue.mongodb.net/HotTakes?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//permet d'éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
})

app.use("/api/auth", userRoute)
module.exports = app