import dbConnect from '../../lib/connectDB';
import Post from '../../models/post';
import { json } from 'express';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return
    } else {
        await dbConnect();

        const user = req.body.user;
        const postId = req.body.postId;

        const post = await Post.findById(postId);
        let alreadyLike = false;
        for (let i = 0; i < post.likes.length; i++) {
            if(post.likes[i].userId == user.userId) {
                alreadyLike = true;
            }
        }
        res.json({hasLiked: alreadyLike})
    }
}