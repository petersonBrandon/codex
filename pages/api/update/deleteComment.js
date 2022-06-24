import dbConnect from '../../../lib/connectDB';
import Comment from '../../../models/comment';
import Post from '../../../models/post';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return
    } else {
        await dbConnect();

        const postId = req.body.postId;
        const commentId = req.body.commentId

        const post = await Post.findById(postId);
        let newCommentList = [];
        for(let comment of post.comments) {
            if(commentId != comment.commentId) {
                newCommentList.push(comment)
            }
        }
        post.comments = newCommentList;
        try {
            post.save();
            await Comment.findByIdAndDelete(commentId);
            res.send(1);
        } catch {
            res.send(-1)
        }
    }
}