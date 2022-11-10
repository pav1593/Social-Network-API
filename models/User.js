const {Schema,model} = require('mongoose');

const userSchema = new Schema (
    {
      username: {
        type:String,
        required: true,
        trim:true
      },
      email: {
        type: String,
        unique:true,
        //validates the e-mail address
        validate: {
            validator: function(v) {
              return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid e-mail!`
          },
        // ensures e-mail address is provided or return message in err otherwise
        required: [true, 'User e-mail  required']

      },
      thoughts: [{
        type:Schema.Types.ObjectId,
        ref: 'thought'
      }],
      friends: [
        {type:Schema.Types.ObjectId,
        ref: 'user'
      }]
    },
    {toJSON: {
        virtuals:true,
      },
      id:false,
    }
);

// virtual return the count of friends attached to user
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

  const User=model('user',userSchema);

  module.exports = User;