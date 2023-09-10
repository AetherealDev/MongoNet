const router = require('express').Router();

const {getAllUsers, getUserById, createUser, updateUser, deleteUser, addUserFriend, removeUserFriend} = require('../../controllers/userController');

// api/users
router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addUserFriend).delete(removeUserFriend);

module.exports = router;
