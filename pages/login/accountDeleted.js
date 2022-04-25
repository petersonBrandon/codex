import Head from 'next/head';
import PageHeader from '../../React-Components/PageHeader'
import PageFooter from '../../React-Components/PageFooter'

import styles from '../../styles/AccountDeleted.module.css';  

const resetSuccess = ({user}) => {
    let userEmail = null;
    if(user) {
        userEmail = JSON.parse(user).email;
    }

    const timeout = () => {
        console.log("TIMEOUT");
    }

    return (
        <div className={styles.container}>
            {/* {window.onload = timeout()} */}
            <Head>
                <title>Account Deleted</title>
                <meta name="description" content="Check out this post!" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <h1>Your account has successfully been deleted.</h1>
                </section>
            </main>
            <PageFooter />
        </div>
    )
}

export default resetSuccess