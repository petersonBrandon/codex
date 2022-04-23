import Head from 'next/head';
import PageFooter from '../React-Components/PageFooter';
import PageHeader from '../React-Components/PageHeader';

import styles from '../styles/createPost.module.css';

import dbConnect from '../lib/connectDB';
import Project from'../models/project';
import CreatePost from '../React-Components/CreatePost';

import { withIronSessionSsr } from 'iron-session/next'

export const getServerSideProps = withIronSessionSsr (
    async ({req, res}) => {
        await dbConnect();

        if(!req.session.isLoggedIn) {
            res.setHeader('location', '/login/Login');
            res.statusCode = 302
            res.end()
            return {
                props: {isLoggedIn: req.session.isLoggedIn}
            }
        }

        try {
            let projectsData = await Project.find({});
            projectsData = JSON.stringify(projectsData);
            return {
                props: {
                    projectsData,
                    isLoggedIn: req.session.isLoggedIn
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

const createPost = ({projectsData, isLoggedIn}) => {
    let projects = null;
    if (projectsData) {
        projects = JSON.parse(projectsData);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Post</title>
                <meta name="description" content="Create a post." />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader isLoggedIn={isLoggedIn} />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <h1>Create Post.</h1>
                    <CreatePost projects={projects} />
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default createPost;
