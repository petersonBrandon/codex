import React from 'react'
import styles from '../../styles/Comment.module.css'
import editStyles from '../../styles/EditStyles.module.css'
import { FaTrash } from 'react-icons/fa'
import { useState } from 'react';
import axios from 'axios'

const Comment = ({comment, user, post, isDashboard}) => {
    const [deleteActive, setDeleteActive] = useState(false);

    const deleteComment = () => {
        axios.post('/api/update/deleteComment', {
            postId: post._id,
            commentId: comment._id
        })
        .then(res => {
            if (res.data === -1) {
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
        <div className={styles.commentContainer}>
            <div className={styles.commentHeader}>
                <div className={styles.author}>{comment.author}</div>
                {comment.isOwner ?
                    <FaTrash className={styles.commentDelete} onClick={() => setDeleteActive(true)}/>
                    :
                    <></>
                }
            </div>
            <div className={styles.commentBody}>
                <div className={styles.text}>{comment.text}</div>
            </div>
            <div className={styles.commentFooter}>
                <div className={styles.date}>{comment.dateCreated}</div>
            </div>
            {deleteActive ? 
                <div className={styles.deletePopup}>
                    <div className={editStyles.popup_modal}>
                        <div className={editStyles.blur}></div>
                        <div className={editStyles.modal}>
                            <h1>Are you sure?</h1>
                            <h2>This will permanently delete this comment</h2>
                            <div className={editStyles.confirmBtns}>
                                <button className={editStyles.deleteCancelBtn} onClick={()  => setDeleteActive(false)}>
                                    Cancel
                                </button>
                                <button className={editStyles.confirmDeleteBtn} onClick={deleteComment}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div> 
                </div>
                :
                <></>
            }
        </div>
    )
}

export default Comment