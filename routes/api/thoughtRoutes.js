const router = require('express').Router();
const { 
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction, } = require('../../controllers/thoughtController');

// GET all thoughts
router.get('/', getAllThoughts);

// Get a single thought by ID
router.get('/:id', getThoughtById);

// POST /api/thoughts
router.post('/', createThought);

// PUT updaate a thought
router.put('/:thoughtId', updateThought);

// DELETE a thought
router.delete('/:username/:thoughtId', deleteThought);

// POST a reaction
router.post('/:thoughtId/reactions', addReaction);

// DELETE a reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
