import Head from 'next/head';
import Link from 'next/link';
import PageFooter from '../../React-Components/PageFooter';
import PageHeader from '../../React-Components/PageHeader';

import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import styles from '../../styles/createAccount.module.css';

import React from 'react';

const createAccount = () => {
    const validEmail = true;
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Account</title>
                <meta name="description" content="Create your Codex account." />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <h1>Create account.</h1>
                    <form className={styles.loginForm}>
                        <div className={styles.message}>
                            <p className={validEmail ? styles.mclosed : styles.mopen}>*Email or password incorrect.</p>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.icon}>
                                <AiOutlineUser />
                            </div>
                            <input type='text' name='firstName' placeholder='first name'/>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.icon}>
                                <AiOutlineUser />
                            </div>
                            <input type='text' name='lastName' placeholder='last name'/>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.icon}>
                                <AiOutlineMail />
                            </div>
                            <input type='username' placeholder='email'/>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.icon}>
                                <BiLockAlt />
                            </div>
                            <input type='password' placeholder='password'/>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.icon}>
                                <BiLockAlt />
                            </div>
                            <input type='password' placeholder='re-enter password'/>
                        </div>
                        <button className={styles.formButton}>Create Account</button>
                    </form>
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default createAccount;
