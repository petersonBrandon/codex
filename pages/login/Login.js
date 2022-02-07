import Head from 'next/head';
import PageFooter from '../../React-Components/PageFooter';
import PageHeader from '../../React-Components/PageHeader';

import styles from '../../styles/Login.module.css';
import LoginForm from '../../React-Components/Login/LoginForm';



const Login = () => {
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
                    <LoginForm />
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default Login;
