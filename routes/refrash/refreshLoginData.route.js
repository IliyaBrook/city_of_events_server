const {Router} = require('express')
const router = Router()
const User = require('../../models/User')
const isAuth = require('../../middleware/auth.middleware')


module.exports = router.get('/refresh', isAuth, async (req, res) => {
	try {
		const userEmail = req.user.email
		const userData = await User.findOne({email:userEmail})
		const {email, name, role } = userData
		return res.status(200).json({email, name, role , isAuth:true})
		
	} catch (errors){
		return res.status(400).json({message: errors, isAuth:false})
	}
})
