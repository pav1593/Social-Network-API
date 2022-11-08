const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
    removeThought
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userID')
    .get(getSingleUser)
    .put(updateUser)
    .delete(removeUser);

router.route('/:userID/thoughts/:thoughtID')
    .delete(removeThought);

module.exports = router;