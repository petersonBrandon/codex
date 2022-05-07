import Link from 'next/link';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import styles from '../../styles/Login.module.css';

const LoginForm = () => {
    const [correctCreds, setCorrectCreds] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
          axios.post('/api/login', {
              email: data.email,
              password: data.password
          })
          .then(res => {
              if (res.data === -1) {
                    setCorrectCreds(false);
              } else {
                    setCorrectCreds(true);
                    window.location = '/profile';
              }
            console.log(res);
          })
      };

    return (
        <form className={styles.loginForm} name="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.message}>
                <div className={correctCreds ? styles.mclosed : styles.mopen}>*Email or password incorrect.</div>
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <AiOutlineUser />
                </div>
                <input {...register('email', {required: true})} type='email' name='email' placeholder='email'/>
            </div>
            <div className={styles.message}>
                {errors.email && <p>*Please enter email.</p>}
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <BiLockAlt />
                </div>
                <input {...register('password', {required: true})} type='password' name="password"  placeholder='password'/>
            </div>
            <div className={styles.message}>
                {errors.password && <p>*Please enter password.</p>}
            </div>
            <div className={styles.forgotPassword}>
                <Link href='/login/passwordRecovery'>Forgot your password?</Link>
            </div>
            <button className={styles.formButton}>Sign In</button>
            <div className={styles.createAccount}>
                <p>Don't have an account?</p>
                <Link href='/login/createAccount'>Sign up!</Link>
            </div>
        </form>           
    );
};

export default LoginForm;
