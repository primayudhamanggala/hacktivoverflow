const express = require('express')
const router = express.Router()
const questionController = require('../controllers/question')

// router.post('/:userId', questionController.create)
router.post('/', questionController.create)

router.get('/', questionController.getAll)

router.get('/:id', questionController.getOne)

router.put('/:id', questionController.update)

router.delete('/:id', questionController.delete)

// router.post('/:id/:userId/upvote', questionController.upVote)
//
// router.post('/:id/:userId/downvote', questionController.downVote)

module.exports = router;
