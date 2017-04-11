const express = require('express')
const router = express.Router()
const answerController = require('../controllers/answer')

router.post('/:userId/:questionId', answerController.create)

router.get('/', answerController.getAll)

router.get('/:id', answerController.getOne)

router.put('/:id', answerController.update)

router.delete('/:id', answerController.delete)



module.exports = router;
