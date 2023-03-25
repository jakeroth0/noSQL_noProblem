const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find({});
      const formattedThoughtData = thoughtData.map(thought => ({
        ...thought.toObject(),
        createdAt: thought.createdAt
      }));
      res.json(formattedThoughtData);
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
        const formattedThoughtData = {
          ...thoughtData.toObject(),
          createdAt: thoughtData.createdAt
        };
        res.json(formattedThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
     // Create a new thought
  async createThought(req, res) {
    try {
      // Find the user that created the thought
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      // Create the new thought
      const thought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: user.username,
        userId: user._id
      });

      // Add the new thought to the user's thoughts array
      user.thoughts.push(thought._id);
      await user.save();

      res.status(201).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $set: req.body },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
        username: req.params.username,
      });
      console.log(deletedThought, 'deleted thought--------------')
      console.log(req.params.thoughtId, '_id--------------')
      console.log(req.params.username, 'username--------------')
  
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      await User.findOneAndUpdate(
        { username: req.params.username },
        { $pull: { thoughts: req.params.thoughtId } }
      );
  
      res.json({ message: 'Thought deleted', deletedThought });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const reaction = req.body;
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: reaction } },
        { new: true, runValidators: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
  try {
    const updatedThought = await Thought.updateOne(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},  
};

module.exports = thoughtController;
