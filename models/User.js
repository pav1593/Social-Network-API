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
        validate: {
            validator: function(v) {
              return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid e-mail!`
          },
        required: [true, 'User e-mail  required']

      },
      thoughts: [{
        type:Schema.Types.ObjectId,
        ref: 'Thought'
      }],
      friends: [{
        type:Schema.Types.ObjectId,
        ref: 'User'
      }]

    },
    {toJSON: {
        virtuals:true,
      },
      id:false,
    }
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

  const User=model('user',userSchema);

  module.exports = User;