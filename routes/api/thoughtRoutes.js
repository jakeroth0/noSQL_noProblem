const router = require('express').Router();
const { 
    getAllThoughts,
    getThoughtById, } = require('../../controllers/thoughtController');

// GET all thoughts
router.get('/', getAllThoughts);

// Get a single thought by ID
router.get('/:id', getThoughtById);

module.exports = router;
