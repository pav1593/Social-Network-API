const {User,Thought} = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req,res){
        Thought.find()
          .then((thought) => res.json(thought))
          .catch ((err)=>res.status(500).json(err));
    },

    // get a single thought using thoughtId
    getSingleThought(req,res){
        Thought.findOne({_id:req.params.thoughtId})
          .select('-__v')
          .then((thought)=>
            !thought
              ? res.status(404).json({message: 'No thought with that ID'})
              : res.json(thought)
        )
        .catch((err)=>res.status(500).json(err));
    },

    //create a thought and link to user via thought _Id
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
                    .json({message: 'Thought created, but found no user with that ID'})
                : res.json('Created the though for user')
            )
        .catch((err)=> res.status(500).json(err));
        
    },
    // update a thought given a thoughtId
    updateThought(req,res){
        Thought.findByIdAndUpdate(
            {_id:req.params.thoughtId},
            {$set: req.body},
            {runValidators:true, new:true}
          )
          .then((thought)=>
            !thought
              ? res
                .status(404)
                .json({message:'No thought with this ID'})
              : res.json(thought)
            )
          .catch((err)=>res.status(500).json(err));
    },

    //removes a thought given a thoughtId
    removeThought(req,res){
        Thought.findOneAndDelete({_id:req.params.thoughtId})
         .then((thought)=>
           !thought
             ? res.status(404).json({message:'No thought found with that ID'})
             : res.json(thought)
         )
         .catch((err)=>res.status(500).json(err));
    },

    // create a reaction and add to thought using thought _id
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
    // remove a reaction given thoughtId and reactionId
    removeReaction(req,res){
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true,new:true}
          )
          .then((thought)=>
            !thought
              ? res.status(404).json({message:'No thought found with that ID'})
              : res.json(thought)
          )
          .catch((err)=>res.status(500).json(err));
    }
};