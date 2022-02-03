import Head from 'next/head';
import PageFooter from '../React-Components/PageFooter';
import PageHeader from '../React-Components/PageHeader';

import styles from '../styles/createPost.module.css';

const createPost = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Post</title>
                <meta name="description" content="Create a post." />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                <h1>Create Post.</h1>
                    <form className={styles.loginForm}>
                        <div className={styles.inputField}>
                            <input type='text' name='firstName' placeholder='first name'/>
                        </div>
                        <button className={styles.formButton}>Post</button>
                    </form>
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default createPost;
