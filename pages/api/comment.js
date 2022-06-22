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

        const userData = req.body.user;
        const postId = req.body.postId;
        const isLoggedIn = req.body.isLoggedIn;
        const commentData = req.body.comment;

        const date = new Date();
        const cDay = date.getDate();
        const cMonth = date.getMonth() + 1;
        const cYear = date.getFullYear();
        const cHour = date.getHours();
        let cMinutes = date.getMinutes();

        if (cMinutes < 10) {
            cMinutes = `0${cMinutes}`;
        }

        const currentDate = `${cHour}:${cMinutes}  ${cMonth}/${cDay}/${cYear}`;

        if(isLoggedIn) {
            const post = await Post.findById(postId);
            const comment = new Comment({
                author: userData.userName,
                text: commentData,
                dateCreated: currentDate,
                postId: postId
            })

            post.comments.push({commentId: comment._id})
            try {
                await comment.save();
                await post.save();
                console.log("post saved")
                res.json({success: true})
            } catch {
                res.json({success: false})
            }
        } else {
            res.json({success: false})
        }    

    }
}