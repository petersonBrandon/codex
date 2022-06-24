import dbConnect from '../../lib/connectDB';
import Post from '../../models/post';
import Comment from '../../models/comment';
import { json } from 'express';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return
    } else {
        await dbConnect();

        const postId = req.body.postId;
        const userData = req.body.user;

        const post = await Post.findById(postId);

        const commentList = []

        for(let i = 0; i < post.comments.length; i++) {
            const comment = await Comment.findById(post.comments[i].commentId)
            let tempComment = {};
            if(comment.userId == userData.userId) {
                tempComment = {
                    _id: comment._id,
                    author: comment.author,
                    text: comment.text,
                    dateCreated: comment.dateCreated,
                    postId: comment.postId,
                    userId: comment.userId,
                    isOwner: true
                }
            } else {
                tempComment = {
                    _id: comment._id,
                    author: comment.author,
                    text: comment.text,
                    dateCreated: comment.dateCreated,
                    postId: comment.postId,
                    userId: comment.userId,
                    isOwner: false
                }
            }
            commentList.push(tempComment)
        }   
        
        commentList.reverse()

        res.json({success: true, comments: commentList})

    }
}