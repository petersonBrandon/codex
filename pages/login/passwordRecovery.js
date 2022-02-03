import Head from 'next/head';
import PageFooter from '../../React-Components/PageFooter';
import PageHeader from '../../React-Components/PageHeader';

import { AiOutlineUser } from "react-icons/ai";

import styles from '../../styles/passwordRecovery.module.css'

const passwordRecovery = () => {
    const validEmail = true;
    return (
        <div className={styles.container}>
            <Head>
                <title>Recover Password</title>
                <meta name="description" content="Recover your Codex account." />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <h1>Password Recovery.</h1>
                    <form className={styles.loginForm}>
                        <div className={styles.message}>
                            <p className={validEmail ? styles.mclosed : styles.mopen}>*Email is incorrect.</p>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.icon}>
                                <AiOutlineUser />
                            </div>
                            <input type='username' placeholder='email'/>
                        </div>
                        <button className={styles.formButton}>Send Recovery Email</button>
                    </form>
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default passwordRecovery;
