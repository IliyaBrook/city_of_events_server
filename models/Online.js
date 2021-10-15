const {Schema, model } = require('mongoose')

const schema = new Schema({
	name: String,
	email:String,
	socketId:String
})

module.exports = model('Online', schema)