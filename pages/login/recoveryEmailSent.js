import Head from 'next/head';
import PageHeader from '../../React-Components/PageHeader'
import PageFooter from '../../React-Components/PageFooter'

import styles from '../../styles/NewPass.module.css';  

const recoveryEmailSent = ({user}) => {
    let userEmail = null;
    if(user) {
        userEmail = JSON.parse(user).email;
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Email Sent</title>
                <meta name="description" content="Check out this post!" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <h1>Recovery email has been sent!</h1>
                </section>
            </main>
            <PageFooter />
        </div>
    )
}

export default recoveryEmailSent