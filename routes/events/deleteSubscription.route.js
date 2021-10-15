const { Router } = require('express')
const router = Router()
const isAuth = require('../../middleware/auth.middleware')
const Events = require('../../models/Event')


module.exports = router.post('/deleteSubscription',isAuth,async (req, res) => {
	try {
		const {email, eventId} = req.body
		const event = await Events.updateOne({_id :eventId},{$pull:{subscriptions:{email:email}}, $inc:{ freeSpots: +1 }})
		if (event.nModified === 0) {
			return res.status(400).json({error:'something went wrong, the subscription was not deleted'})
		}
		res.status(200).json({message:'Subscription deleted successfully'})
	}catch (e) {
		return res.status(400).json({error:e})
	}
})