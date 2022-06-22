import { BiCommentDetail } from 'react-icons/bi'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import styles from '../../styles/Post.module.css'

const CommentSection = ({post, user, comments}) => {
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
                window.location = `/dynamicRoutes/dashboard/${post._id}`
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
                    <form className={styles.commentForm} onSubmit={handleSubmit(postComment)}>
                        <textarea {...register('commmetnText', {required: false})} placeholder="Write a comment" className={styles.commentTextArea} rows='5'></textarea>
                        <div className={styles.commentFormFooter}>
                            <button type='submit' className={styles.commentPostBtn}>Post</button>
                        </div>
                    </form>
                </div>
                <hr className={styles.commentSectionBreakLine}/>
            </div>
        </div>
    )
}

export default CommentSection