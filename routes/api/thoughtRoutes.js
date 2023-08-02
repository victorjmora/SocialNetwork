// Importing //
const router = require('express').Router();
const {
  getAllThoughts, createThought, getSingleThought, updateThought, deleteThought, addReaction, removeReaction, }
  = require('../../controllers/thoughtController');

// Routes for getting all thoughts and creating a new thought. //
router.route('/')
.get(getAllThoughts) // Get all //
.post(createThought); // Create //

// Routes for getting a single thought, updating a thought, and deleting a thought. //
router.route('/:thoughtId')
.get(getSingleThought) // Get one //
.put(updateThought) // Update //
.delete(deleteThought); // Delete //

// Route for adding a reaction to a specific thought. //
router.route('/:thoughtId/reactions')
.post(addReaction); // Post //

// Route for removing a specific reaction from a specific thought. //
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction); // Delete //

// Exporting //
module.exports = router;