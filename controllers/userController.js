const { User, Thought } = require('../models');

const userController = {
  // Get all users //
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to get users.' });
    }
  },

  // Get single user by id //
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to get the user.' });
    }
  },

  // Create a user //
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create the user.' });
    }
  },

  // Update a user //
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: req.body },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      return res.json(updatedUser);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update the user.' });
    }
  },

  // Delete a user //
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      // Delete all thoughts associated with the user //
      await Thought.deleteMany({ username: deletedUser.username });
      // Remove the user from all other users' friends lists //
      await User.updateMany({ friends: deletedUser._id }, { $pull: { friends: deletedUser._id } });
      return res.json({ message: 'User deleted successfully.', user: deletedUser });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete the user.' });
    }
  },

  // Add a friend to the user's friend list //
  addFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to add the friend.' });
    }
  },

  // Remove a friend from the user's friend list //
  removeFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to remove the friend.' });
    }
  }
};

module.exports = userController;