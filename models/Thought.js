const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Reaction is a schema only, not a model
// This will be a subdocument of Thought model
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    // using a getter function to take the stored timestamp and return a formatted date string
    // depending on the locale, it'll look similar to MM/DD/YYYY if the local is uk, it should be DD/MM/YYYY
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleDateString()
  }
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleDateString()
  },
  username: {
    type: String,
    required: true
  },
//   this is where Reaction schema is added as a sub doc woohoo
  reactions: [ReactionSchema]
});
// adds up the number of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
