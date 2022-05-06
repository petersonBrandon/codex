import dbConnect from '../../../lib/connectDB';
import User from '../../../models/user';
import Project from '../../../models/project';
import Post from '../../../models/post';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return
    } else {
        await dbConnect();

        const email = req.body.email;
        const projId = req.body.projId;

        const user = await User.findOne({email: email});
        let updatedProjs = [];
        for(let project of user.projects) {
            if(project._id.toString() !== projId) {
                updatedProjs.push(project);
            }
        }
        user.projects = updatedProjs;
        user.save();

        const projData = await Project.findById(projId);
        for(const post of projData.posts) {
            await Post.findByIdAndDelete(post.postId);
        }

        await Project.findByIdAndDelete(projId);

        res.send(1);
    }
}