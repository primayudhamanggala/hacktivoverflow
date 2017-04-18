const express = require('express')
const router = express.Router()
const answerController = require('../controllers/answer')

// router.post('/:userId/:questionId', answerController.create)
router.post('/:questionId', answerController.create)

router.get('/:questionId', answerController.getAll)

// router.get('/:id', answerController.getOne)

router.put('/:id', answerController.update)

router.delete('/:id', answerController.delete)

// router.post('/:id/:userId/upvote', answerController.upVote)

router.post('/:id/upvote', answerController.upVote)

// router.post('/:id/:userId/downvote', answerController.downVote)

router.post('/:id/downvote', answerController.downVote)

router.get('/:id/vote', answerController.voteCount)

module.exports = router;
