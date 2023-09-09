// User
//
// username
//
// String
// Unique
// Required
// Trimmed
// email
//
// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts
//
// Array of _id values referencing the Thought model
// friends
//
// Array of _id values referencing the User model (self-reference)
// Schema Settings
//
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const {Schema, model} = require('mongoose');

//TODO: Add Thoughts and Friends to the User Model
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'] // use the match property with a regex expression to validate the email address
      }
    }
);

const User = model('user', userSchema);

module.exports = User;