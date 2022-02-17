import dbConnect from '../../../lib/connectDB';
import Post from '../../../models/post';
import Head from 'next/head';

import { withIronSessionSsr } from 'iron-session/next'

import styles from '../../../styles/Post.module.css';
import PageHeader from '../../../React-Components/PageHeader';
import PageFooter from '../../../React-Components/PageFooter';

export const getServerSideProps = withIronSessionSsr (
    async ({params, req}) => {
        await dbConnect();

        if(!req.session.isLoggedIn) {
            req.session.isLoggedIn = false;
            req.session.clearance = 0;
            await req.session.save()
        }

        try {
            let postData = await Post.findById(params._id)
            postData = JSON.stringify(postData);
            return {
                props: {
                    postData,
                    isLoggedIn: req.session.isLoggedIn,
                    userClearance: req.session.clearance
                }
            }
        } catch (error) {
            return {
                props: {}
            }
        }
    },
    {
        cookieName: "CODEXAPPCOOKIE",
        cookieOptions : {
            secure: process.env.NODE_ENV === "production" 
        },
        password: process.env.SESSION_PASS
    }   
)

const post = ({postData, isLoggedIn, userClearance}) => {
    const post = JSON.parse(postData);
    return (
        <div className={styles.container}>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content="Check out this post!" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader isLoggedIn={isLoggedIn} clearance={userClearance} />
            <main className={styles.main} >
                <section className={styles.bodyContainer}>
                    <div className={styles.heading}>
                        <h1>{post.title}</h1>
                        <h2>Author: {post.author}</h2>
                        <h3>Date Created: {post.dateCreated}</h3>
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.body}>
                            {post.text}
                        </p>
                    </div>
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default post;
