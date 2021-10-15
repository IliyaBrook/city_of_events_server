const { Router } = require('express')
const router = Router()
const Events = require('../../models/Event')
const isAuth = require('../../middleware/auth.middleware')

module.exports = router.get('/refreshEvents', isAuth, async (req, res) => {
	try {
		const allEvents = await Events.find()
		return res.status(200).json(allEvents)
	}catch (e) {
		return res.status(400).json({message: e})
	}
})