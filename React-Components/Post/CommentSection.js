import { BiCommentDetail } from 'react-icons/bi'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import styles from '../../styles/Post.module.css'
import { useState } from 'react';
import Comment from './Comment';

const CommentSection = ({post, user, comments, isDashboard}) => {

    const getCommentList = () => {
        axios.post('/api/getComments', {
            postId: post._id,
            user: user
        })
        .then(res => {
            if (!res.data.success) {
                //TODO: Error handle here
            } else {
                setCommentList(res.data.comments)
            }
        })
    }

    const [commentList, setCommentList] = useState(getCommentList)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const postComment = (data) => {
        axios.post('/api/comment', {
            postId: post._id,
            user: user,
            isLoggedIn: user.isLoggedIn,
            comment: data.commentText
        })
        .then(res => {
            if (!res.data.success) {
                //TODO: Error handle here
            } else {
                if(isDashboard)
                    window.location = `/dynamicRoutes/dashboard/post/${post._id}`
                else 
                    window.location = `/dynamicRoutes/posts/${post._id}`
            }
            console.log(res);
        })
    }

    return (
        <div className={styles.commentSection}>
            <div className={styles.commentSectionContainer}>
                <div className={styles.commentSectionHeader}>
                    <div className={styles.commentSectionTitle}>Comments</div>
                    {/* <BiCommentDetail className={styles.commentSectionAdd}/> */}
                </div>
                <hr className={styles.commentSectionBreakLine}/>
                <div className={styles.commentSectionCreateContainer}>
                    {user.isLoggedIn ? 
                    <form className={styles.commentForm} onSubmit={handleSubmit(postComment)}>
                        <textarea {...register('commentText', {required: false})} placeholder="Write a comment" className={styles.commentTextArea} rows='5'></textarea>
                        <div className={styles.commentFormFooter}>
                            <button type='submit' className={styles.commentPostBtn}>Post</button>
                        </div>
                    </form>
                    :
                    <></>
                    }
                </div>
                {user.isLoggedIn ?
                    <hr className={styles.commentSectionBreakLine}/>
                    :
                    <></>
                }
                <div className={styles.commentsList}>
                {commentList != undefined && commentList.length > 0 ?
                    commentList.map((comment) => (
                        <Comment comment={comment} user={user} post={post} isDashboard={isDashboard}/>
                    ))
                    :
                    <div className={styles.noComments}>
                        No comments yet
                    </div>
                }
                </div>
            </div>
        </div>
    )
}

export default CommentSection