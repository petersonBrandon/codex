import styles from '../../styles/profile/profile.module.css';
import axios from 'axios'
import React, { useState } from 'react';

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
            <h1 className={styles.profileHeader}>
                {user.userName}
            </h1>
            <div className={styles.profileBody}>
                <div className={styles.section_title}>Email:</div>
                <div>{user.userEmail}</div>
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