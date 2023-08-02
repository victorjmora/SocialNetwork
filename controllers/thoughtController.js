const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts //
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      return res.json(thoughts);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to get thoughts.' });
    }
  },

  // Get one thought by id //
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      return res.json(thought);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to get the thought.' });
    }
  },

  // Create a thought //
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      return res.json({ thought, user });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create the thought.' });
    }
  },

  // Update a thought //
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $set: req.body },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      return res.json(updatedThought);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update the thought.' });
    }
  },

  // Delete a thought //
  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      await User.findByIdAndUpdate(
        deletedThought.username,
        { $pull: { thoughts: req.params.thoughtId } }
      );
      return res.json({ message: 'Thought deleted successfully.', thought: deletedThought });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete the thought.' });
    }
  },

  // Add a reaction to a thought // 
  addReaction: async (req, res) => {
    try {
      const reaction = { reactionBody: req.body.reactionBody, username: req.body.username };
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: reaction } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      return res.json(updatedThought);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to add the reaction.' });
    }
  },

  // Remove a reaction from a thought //
  removeReaction: async (req, res) => {
    try {
      const reactionId = req.params.reactionId;
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      return res.json(updatedThought);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to remove the reaction.' });
    }
  }
};

module.exports = thoughtController;