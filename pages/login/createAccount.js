import Head from 'next/head';
import CreateAccountForm from '../../React-Components/login/CreateAccountForm';
import PageFooter from '../../React-Components/PageFooter';
import PageHeader from '../../React-Components/PageHeader';

import styles from '../../styles/createAccount.module.css';

const createAccount = () => {
    const validEmail = false;
    const passwordMatch = false;
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
                    <CreateAccountForm />
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default createAccount;
