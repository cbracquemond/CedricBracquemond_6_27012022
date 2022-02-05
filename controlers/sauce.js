const Sauce = require("../models/sauce")

exports.createSauce = (req, res) => {
	delete req.body._id
	const sauce = new Sauce({
		name: req.body.name,
		manufacturer: req.body.manufacturer,
		description: req.body.description,
		mainPepper: req.body.mainPepper,
		imageUrl: req.body.imageUrl,
		heat: req.body.heat,
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

exports.updateSauce = (req, res) => {}
