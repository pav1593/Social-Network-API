const {User,Thought} = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req,res){
        Thought.find()
          .then((thought) => res.json(thought))
          .catch ((err)=>res.status(500).json(err));
    },

    // get a single thought using thoughtId
    getSingleThought(req,res){},

    //create a thoguht and link to user via thought _Id
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

    // create a reaction and add to thought using reaction _id
    addReaction(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $addToSet: {reactions: req.body}},
            { runValidators:true, new: true}
        )
        .then((thought)=> 
          !thought
            ? res
                .status(404)
                .json({message: 'No thought found with that ID'})
            : res.json(thought)
        )
        .catch((err)=>res.status(500).json(err))
    },

    removeReaction(req,res){}
};