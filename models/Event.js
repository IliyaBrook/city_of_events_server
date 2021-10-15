const {Schema, model} = require('mongoose')

const schema = new Schema({
	eventName: {type:String, unique: true},
	startDate: {type:String },
	endDate: {type:String},
	startTime: {type:String},
	endTime: {type:String},
	eventDescription: {type:String},
	color:{type:String},
	freeSpots:{type:Number},
	categories:{type:String},
	createdBy: {type:Object},
	subscriptions: [{type:Object}],
})

module.exports = model('Event', schema)