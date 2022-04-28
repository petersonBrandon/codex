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
            const user = await User.findById(req.session.userId);

            let projectsData = [];
            for ( let project of user.projects ) {
                projectsData.push(await Project.findById(project._id));
            }

            const projectData = JSON.stringify(projectsData);
            return {
                props: {
                    projectData,
                    isLoggedIn: req.session.isLoggedIn,
                    userClearance: req.session.clearance,
                    user: req.session
                }
            }
        } catch (error) {
            return {
                props: {
                    isLoggedIn: req.session.isLoggedIn,
                    userClearance: req.session.clearance,
                    user: req.session
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

const profile = ({projectData, isLoggedIn, userClearance, user}) => {

    let projects = null;
    console.log(`Project Data: ${projectData}`)
    if (projectData) {
        projects = JSON.parse(projectData);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Post</title>
                <meta name="description" content="Create a post." />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader isLoggedIn={isLoggedIn} clearance={userClearance}/>
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <ProfilePage projectData={projects} clearance={userClearance} user={user}/>
                </section>
            </main>
            <PageFooter />
        </div>
    )
}

export default profile