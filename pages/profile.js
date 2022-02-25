import Head from 'next/head';
import ProfilePage from '../React-Components/profile/ProfilePage'
import PageFooter from '../React-Components/PageFooter';
import PageHeader from '../React-Components/PageHeader';

import styles from '../styles/profile/profile.module.css'

import { withIronSessionSsr } from 'iron-session/next'

export const getServerSideProps = withIronSessionSsr (
    async ({req, res}) => {
        if(!req.session.isLoggedIn) {
            res.setHeader('location', '/login/Login');
            res.statusCode = 302
            res.end()
            return {
                props: {isLoggedIn: req.session.isLoggedIn}
            }
        }

        return {
            props: {
                isLoggedIn: req.session.isLoggedIn
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

const profile = ({isLoggedIn}) => {
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
                <ProfilePage />
            </main>
            <PageFooter />
        </div>
    )
}

export default profile