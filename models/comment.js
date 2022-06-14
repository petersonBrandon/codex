const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
});

mongoose.models = {};

var Comment = mongoose.model('Comment', commentSchema);

export default Comment;