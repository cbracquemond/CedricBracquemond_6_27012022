const jwt = require("jsonwebtoken")
const sercretKey = process.env.SECRET_KEY

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		const decodedToken = jwt.verify(token, sercretKey)
		const userId = decodedToken.userId
		if (req.body.userId && req.body.userId !== userId) {
			throw "Invalid user ID"
		} else {
			res.locals.userId = userId
			next()
		}
	} catch {
		res.status(403).json({
			error: new Error("unauthorized request")
		})
	}
}
