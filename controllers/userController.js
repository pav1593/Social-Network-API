
const {User,Thought} = require('../models');

module.exports = {
// gets all the users
getUsers(req,res){
    User.find()
      .then((user) => res.json(user))
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
createUser(req,res){
  User.create(req.body)
    .then((user)=> res.json(user))
    .catch((err)=>res.status(500).json(err));
},
updateUser(req,res){},
removeUser(req,res){},
addFriends(req,res){
  console.log('You are adding a friend');
  console.log(req.body);
  User.findOneAndUpdate(
    {_id:req.params.userId},
    { $addToSet: {friends:req.params.friendId}},
    {runValidators:true,new:true}
  )
  .then((user)=>
    !user
    ? res
        .status(404)
        .json({message: 'No user found with thtat ID'})
    : res.json(user)
  )
  .catch((err)=>res.status(500).json(err));
},
removeFriends(req,res){},
removeThought(req,res){}
};