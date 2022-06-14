import { BiLike } from 'react-icons/bi'
import axios from 'axios'
import styles from '../../styles/ProjectInfo.module.css'
import { useState } from 'react'

const LikeButton = ({post, user}) => {
    const [likeCount, setLikeCount] = useState(post.likes.length)
    
    const getLikeCount = () => {
        axios.post('/api/getLikeForUser', {
            user: user,
            postId: post._id
        })
        .then(res => {
            setLiked(res.data.hasLiked)
        })
    }
    const [liked, setLiked] = useState(getLikeCount())
    
    const likePost = () => {
        axios.post('/api/update/likePost', {
            user: user,
            postId: post._id
        })
        .then(res => {
            if (!res.data.success) {
                //TODO: Error handle here
            } else {
                let prevCount = likeCount
                setLikeCount(res.data.likeCount)
            }
        })
    }

    return (
        <div className={styles.likeContainer}>
            <BiLike className={liked ? styles.postLikedBtn : styles.postLikeBtn} onClick={likePost} />
            <p className={styles.postLikeCount}>{likeCount}</p>
        </div>
    )
}

export default LikeButton