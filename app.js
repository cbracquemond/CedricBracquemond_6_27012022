const express = require("express")
const mongoose = require("mongoose")
// const cors = require("cors")
const userRoute = require("./routes/user")
const app = express()

// connection a MongoDB
mongoose.connect('mongodb+srv://cbracquemond:userk421ys@hottakes.lsuue.mongodb.net/HotTakes?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// // app.use(cors())
  
//   //permet d'éviter les erreurs CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
  })
  
// //permet d'acceder au corps de la requete
app.use(express.json())

// app.use("/", (req, res, next) => {
//   console.log("hello world")
//   return res.status(200).json({ "Message": "hello world"})
// })

app.use("/api/auth", userRoute)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app