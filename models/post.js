const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    excerpt: {
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
    dateEdited: {
        type: String,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    likes: [ {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    } ],
    comments: [ {
        commentId: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            required: true
        }
    } ]
});

mongoose.models = {};

var Post = mongoose.model('Post', postSchema);

export default Post;