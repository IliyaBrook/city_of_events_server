const jwt = require('jsonwebtoken')
const config = require('config')
const Events = require('../models/Event')
const Online = require('../models/Online')

module.exports = io => {
	io.use((socket, next) => {
		const token = socket.handshake.auth.token
		const decodedToken = jwt.verify(token, config.get('jwtSecret'))
		if (decodedToken) {
			next()
		}
		next(new Error("Not authorized"))
	})
	
	
	io.on('connection', async socket => {
		const token = socket.handshake.auth.token
		const {name, email} = jwt.verify(token, config.get('jwtSecret'))
		console.log(`user name: ${name}, user email: ${email}`)
		const mongoDbCursor = Events.watch()
		
		mongoDbCursor.on('change', async data => {
			switch (data.operationType) {
				case 'insert':
					return socket.emit('eventCreated', {...data.fullDocument})
				case 'update':
					const eventId = data.documentKey._id
					const event = await Events.findOne({_id: eventId})
					return socket.emit('eventUpdated', event)
				case 'delete':
					return socket.emit('eventDeleted', data.documentKey._id)
			}
		})
		socket.on("disconnecting", () => {
			console.log('user disconnected')
			Events.watch().close()
		})
	})
	
	
}

