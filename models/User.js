const {Schema, model } = require('mongoose')

const schema = new Schema({
	email: {type:String, require: true, unique: true},
	password: {type:String, required: false},
	name: {type:String, require: true, unique: false},
	role: {type:String},
	messages:[
		{from: String, messageContent:String }
	]
})

module.exports = model('User', schema)