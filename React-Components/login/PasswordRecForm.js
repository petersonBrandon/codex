import axios from 'axios'
import { useForm } from 'react-hook-form';

import { AiOutlineUser } from "react-icons/ai";

import styles from '../../styles/passwordRecovery.module.css'

const PasswordRecForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm();
    
        const onSubmit = (data) => {
        axios.post('/api/passwordRecover', {
            email: data.email,
        })
        .then(res => {
            if (res.data !== -1) {
                window.location = "/login/recoveryEmailSent"
            }
        })
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.message}>
                {errors.email && <p>*Invalid email.</p>}
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <AiOutlineUser />
                </div>
                <input {...register('email', {required: true})} type='username' placeholder='email'/>
            </div>
            <button className={styles.formButton}>Send Recovery Email</button>
        </form>             
    );
};

export default PasswordRecForm;
