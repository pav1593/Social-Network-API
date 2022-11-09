
const {User,Thought} = require('../models');

module.exports = {
// gets all the users
getUsers(req,res){
    User.find()
      .then((students) => res.json(students))
      .catch ((err)=>res.status(500).json(err));

// getSingleUser,
// createUser,
// updateUser,
// removeUser,
// addFriends,
// removeFriends,
// removeThought
};