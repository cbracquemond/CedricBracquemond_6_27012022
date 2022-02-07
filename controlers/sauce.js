const Sauce = require("../models/sauce")
const fs = require("fs")

exports.createSauce = (req, res) => {
	const sauceObject = JSON.parse(req.body.sauce)
	delete sauceObject._id
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
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

// exports.updateSauce = (req, res) => {
// 	console.log(req.body)
// 	if (req.body === null) {
// 		res.status(400).json({ message: "le body est vide" })
// 	}
// 	Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
// 		.then(() => res.status(200).json({ message: "Objet modifié !" }))
// 		.catch((error) => res.status(400).json({ error }))
// }

exports.updateSauce = (req, res, next) => {
	console.log(req.body)
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`
		  }
		: { ...req.body }
	Sauce.updateOne(
		{ _id: req.params.id },
		{ ...sauceObject, _id: req.params.id }
	)
		.then(() => res.status(200).json({ message: "Objet modifié !" }))
		.catch((error) => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			if (req.body.userIdFromToken !== sauce.userId) {
			}
			const filename = sauce.imageUrl.split("/images/")[1]
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "Objet supprimé !" }))
					.catch((error) => res.status(400).json({ error }))
			})
		})
		.catch((error) => res.status(500).json({ error }))
}
