import Head from 'next/head';
import PasswordRecForm from '../../React-Components/login/PasswordRecForm';
import PageFooter from '../../React-Components/PageFooter';
import PageHeader from '../../React-Components/PageHeader';

import styles from '../../styles/passwordRecovery.module.css'

const passwordRecovery = () => {
    const validEmail = false;
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
                    <PasswordRecForm />
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default passwordRecovery;
