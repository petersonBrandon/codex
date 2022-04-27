import Link from 'next/link';
import {useState, useEffect} from 'react'
import { AiOutlineUser } from "react-icons/ai";

import styles from '../../styles/profile/profileDropdown.module.css'

const ProfileIcon = (props) => {
    const [isDropped, setDropped] = useState(false);

    const toggle = () => {
        setDropped(!isDropped);
    }

    useEffect(() => {
        window.onscroll = () => {
            setDropped(false);
        }
    });

    return (
        <div className={styles.profileContainer}>
            <AiOutlineUser className={styles.userIcon} onClick={toggle}/>
            <div className={isDropped ? styles.dropOpen : styles.dropClosed}>
                <div className={styles.dropItem}>
                    <Link href="/profile" >Dashboard</Link>
                </div>
                <div className={styles.dropItem}>
                    <div onClick={props.onClick} >Logout</div>
                </div>
            </div>
        </div>
    )
}

export default ProfileIcon