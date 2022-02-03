import Head from 'next/head';
import Link from 'next/link';
import PageFooter from '../../React-Components/PageFooter';
import PageHeader from '../../React-Components/PageHeader';

import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import styles from '../../styles/Login.module.css';

const Login = () => {
    const loginSuccess = true;
    return (
        <div className={styles.container}>
            <Head>
                <title>Codex Login</title>
                <meta name="description" content="Login to your Codex account." />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <h1>Login to your account.</h1>
                    <form className={styles.loginForm}>
                        <div className={styles.message}>
                            <p className={loginSuccess ? styles.mclosed : styles.mopen}>*Email or password incorrect.</p>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.icon}>
                                <AiOutlineUser />
                            </div>
                            <input type='username' placeholder='email'/>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.icon}>
                                <BiLockAlt />
                            </div>
                            <input type='password' placeholder='password'/>
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
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default Login;
