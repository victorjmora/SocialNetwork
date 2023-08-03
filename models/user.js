const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim:true
    },
    email: {
      type :String,
      required: true,
      match:[/.+@.+\..+/],
      unique: true
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref:'Thought'
    }],
    friends:[{
      type: Schema.Types.ObjectId,
      ref:"User"
    }]
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;