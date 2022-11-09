
const {User,Thought} = require('../models');

module.exports = {
// gets all the users
getUsers(req,res){
    User.find()
      .then((students) => res.json(students))
      .catch ((err)=>res.status(500).json(err));
},
getSingleUser(req,res){
    User.findOne({_id:req.params.userId})
      .select('-__v')
      .then((user) => 
          !user
            ? res.status(404).json({message:'No user with that ID'})
            : res.json(user)
      )
      .catch ((err)=>res.status(500).json(err));
},
createUser(req,res){},
updateUser(req,res){},
removeUser(req,res){},
addFriends(req,res){},
removeFriends(req,res){},
removeThought(req,res){}
};