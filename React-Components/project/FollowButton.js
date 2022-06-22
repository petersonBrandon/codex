import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import axios from 'axios'
import styles from '../../styles/ProjectInfo.module.css'
import { useState } from 'react'

const FollowButton = ({project, user}) => {

    const getFollowed = () => {
        axios.post('/api/getFollowing', {
            user: user,
            projectId: project._id
        })
        .then(res => {
            setFollowed(res.data.isFollowing)
        })
    }

    const [followed, setFollowed] = useState(getFollowed)
    
    const followProject = () => {
        axios.post('/api/update/followProject', {
            user: user,
            projectId: project._id
        })
        .then(res => {
            if (!res.data.success) {
                //TODO: Error handle here
            } else {
                setFollowed(res.data.isFollowing)
            }
        })
    }

    return (
        <div className={styles.followContainer}>
            {followed ? 
                <AiFillStar className={styles.followedIcon} onClick={followProject}/>
                :
                <AiOutlineStar className={styles.notFollowedIcon} onClick={followProject}/>
            }
        </div>
    )
}

export default FollowButton