const { Router } = require('express')
const router = Router()
const User = require('../../../../models/User')
const isAdmin = require('../../../../middleware/isAdmin.middleware')

module.exports = router.get('/getUsers',isAdmin,async (req , res) => {
	try {
		const user = await User.findOne({email:req.user.email})
		if (user) {
			const users = await User.find()
			res.status(200).json({users})
		}
	}catch (errors){
		return res.status({message:`errors: ${errors}`})
	}
})