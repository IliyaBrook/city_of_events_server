const { Router } = require('express')
const User = require('../../models/User')
const router = Router()
const isAuth = require('../../middleware/auth.middleware')


module.exports = router.get('/profilePage',isAuth,async (req,res) => {
	try {
		const userEmail = req.user.email
		const userData =  await User.findOne({email:userEmail})
		return  res.status(200).json({userData:userData})
	}catch (err) {
		return res.status(400).json({message:err})
	}
})