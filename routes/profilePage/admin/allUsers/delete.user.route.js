const { Router } = require('express')
const router = Router()
const User = require('../../../../models/User')
const isAdmin = require('../../../../middleware/isAdmin.middleware')

module.exports = router.post('/deleteUser', isAdmin,async (req,res) => {
	try {
		const removedUser = req.body.email
		await User.findOneAndDelete({email:removedUser})
		return res.status(201).json({message:'User has been deleted'})
	}catch (error) {
		return res.status(200).json({message:'Removing error: ' + error})
	}
})