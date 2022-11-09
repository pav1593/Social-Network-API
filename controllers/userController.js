
const {User,Thought} = require('../models');

module.exports = {
// gets all the users
getUsers(req,res){
    User.find()
      .then((user) => res.json(user))
      .catch ((err)=>res.status(500).json(err));
},
// get a single user given a userId
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
// create a user
createUser(req,res){
  User.create(req.body)
    .then((user)=> res.json(user))
    .catch((err)=>res.status(500).json(err));
},
// update a user given a userId
updateUser(req,res){
  User.findByIdAndUpdate(
    {_id:req.params.userId},
    {$set: req.body},
    {runValidators:true, new:true}
  )
  .then((user)=>
    !user
      ? res
        .status(404)
        .json({message:'No user with this ID'})
      : res.json(user)
    )
  .catch((err)=>res.status(500).json(err));
},

// remove user by given userId
removeUser(req,res){
  User.findOneAndRemove({_id:req.params.userId})
    .then((user) =>
      !user
       ? res
          .status(404)
          .json({message:'No user with that ID'})
       : Thought.findOneAndUpdate(
          {users:req.params.userId},
          {$pull: {users:req.params.userId}},
          {new:true}
       )
    )
    .then((thought)=>
        !thought
          ? res
             .status(404)
             .json({message: 'User delete, but no thoughts found'})
          : res.json({message: 'User succesfully deleted'})
    )
    .catch((err)=> res.status(500).json(err));
},

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
removeThought(req,res){} // this will probably happen under delete user
};