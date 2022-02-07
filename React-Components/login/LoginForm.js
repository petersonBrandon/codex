import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import styles from '../../styles/Login.module.css';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
          console.log(data);
      };

    return (
        <form className={styles.loginForm} name="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.message}>
                {errors.email && <p>*Email or password incorrect.</p>}
                {errors.password && <p>*Email or password incorrect.</p>}
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <AiOutlineUser />
                </div>
                <input {...register('email', {required: true})} type='username' name='email' placeholder='email'/>
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <BiLockAlt />
                </div>
                <input {...register('password')} type='password' name="password"  placeholder='password'/>
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
