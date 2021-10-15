const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')


module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token ) {
			return res.status(401).json({message: 'Not authorized!'})
		}
		const userEmail = await jwt.verify(token, config.get('jwtSecret'))
		const { email } = userEmail
		const user = await User.findOne({email})
		if (user.role === 'admin') {
			req.user = user
			next()
		}
	} catch {
		return res.status(401).json({message: 'Not authorized as administrator'})
	}
}