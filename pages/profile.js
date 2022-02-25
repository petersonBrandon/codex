import Head from 'next/head';
import ProfilePage from '../React-Components/profile/ProfilePage'
import PageFooter from '../React-Components/PageFooter';
import PageHeader from '../React-Components/PageHeader';

import dbConnect from '../lib/connectDB';
import Project from'../models/project';
import User from '../models/user';

import styles from '../styles/profile/profile.module.css'

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
            const user = await User.findById(req.session.userId)

            let projectsData = [];
            for ( let project of user.projects ) {
                projectsData.push(await Project.findById(project._id));
            }

            projectsData = JSON.stringify(projectData);
            return {
                props: {
                    projectsData,
                    isLoggedIn: req.session.isLoggedIn,
                    userClearance: req.session.clearance
                }
            }
        } catch (error) {
            return {
                props: {
                    isLoggedIn: req.session.isLoggedIn
                }
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

const profile = ({projectsData, isLoggedIn, userClearance}) => {
    const projects = null;
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
                    <ProfilePage projectData={projects} clearance={userClearance} />
                </section>
            </main>
            <PageFooter />
        </div>
    )
}

export default profile