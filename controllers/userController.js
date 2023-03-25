const { User, Thought } = require('../models');

const userController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const userData = await User.find({});
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// Get a single user by ID
    async getUserById(req, res) {
        try {
        const userData = await User.findById(req.params.id);
        if (!userData) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.json(userData);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
          const userData = await User.create(req.body);
          res.status(201).json(userData);
        } catch (err) {
          res.status(400).json(err);
        }
      },
      async updateUser(req, res) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          );
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.json(updatedUser);
        } catch (err) {
          console.error(err);
          res.status(500).json(err);
        }
      }, 
        // Delete a user and their thoughts/reactions
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      await Thought.deleteMany({ username: deletedUser.username });
      res.json({ message: 'User and associated thoughts/reactions deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
