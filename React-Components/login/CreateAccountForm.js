import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import styles from '../../styles/createAccount.module.css';


const CreateAccountForm = () => {
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
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <AiOutlineMail />
                </div>
                <input {...register('email', {required: true})} type='username' placeholder='email'/>
            </div>
            <div className={styles.message}>
                {errors.password && <p>*Password required.</p>}
            </div>
            <div className={styles.inputField}>
                <div className={styles.icon}>
                    <BiLockAlt />
                </div>
                <input {...register('password', {required: true})} type='password' placeholder='password'/>
            </div>
            <div className={styles.message}>
                <div className={passwordMatch ? styles.mclosed : styles.mopen}>*Passwords do not match</div>
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
