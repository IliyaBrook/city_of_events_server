const { Router } = require('express')
const Event = require('../../../../models/Event')
const isAdmin = require('../../../../middleware/isAdmin.middleware')
const router = Router()

module.exports = router.post('/deleteEvent', isAdmin,async (req, res) => {
	try {
		const eventId = req.body.eventId
		await Event.findOneAndRemove({_id:eventId})
		return res.status(201).json({message:'Event deleted successfully'})
	}catch (errors) {
		return res.status(201).json({message:'Delete event failed'})
	}
})