const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        // regex to validate email
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;