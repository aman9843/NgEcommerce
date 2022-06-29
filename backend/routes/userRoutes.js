const express = require('express')
const router = express.Router()
const {registeredUser,login, getAllUser, getUserById, deleteUser, updateUser} = require('../controllers/userController')


router.route('/register').post(registeredUser)
router.route('/login').post(login)
router.route('/profile').get(getAllUser)
router.route('/profile/:id').get(getUserById).delete(deleteUser).put(updateUser)


module.exports = router;
