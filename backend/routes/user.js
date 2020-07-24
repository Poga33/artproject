const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { userById, read, update } = require('../controllers/user.js')

// in order to acacess this route you need to be the currently logged in user and also an admin
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile })
})
router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)

// every time there's 'userId' in the route, this method will run
router.param('userId', userById)

module.exports = router
