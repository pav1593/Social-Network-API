const {Schema,Types} = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
        type:Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId(),
    },
    reactionBody: {
        type:String,
        required:true,
        maxLength: 280
    },
    username: {
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        //Use a getter method to format the timestamp on query
        get: v=>v.toLocaleDateString()+" at "+v.toLocaleTimeString()
    }

  },
  {
    toJSON: {
        getters: true,
    }
  }
);

module.exports = reactionSchema;