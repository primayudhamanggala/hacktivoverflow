const express = require('express')
const router = express.Router()
const questionController = require('../controllers/question')

router.post('/:userId', questionController.create)

router.get('/', questionController.getAll)

router.get('/:id', questionController.getOne)

router.put('/:id', questionController.update)

router.delete('/:id', questionController.delete)



module.exports = router;
