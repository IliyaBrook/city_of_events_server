const {Router} = require('express')
const {body, validationResult} = require('express-validator')
const config = require('config')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = Router()
const jwt = require('jsonwebtoken')
const loginMiddleWareValidator = [
	body('email', 'Log in filed cannot be empty!').isLength({min: 1}),
	body('email', 'Please enter correct email').isEmail(),
	body('password', 'Password filed cannot be empty!').isLength({min: 1}),
]
module.exports = router.post('/login', loginMiddleWareValidator, async (req, res) => {
	try {
		const errors = validationResult(req).array()
		if (errors.length !== 0) {
			let objErrors = {}
			errors.forEach(elem => objErrors = {...objErrors, [elem.param]: elem.msg})
			const newErrorObj = {emailError: objErrors.email, passwordError: objErrors.password}
			return res.status(400).json(newErrorObj)
		}
		const {email, password} = req.body
		const user = await User.findOne({email})
		
		if (!user) {
			return res.status(401).json({loginErrors: 'Not authorized!'})
		}
		const isMatchPassword = await bcrypt.compare(password, user.password)
		if (!isMatchPassword) {
			return res.status(401).json({loginErrors: 'Not authorized!'})
		}
		
		const token = await jwt.sign
		(
			{email: user.email, name: user.name}
			, config.get('jwtSecret'),
			{expiresIn: '24h'}
		)
		return res.status(200).json({
			email: user.email,
			name: user.name,
			token,
			role: user.role
		})
	} catch (e) {
		console.log(e)
		return res.status(500).json({
			loginError: 'Service temporarily unavailable, please try again later'
		})
	}
})