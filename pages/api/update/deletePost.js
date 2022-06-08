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
        const postId = req.body.postId;
        const isLoggedIn = req.body.isLoggedIn;

        if(isLoggedIn) {
            const user = await User.findOne({email: email});
            let ownedByRequester = false;
            for(let id of user.projects) {
                const currProject = await Project.findById(id)
                for(let post of currProject.posts) {
                    if(post.postId == postId) {
                        ownedByRequester = true;
                    }
                }
            }

            if(ownedByRequester) {
                console.log("Verified Owner")
                const project = await Project.findById(projId);
                let newPostList = [];
                for(let post of project.posts) {
                    if(post.postId != postId) {
                        newPostList.push(post)
                    }
                }

                project.posts = newPostList;
                project.save();
        
                await Post.findByIdAndDelete(postId);
        
                res.send(1);
            } else {
                res.send(-1)
            }
        } else {
            res.send(-1)
        }
    }
}