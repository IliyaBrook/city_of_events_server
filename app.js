require('dotenv').config()
const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app)
//webSocketServer
io = require('socket.io')(server)
require('./socket/socket')(io)
const cors = require('cors')

app.use(bodyParser.json({extended: true}))

if (process.env.DEV) {
	app.use(cors({
		origin:'*'
	}))
}


app.use('/', require('./routes/registration.route'))
app.use('/', require('./routes/login.route'))
app.use('/', require('./routes/profilePage/profile.page.route'))
app.use('/profilePage', require('./routes/profilePage/admin/allUsers/get.users.route'))
app.use('/profilePage', require('./routes/profilePage/admin/allUsers/delete.user.route'))
app.use('/profilePage', require('./routes/profilePage/admin/allUsers/set.admin.route'))
app.use('/profilePage', require('./routes/profilePage/admin/events/create.event.route'))
app.use('/', require('./routes/refrash/refreshLoginData.route'))
app.use('/', require('./routes/refrash/refreshEvents.route'))
app.use('/events', require('./routes/profilePage/admin/events/delete.event.route'))
app.use('/events', require('./routes/events/subscribe.route'))
app.use('/events', require('./routes/events/deleteSubscription.route'))
app.use('/messages', require('./routes/messages/messages.route'))

const PORT = process.env.PORT || config.get('port')

async function start() {
	try {
		await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'))
		
		server.listen(PORT, () => {
			console.log('App started on port: ', PORT)
		})
		
	} catch (e) {
		console.log('Server mongo error', e.message)
		process.exit(1)
	}
}

start().catch(e => console.log('Error by during server starting', e))
