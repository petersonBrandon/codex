const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    clearance: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    projects: [ {
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        }
    } ],
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
    following: [ {
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        }
    } ]
});

mongoose.models = {};

var User = mongoose.model('User', userSchema);

export default User;