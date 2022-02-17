import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { BiLockAlt } from "react-icons/bi";

import styles from '../../styles/NewPass.module.css';

const NewPasswordForm = ({userEmail}) => {
    const [passwordMatch, setPassMatch] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm();

    const onSubmit = (data) => {
        if (data.password != data.password2) {
            setPassMatch(false);
        } else {
            setPassMatch(true);
            axios.post('/api/setNewPass', {
                password: data.password,
                email: userEmail
            })
            .then(res => {
                if (res.data !== -1) {
                    window.location = "/login/resetSuccess"
                }
            })
        }
    };

    return (
        <form className={styles.loginForm} name="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.message}>
                {errors.password && <p>*Password required.</p>}
            </div>
            <div className={styles.message}>
                <div className={passwordMatch ? styles.mclosed : styles.mopen}>*Passwords do not match</div>
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <BiLockAlt />
                </div>
                <input {...register('password', {required: true})} type='password' placeholder='password'/>
            </div>
            <div className={styles.message}>
                {errors.password2 && <p>*Re-enter password.</p>}
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <BiLockAlt />
                </div>
                <input {...register('password2', {required: true})} type='password' placeholder='re-enter password'/>
            </div>
            <button className={styles.formButton}>Reset Password</button>
        </form>
    )
}

export default NewPasswordForm