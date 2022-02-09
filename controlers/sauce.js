const Sauce = require("../models/sauce")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const sercretKey = process.env.SECRET_KEY

exports.createSauce = (req, res) => {
	const sauceObject = JSON.parse(req.body.sauce)
	delete sauceObject._id
	const token = req.headers.authorization.split(" ")[1]
	const decodedToken = jwt.verify(token, sercretKey)
	const userId = decodedToken.userId
	const sauce = new Sauce({
		userId: userId,
		name: sauceObject.name,
		manufacturer: sauceObject.manufacturer,
		description: sauceObject.description,
		mainPepper: sauceObject.mainPepper,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
		heat: sauceObject.heat,
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
			if (req.body.userIdFromToken === sauce.userId) {
				const filename = sauce.imageUrl.split("/images/")[1]
				fs.unlink(`images/${filename}`, () => {
					Sauce.deleteOne({ _id: req.params.id })
						.then(() => res.status(200).json({ message: "Objet supprimé !" }))
						.catch((error) => res.status(400).json({ error }))
				})
			} else {
				res
					.status(400)
					.json({ message: "Vous n'avez pas les droits pour cette requête!" })
			}
		})
		.catch((error) => res.status(500).json({ error }))
}

function updateLike(sauce, like, userId) {
	if (like != 0) {
		const arrayToUpdate = like === 1 ? sauce.usersLiked : sauce.usersDisliked
		if (arrayToUpdate.includes(userId)) return
		arrayToUpdate.push(userId)
	}
	if ((like = 0)) {
	}
	sauce.likes = sauce.usersLiked.length
	sauce.dislikes = sauce.usersDisliked.length
	return sauce.save()
}

exports.likeSauce = (req, res) => {
	const { like, userId } = req.body
	if (![0, 1, -1].includes(like))
		return res.status(400).json({ message: "bad request" })
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => updateLike(sauce, like, userId))
		.then(() => res.status(201).json({ message: "Vote enregistré !" }))
		.catch((error) => res.status(400).json({ error }))
}
