import Head from 'next/head';
import Link from 'next/link';
import PageFooter from '../React-Components/PageFooter';
import PageHeader from '../React-Components/PageHeader';
import dbConnect from '../lib/connectDB';
import Post from '../models/post';

import { withIronSessionSsr } from 'iron-session/next'

import styles from '../styles/New.module.css';
import postStyles from '../styles/ProjectInfo.module.css'
import LikeButton from '../React-Components/Post/LikeButton';

export const getServerSideProps = withIronSessionSsr (
    async ({req}) => {
        await dbConnect();

        if(!req.session.isLoggedIn) {
            req.session.isLoggedIn = false;
            req.session.clearance = 0;
            await req.session.save()
        }

        try {
            let postsData = await Post.find({}).sort({_id: -1});

            postsData = JSON.stringify(postsData);
            return {
                props: {
                    postsData, 
                    isLoggedIn: req.session.isLoggedIn,
                    userClearance: req.session.clearance,
                    user: req.session
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

const New = ({ postsData, isLoggedIn, userClearance, user }) => {
    const posts = JSON.parse(postsData);
    return (
        <div className={styles.container}>
            <Head>
                <title>Codex New</title>
                <meta name="description" content="Check out the latest updates." />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader isLoggedIn={isLoggedIn} clearance={userClearance} />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    {posts.length > 0 ? 
                        posts.map((post) => (
                            <div className={postStyles.post}>
                                <Link key={post._id} href={`/dynamicRoutes/posts/${post._id}`} passHref>
                                    <div className={postStyles.postLink}>
                                        <h1 className={postStyles.postTitle}>{post.title}</h1>
                                        <div className={postStyles.postContent}>
                                            <p className={postStyles.postText}>{post.excerpt}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className={postStyles.postFooter}>
                                    <LikeButton post={post} user={user} />
                                    <p className={postStyles.postDate}>Date Created: {post.dateCreated}</p>
                                </div>
                            </div>
                        )) :
                        <div className={styles.no_posts}>No Posts Found</div>
                    }
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default New;
