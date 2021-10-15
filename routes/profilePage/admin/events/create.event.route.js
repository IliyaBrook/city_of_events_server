const {Router} = require('express')
const router = Router()
const Event = require('../../../../models/Event')
const isAdmin = require('../../../../middleware/isAdmin.middleware')
const {body, validationResult} = require('express-validator')

const inputEventMiddlewareValidator = [
	body('eventName', 'Event name cannot be empty').isLength({min: 1}),
	body('eventDescription', 'Event description cannot be empty').isLength({min: 1}),
	body('categories', 'Enter a category').exists({checkFalsy: true}),
	body('startDate', 'Enter start date').exists({checkFalsy: true}),
	body('endDate', 'Enter end date').exists({checkFalsy: true}),
	body('startTime', 'Enter start Time').exists({checkFalsy: true}),
	body('endTime', 'Enter end Time').exists({checkFalsy: true}),
	body('freeSpots', 'Enter valid spots number').custom(value => value > 0),
]

module.exports = router.post('/eventsManagment', isAdmin, inputEventMiddlewareValidator, async (req, res) => {
	try {
		const validatorErrors = validationResult(req).array()
		if (validatorErrors.length !== 0) {
			return res.status(400).json({message: validatorErrors})
		}
		const {id, email, name} = req.user
		const userRequest = req.body
		const isDuplicate = await Event.findOne({eventName: userRequest.eventName})
		if (isDuplicate) {
			return res.status(400).json({message: 'Event already exists'})
		}
		const newEvent = new Event({
			...userRequest,
			createdBy: {id, email, name},
			subscriptions: [],
		})
		await newEvent.save()
		const createdEvent = await Event.findOne({eventName: userRequest.eventName})
		return res.status(200).json(createdEvent)
	} catch (errors) {
		return res.status(400).json({message: errors})
	}
})