const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateStarted: {
        type: String,
        required: true
    },
    dateEnded: {
        type: String,
        required: true
    },
    posts: [
        {
            postId: {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        }
    ] 
});

mongoose.models = {};

var Project = mongoose.model('Project', projectSchema);

export default Project;