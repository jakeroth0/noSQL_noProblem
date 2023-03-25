const router = require('express').Router();
const { 
    getAllUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend, } = require('../../controllers/userController');

// GET all users
router.get('/', getAllUsers);
// GET single user
router.get('/:id', getUserById);
// Create a new user
router.post('/', createUser);
// PUT /api/users/:id
router.put('/:id', updateUser);
// DELETE a user and all associated thoughts and reactions
router.delete('/:id', deleteUser);
// POST /api/users/:userId/friends/:friendId
router.post('/:userId/friends/:friendId', addFriend);
router.route('/:userId/friends/:friendId').delete(removeFriend);
module.exports = router;
