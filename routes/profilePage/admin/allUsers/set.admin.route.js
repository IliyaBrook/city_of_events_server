const { Router } = require('express')
const router = Router()
const User = require('../../../../models/User')
const isAdmin = require('../../../../middleware/isAdmin.middleware')


const setRole = async (resMessage,req, res,role = 'user') => {
	try {
		const user = req.body.email
		const userData = await User.findOne({ email:user})
		const userId = userData['_id']
		await  User.findByIdAndUpdate({_id:userId}, {role:role})
		return res.status(201).json({message: resMessage})
	}catch (e) {
		res.status(400).json({message:'error: ' + e})
		console.log(e)
		throw e
	}
}

module.exports = router.post('/setRole', isAdmin,async (req, res ) => {
	return setRole('role updated', req, res, req.body.role)
})

// module.exports = router.post('/removeAdmin', isAdmin,async (req, res ) => {
// 	return setRole('role deleted', req, res )
// })