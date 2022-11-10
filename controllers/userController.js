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
      .populate("thoughts")
      .populate("friends")
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
  User.findOneAndDelete({_id:req.params.userId})
    .then((user) =>
      !user
       ? res
          .status(404)
          .json({message:'No user with that ID'})
       : Thought.deleteMany({username:user.username})
    )
    .then(()=>res.status(200).json({message: 'User and thoughts deleted!'}))
    .catch((err)=> res.status(500).json(err));
},

// adds friends given a userId and friendId
addFriends(req,res){
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

// removes a friend given userId and friendId
removeFriends(req,res){
  User.findOneAndUpdate(
    {_id:req.params.userId},
    {$pull: {friends: {friendId: req.params.friendId}}},
    {runValidators: true,new:true}
  )
  .then((user)=>
    !user
      ? res.status(404).json({message:'No user found with that ID'})
      : res.json(user)
  )
  .catch((err)=>res.status(500).json(err));
}
};