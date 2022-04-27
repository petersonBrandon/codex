import styles from '../../styles/profile/profile.module.css';
import axios from 'axios'
import React, { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";

const Settings = ({user}) => {
    const [deleteActive, setDeleteActive] = useState(false);

    const deleteAccount = () => {
        axios.post('/api/deleteAccount',
            { userEmail: user.userEmail }
        )
        .then((res) => {
            window.location = "/login/accountDeleted"
        });
    }

    return (
        <div className={styles.settings_container}>
            <div className={styles.profileHeader}>
                <AiOutlineUser className={styles.profile_image}/>
                <h1>{user.userName}</h1>
            </div>
            <div className={styles.profileBody}>
                <div className={styles.settings_section}>
                    <div className={styles.section_title}>Email:</div>
                    <div className={styles.section_function}>
                        <div>{user.userEmail}</div>
                        <button className={styles.edit_btn}>Edit</button>
                    </div>
                </div>
                <div className={styles.settings_section}>
                    <div className={styles.section_title}>Password:</div>
                    <div className={styles.section_function}>
                        <div>***********</div>
                        <button className={styles.edit_btn}>Edit</button>
                    </div>
                </div>
            </div>
            <div>
                <button className={styles.deleteAccBtn} onClick={() => setDeleteActive(true)}>
                    Delete Account
                </button>
            </div>
            {deleteActive ? 
                <div className={styles.delete_confirm}>
                    <div className={styles.delete_modal}>
                        <h1>Are you sure?</h1>
                        <h2>Deleting your account will also remove all projects and posts that you created.</h2>
                        <div className={styles.confirmBtns}>
                            <button className={styles.deleteCancelBtn} onClick={()  => setDeleteActive(false)}>
                                Cancel
                            </button>
                            <button className={styles.confirmDeleteBtn} onClick={deleteAccount}>
                                Just do it.
                            </button>
                        </div>
                    </div>
                </div> 
                :
                <></>
            }
        </div>
    )
}

export default Settings