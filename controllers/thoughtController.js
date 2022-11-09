const {User,Thought} = require('../models');

module.exports = {
    getThoughts(req,res){
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch ((err)=>res.status(500).json(err));
    },
    getSingleThought(req,res){},
    createThought(req,res){},
    updateThought(req,res){},
    removeThought(req,res){},
    addReaction(req,res){},
    removeReaction(req,res){}
};