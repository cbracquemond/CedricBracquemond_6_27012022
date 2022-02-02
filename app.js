const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRoute = require("./routes/user")
const app = express()

//Middlewares:
//Permet d'éviter les erreurs CORS
app.use(cors())
//permet d'acceder au corps de la requete
app.use(express.json())

// connection a MongoDB
mongoose.connect('mongodb+srv://cbracquemond:userk421ys@hottakes.lsuue.mongodb.net/HotTakes?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))
  
//Routes
app.post("/api/auth", userRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app