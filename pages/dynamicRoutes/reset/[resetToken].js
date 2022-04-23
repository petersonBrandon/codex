import Link from 'next/link';
import Head from 'next/head';
import NewPasswordForm from '../../../React-Components/login/NewPasswordForm';
import dbConnect from '../../../lib/connectDB';
import User from '../../../models/user';
import PageHeader from '../../../React-Components/PageHeader'
import PageFooter from '../../../React-Components/PageFooter'

import styles from '../../../styles/NewPass.module.css';

export async function getServerSideProps({params}) {
    await dbConnect();
    
    const token = params.resetToken;

    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    if(!user) {
        return {
            props: {
                user: false
            },
            }
    } else {
        return {
            props: {
                user: JSON.stringify(user)
            }
        }
    }
}
  

const reset = ({user}) => {
    let userEmail = null;
    if(user) {
        userEmail = JSON.parse(user).email;
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Reset Password</title>
                <meta name="description" content="Check out this post!" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    {user ? 
                        <div className={styles.passwordResetContainer}>
                            <h1>Enter New Password</h1>
                            <NewPasswordForm userEmail={userEmail}/>
                        </div>
                        :
                        <div className={styles.error}>
                            <h1>Password reset timed out, or invalid token.</h1>
                            <Link href='/login/passwordRecovery'>Reset Again</Link>
                        </div>
                    }
                </section>
            </main>
            <PageFooter />
        </div>
    )
}

export default reset