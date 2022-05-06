import styles from '../../styles/profile/profile.module.css';
import axios from 'axios'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUser } from "react-icons/ai";

const Settings = ({user}) => {
    const [deleteActive, setDeleteActive] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmitNewEmail = (data) => {
        event.preventDefault;
        // axios.post('/api/newEmail', {
        //     email: data.email
        // })
        // .then(res => {
        //     if (res.data === -1) {
        //         setEmailChangeSuccess(false);
        //     } else {
        //         setEmailChangeSuccess(true);
        //     }
        //     console.log(res);
        // })
    };

    const onSubmitNewPassword = (data) => {
        event.preventDefault;
        // axios.post('/api/newPassword', {
        //     email: data.email
        // })
        // .then(res => {
        //     if (res.data === -1) {
        //         setEmailChangeSuccess(false);
        //     } else {
        //         setEmailChangeSuccess(true);
        //     }
        //     console.log(res);
        // })
    };

    const resetForm = (form) => {
        switch (form) {
            case "EMAIL":
                document.getElementById(styles.edit_mail_open).reset();
                setEditEmail(false);
                setEmailChangeSuccess(true);
                break;
            case "PASSWORD":
                document.getElementById(styles.edit_pass_open).reset();
                setEditPassword(false);
                setPasswordChangeSuccess(true);
                break;
        }
        
    }

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
                        <button className={styles.edit_btn} onClick={() => setEditEmail(true)}>Edit</button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitNewEmail)} className={styles.edit_form} id={editEmail ? styles.edit_mail_open : styles.edit_mail_closed}>
                        <input {...register('email', {required: true})} type="email" placeholder='Enter new email'></input>
                        <div className={styles.edit_btn_container}>
                            <button className={styles.edit_cancel} onClick={() => resetForm("EMAIL")} type='button'>Cancel</button>
                            <button className={styles.edit_submit}>Submit</button>
                        </div>
                    </form>
                </div>
                <div className={styles.settings_section}>
                    <div className={styles.section_title}>Password:</div>
                    <div className={styles.section_function}>
                        <div>***********</div>
                        <button className={styles.edit_btn} onClick={() => setEditPassword(true)}>Edit</button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitNewPassword)} className={styles.edit_form} id={editPassword ? styles.edit_pass_open : styles.edit_pass_closed}>
                        <input {...register('currentPassword', {required: true})} type="password" placeholder='Current Password'></input>
                        <input {...register('newPasword', {required: true})} type="password" placeholder='New Password'></input>
                        <input {...register('confirmPassword', {required: true})} type="password" placeholder='Confirm Password'></input>
                        <div className={styles.edit_btn_container}>
                            <button className={styles.edit_cancel} onClick={() => resetForm("PASSWORD")} type='button'>Cancel</button>
                            <button className={styles.edit_submit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <button className={styles.deleteAccBtn} onClick={() => setDeleteActive(true)}>
                    Delete Account
                </button>
            </div>
            {deleteActive ? 
                <div className={styles.delete_confirm}>
                    <div className={styles.blur}></div>
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