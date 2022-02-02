import Head from 'next/head';
import Link from 'next/link';
import Card from '../React-Components/Card';
import PageFooter from '../React-Components/PageFooter';
import PageHeader from '../React-Components/PageHeader';
import dbConnect from '../lib/connectDB';
import Post from '../models/post';

import styles from '../styles/New.module.css';

export async function getServerSideProps() {
 
    await dbConnect();

    try {
        let postsData = await Post.find({})
        postsData = JSON.stringify(postsData);
        return {
            props: {postsData}
        }
    } catch (error) {
        return {
            props: {}
        }
    }
}

const New = ({ postsData }) => {
    const posts = JSON.parse(postsData);
    return (
        <div className={styles.container}>
            <Head>
                <title>Codex New</title>
                <meta name="description" content="Check out the latest updates." />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    {posts.map((post) => (
                        <Link href={`/new/${post._id}`}>
                            <Card title={post.title} text={post.text}/>
                        </Link>
                    ))}
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default New;
