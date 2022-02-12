import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import axios from 'axios'

import styles from '../../styles/createAccount.module.css';


const CreateAccountForm = () => {
    const [passwordMatch, setPassMatch] = useState(true);
    const [emailExists, setEmailExists] = useState(false);
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
              axios.post('/api/createAccount', {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  password: data.password,
              })
              .then(res => {
                  if(res.data === -1) {
                      setEmailExists(true);
                  } else {
                      setEmailExists(false);
                      window.location = '/login/Login';
                  }
              })
          }
      };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.message}>
                {errors.firstName && <p>*First name required.</p>}
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <AiOutlineUser />
                </div>
                <input {...register('firstName', {required: true})} type='text' name='firstName' placeholder='first name'/>
            </div>
            <div className={styles.message}>
                {errors.lastName && <p>*Last name required.</p>}
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <AiOutlineUser />
                </div>
                <input {...register('lastName', {required: true})} type='text' name='lastName' placeholder='last name'/>
            </div>
            <div className={styles.message}>
                {errors.email && <p>*Invalid email.</p>}
            </div>
            <div className={styles.message}>
                <div className={!emailExists ? styles.mclosed : styles.mopen}>*Email already in use.</div>
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <AiOutlineMail />
                </div>
                <input {...register('email', {required: true})} type='username' placeholder='email'/>
            </div>
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
            <button className={styles.formButton}>Create Account</button>
        </form>           
    );
};

export default CreateAccountForm;
