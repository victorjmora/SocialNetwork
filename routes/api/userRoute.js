// Importing //
const router = require('express').Router();
const {
    getAllUsers, createUser, getSingleUser, updateUser, deleteUser, addFriend, removeFriend, } 
  = require('../../controllers/userController');

// Routes for getting all users and creating a new user. //
router.route('/')
.get(getAllUsers) // Get all //
.post(createUser); // Create //

// Routes for getting a single user, updating a user, and deleting a user. //
router.route('/:userId')
.get(getSingleUser) // Get one //
.put(updateUser) // Update //
.delete(deleteUser); // Delete // 

// Routes for adding and removing a friend for a specific user. //
router.route('/:userId/friends/:friendId')
.post(addFriend) // Post //
.delete(removeFriend); // Delete //

// Exporting //
module.exports = router;