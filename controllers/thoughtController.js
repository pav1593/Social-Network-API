const {User,Thought} = require('../models');

module.exports = {
    getThoughts(req,res){
        Thought.find()
          .then((thought) => res.json(thought))
          .catch ((err)=>res.status(500).json(err));
    },
    getSingleThought(req,res){},
    createThought(req,res){
        Thought.create(req.body)
        .then((thought)=>{
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    { $addToSet: {thoughts: thought._id}},
                    { new: true}
                );
            })
            .then((user)=>
            !user
                ? res
                    .status(404)
                    .json({message: 'Post created, but found no user with that ID'})
                : res.json('Created the post')
            )
        .catch((err)=> res.status(500).json(err));
        
    },
    updateThought(req,res){},
    removeThought(req,res){},
    addReaction(req,res){},
    removeReaction(req,res){}
};