const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
    addFriends,
    removeFriends,
    removeThought
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

router.route('/:userId/thoughts/:thoughtId')
    .delete(removeThought);

module.exports = router;