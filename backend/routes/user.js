const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { userById } = require('../controllers/user.js')

// in order to acacess this route you need to be the currently logged in user and also an admin
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile })
})

router.param('userId', userById)

module.exports = router
