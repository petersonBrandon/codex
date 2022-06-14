import dbConnect from '../../../lib/connectDB';
import Post from '../../../models/post';
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
        let newLikeList = []
        if(alreadyLike) {
            for (let i = 0; i < post.likes.length; i++) {
                if(post.likes[i].userId != user.userId) {
                    newLikeList.push(post.likes[i])
                }
            }
            post.likes = newLikeList;
        }
        else {
            post.likes.push({
                userId: user.userId
            })
        }
        try {
            await post.save()
            res.json({success: true, likeCount: post.likes.length})
        } catch {
            res.json({success: false})
        }

    }
}