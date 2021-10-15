const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {validationResult, body} = require('express-validator')
const router = Router()


const middlewareRegValidate = [
	body('password', 'Minimum length password 6 character').isLength({min: 6}),
	body('email', 'Incorrect email address').isEmail(),
	body('name', 'Name field cannot be empty!').isLength({min: 1}),
	body('email', 'Email cannot be empty').isLength({min: 1})
]

router.post('/registration', middlewareRegValidate
	, async (req, res) => {
		try {
			const errors = validationResult(req).array()
			if (errors.length !== 0) {
				let objErrors = {}
				errors.forEach(elem => objErrors = {...objErrors, [elem.param]: elem.msg})
				return res.status(400).json(objErrors)
			}
			const {email, password, name} = req.body
			const candidate = await User.findOne({email})
			if (candidate) {
				return res.status(400).json({registrationMessage: 'user already exist'})
			}
			const hashedPassword = await bcrypt.hash(password, 10)
			const user = new User({email, password: hashedPassword, name, role: 'user'})
			await user.save()
			res.status(201).json({registrationMessage: "user has been created"})
		} catch (e) {
			console.log(e)
			return res.status(500).json({
				registrationError: 'Service temporarily unavailable, please try again later'
			})
		}
	})

module.exports = router