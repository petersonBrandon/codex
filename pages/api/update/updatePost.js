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
        const postId = req.body.postId;
        const isLoggedIn = req.body.isLoggedIn;
        const title = req.body.title;
        const desc = req.body.desc;

        let postExcerpt = "";

        console.log(title);
        console.log(desc);

        if(desc.length > 120) {
            for (let i = 0; i < 120; i++) {
                if ( desc[i] !== undefined ) {
                    postExcerpt += desc[i];
                } 
            }
            postExcerpt += "...";
        } else {
            postExcerpt = desc;
        }    

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
                await Post.findByIdAndUpdate(postId, {title: title, text: desc, excerpt: postExcerpt});
        
                res.send(1);
            } else {
                res.send(-1)
            }
        } else {
            res.send(-1)
        }
    }
}