const {Router} = require('express')
const Events = require('../../models/Event')
const isAuth = require('../../middleware/auth.middleware')
const router = Router()


module.exports = router.post('/subscribe', isAuth, async (req, res) => {
	try {
		const eventId = req.body.id
		const { email } = req.user
		const eventById = await Events.findById(eventId)
		const isEmail = eventById.subscriptions.filter(user => user.email === email)
		if (isEmail.length > 0) {
			return res.json({message:'You Have Already Subscribed To This event!'})
		}
		await Events.updateOne({_id :eventId},{$push:{subscriptions:{email:email}}, $inc:{ freeSpots: -1 }})
		
		return res.status(201).json({message:'Your subscription has been confirmed'})
	}catch (error){
		console.log(error)
		return res.status(400).json({error:error})
	}
})