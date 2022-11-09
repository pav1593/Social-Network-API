const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
    addFriends,
    removeFriends
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(removeUser);

router.route('/:userId/friends/:friendId')
    .post(addFriends)
    .delete(removeFriends);

module.exports = router;