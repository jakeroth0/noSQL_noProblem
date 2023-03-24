const { Thought } = require('../models');

const thoughtController = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find({});
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
    // Get a single thought by ID
    async getThoughtById(req, res) {
        try {
        const thoughtData = await Thought.findById(req.params.id);
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this ID!' });
            return;
        }
        res.json(thoughtData);
        } catch (err) {
        res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;
