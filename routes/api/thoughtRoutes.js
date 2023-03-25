const router = require('express').Router();
const { 
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought, } = require('../../controllers/thoughtController');

// GET all thoughts
router.get('/', getAllThoughts);

// Get a single thought by ID
router.get('/:id', getThoughtById);

// POST /api/thoughts
router.post('/', createThought);

// PUT updaate a thought
router.put('/:thoughtId', updateThought);

// DELETE a thought
router.delete('/:thoughtId', deleteThought);
module.exports = router;
