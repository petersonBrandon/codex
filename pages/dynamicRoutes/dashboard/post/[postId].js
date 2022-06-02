import dbConnect from '../../../../lib/connectDB';
import Post from '../../../../models/post';
import Head from 'next/head';

import { FaPen, FaTrash } from 'react-icons/fa'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { withIronSessionSsr } from 'iron-session/next'

import styles from '../../../../styles/Post.module.css';
import PageHeader from '../../../../React-Components/PageHeader';
import PageFooter from '../../../../React-Components/PageFooter';
import editStyles from '../../../../styles/EditStyles.module.css'

export const getServerSideProps = withIronSessionSsr (
    async ({params, req}) => {
        await dbConnect();

        if(!req.session.isLoggedIn) {
            req.session.isLoggedIn = false;
            req.session.clearance = 0;
            await req.session.save()
        }

        try {
            let postData = await Post.findById(params.postId)
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
    const [editMode, setEditMode] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        axios.post('/api/update/updateProject', {
            email: user.userEmail,
            projId: project._id,
            title: data.title,
            desc: data.desc
        })
        .then(res => {
            if (res.data === -1) {
                //TODO: Error handle here
            } else {
                window.location.reload();
            }
            console.log(res);
        })
    };
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
                    {editMode ? 
                            <form className={`${styles.heading} ${editStyles.editHeading}`} onSubmit={handleSubmit(onSubmit)}>
                                <div className={editStyles.projectHeading}>
                                    <input {...register('title', {required: false})} type='text' defaultValue={post.title} className={editStyles.projectTitle}></input>
                                    <div>
                                        <button className={`${editStyles.editActions} ${editStyles.btn}`} onClick={() => setEditMode(false)}>Cancel</button>
                                    </div>
                                </div>
                                <textarea {...register('desc', {required: false})} defaultValue={post.text} className={editStyles.projectDesc} rows='20'></textarea>
                                <button type='submit' className={`${editStyles.editActions} ${editStyles.btn}`}>Save</button>
                            </form>
                            :
                            <section className={styles.heading}>
                                <div className={editStyles.projectHeading}>
                                    <h1>{post.title}</h1>
                                    <div>
                                        <FaPen className={`${editStyles.editActions} ${editStyles.edit}`} onClick={() => setEditMode(true)}/>
                                        <FaTrash className={`${editStyles.editActions} ${editStyles.delete}`} onClick={() => setDeleteActive(true)}/>
                                    </div>
                                </div>
                                <h2>Author: {post.author}</h2>
                                <h3>Date Created: {post.dateCreated}</h3>
                                <div className={styles.textContainer}>
                                    <p className={styles.body}>
                                        {post.text}
                                    </p>
                                </div>
                            </section>       
                    }
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default post;
