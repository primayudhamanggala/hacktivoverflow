const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const passport = require('../helpers/passport')

router.post('/signUp', userController.create)

router.post('/signIn', passport, userController.login)

router.get('/', userController.getAll)

router.get('/:id', userController.getOne)

router.put('/:id', userController.update)

router.delete('/:id', userController.delete)



module.exports = router;
