const Sauce = require("../models/sauce")
const fs = require("fs")

exports.createSauce = (req, res) => {
	const sauceObject = JSON.parse(req.body.sauce)
	delete sauceObject._id
	const userId = res.locals.userId // => taken from the auth.js middleware
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
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`
		  }
		: { ...req.body }

	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const imageToDelete = sauce.imageUrl.split("/images/")[1]
			Sauce.updateOne(
				{ _id: req.params.id },
				{ ...sauceObject, _id: req.params.id }
			)
				.then(
					fs.unlink(`images/${imageToDelete}`, () =>
						res.status(200).json({ message: "Objet modifié !" })
					)
				)
				.catch((error) => res.status(400).json({ error }))
		})
		.catch((error) => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			if (res.locals.userId != sauce.userId) {
				res
					.status(400)
					.json({ message: "Vous n'avez pas les droits pour cette requête!" })
				return
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

/**
 * Find the index of the userId in the array. Then if it's present, remove it
 * @param {array} array
 * @param {string} userId
 */
function removeUserFromArray(array, userId) {
	const index = array.findIndex((id) => id == userId)
	if (index != -1) array.splice(index, 1)
}

/**
 * Check if the call is a vote (1 or -1) or the removal of a vote (0),
 * if a vote: will include the userId to the relevant array and check
 * the other one to remove it if necessary
 * if a removal: will remove the userId from the relevant array
 * then will update the number of like and dislike with the length of both array
 * and return a promise from the sauce.save() function
 * @param {object} sauce
 * @param {number} like
 * @param {array} userId
 * @returns promise
 */
function updateLike(sauce, like, userId) {
	const { usersLiked, usersDisliked } = sauce
	if (like != 0) {
		const arrayToUpdate = like === 1 ? usersLiked : usersDisliked
		const arrayToCheck = like === 1 ? usersDisliked : usersLiked
		removeUserFromArray(arrayToCheck, userId)
		//Stop the function if the vote is already present
		if (arrayToUpdate.includes(userId)) return
		arrayToUpdate.push(userId)
	}
	if (like === 0) {
		const arrayToUpdate = usersLiked.includes(userId)
			? usersLiked
			: usersDisliked
		removeUserFromArray(arrayToUpdate, userId)
	}
	sauce.likes = usersLiked.length
	sauce.dislikes = usersDisliked.length
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
