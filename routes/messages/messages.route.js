const { Router } = require('express')
const router = Router()
const Events = require('../../models/Event')
const isAuth = require('../../middleware/auth.middleware')
const User = require('../../models/User')

module.exports = router.get('/send', isAuth, async (req, res) => {
	try {
		const {email, name} = req.user
		
	}catch (e) {
	
	}
})