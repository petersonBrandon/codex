import Head from 'next/head';
import PageHeader from '../../React-Components/PageHeader'
import PageFooter from '../../React-Components/PageFooter'

import styles from '../../styles/NewPass.module.css';  

const resetSuccess = ({user}) => {
    let userEmail = null;
    if(user) {
        userEmail = JSON.parse(user).email;
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Reset Success</title>
                <meta name="description" content="Check out this post!" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <h1>Password Reset Successful!</h1>
                </section>
            </main>
            <PageFooter />
        </div>
    )
}

export default resetSuccess