const express = require("express")
const mongoose = require("mongoose")
const app = express()
mongoose.connect('mongodb+srv://cbracquemond:userk421ys@hottakes.lsuue.mongodb.net/HotTakes?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//permet d'acceder au corps de la requete
app.use(express.json)

//permet d'éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post ("/api/auth/login", (req, res, next) => {
    console.log(req.body)
    res.status(201).json({
        message: "Vous êtes connecté"
    })
})

app.post ("/api/auth/signup", (req, res, next) => {
    console.log(req.body)
    res.status(201).json({
        message: "Vous êtes inscrit"
    })
})


app.get ("/api/sauce", (req, res, next) => {
    const sauce =   [
        {
            name: "hot chili",
            strenght: 3,
            manufacturer: "old el paso",
            price: 310,
            imageUrl:""
        },
        {
            name: "mild chili",
            strenght: 2,
            manufacturer: 'old el paso',
            price: 290,
            imageUrl:""
        },
        {
            name: "cold chili",
            strenght: 1,
            manufacturer: "old el paso",
            price: 240,
            imageUrl:""
        }
    ]
    res.status(200).json(sauce)
})

module.exports = app