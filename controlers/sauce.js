const sauce = require("../models/sauce")
const Sauce = require("../models/sauce")

exports.createSauce = (req, res) => {
	delete req.body._id
	const sauce = new Sauce({
		...req.body,
		likes: 0,
		dislikes: 0,
		usersLiked: [],
		usersDisliked: []
	})
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Objet enregistré !" }))
		.catch((error) => res.status(400).json({ error }))
}

exports.getOneSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(404).json({ error }))
}

exports.getSauces = (req, res) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ error }))
}

exports.updateSauce = (req, res) => {
	Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: "Objet modifié !" }))
		.catch((error) => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res) => {
	Sauce.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: "Objet supprimé !" }))
		.catch((error) => res.status(400).json({ error }))
}
