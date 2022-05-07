import dbConnect from '../../../lib/connectDB';
import Project from '../../../models/project';
import Post from '../../../models/post';
import Head from 'next/head';
import Link from 'next/link';
import { FaPen, FaTrash } from 'react-icons/fa'
import { useForm } from 'react-hook-form';
import { withIronSessionSsr } from 'iron-session/next'
import { useState } from 'react';
import axios from 'axios'
import PageHeader from '../../../React-Components/PageHeader';
import PageFooter from '../../../React-Components/PageFooter';
import styles from '../../../styles/ProjectInfo.module.css';
import editStyles from '../../../styles/EditStyles.module.css'

export const getServerSideProps = withIronSessionSsr (
    async ({params, req}) => {
        await dbConnect();

        if(!req.session.isLoggedIn) {
            req.session.isLoggedIn = false;
            req.session.clearance = 0;
            await req.session.save()
        }

        try {
            let projectData = await Project.findById(params.projectId);

            console.log(projectData);
            let postsData = [];
            for( let post of projectData.posts ) {
                postsData.push(await Post.findById(post.postId));
            }
            postsData.sort((a, b) => {
                return new Date(b.dateCreated) - new Date(a.dateCreated);
            })
            projectData = JSON.stringify(projectData);
            postsData = JSON.stringify(postsData);
            return {
                props: {
                    projectData,
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

const editProject = ({user, projectData, postsData, isLoggedIn, userClearance}) => {
    const project = JSON.parse(projectData);
    const posts = JSON.parse(postsData);
    const [editMode, setEditMode] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false);
    
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

    const deleteProject = () => {
        axios.post('/api/update/deleteProject', {
            email: user.userEmail,
            projId: project._id
        })
        .then(res => {
            if (res.data === -1) {
                //TODO: Error handle here
            } else {
                window.location = "/profile"
            }
            console.log(res);
        })
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{project.title}</title>
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
                                <input {...register('title', {required: false})} type='text' defaultValue={project.title} className={editStyles.projectTitle}></input>
                                <div>
                                    <button className={`${editStyles.editActions} ${editStyles.btn}`} onClick={() => setEditMode(false)}>Cancel</button>
                                </div>
                            </div>
                            <textarea {...register('desc', {required: false})} defaultValue={project.description} className={editStyles.projectDesc} rows='20'></textarea>
                            <button type='submit' className={`${editStyles.editActions} ${editStyles.btn}`}>Save</button>
                        </form>
                        :
                        <section className={styles.heading}>
                            <div className={editStyles.projectHeading}>
                                <h1>{project.title}</h1>
                                <div>
                                    <FaPen className={`${editStyles.editActions} ${editStyles.edit}`} onClick={() => setEditMode(true)}/>
                                    <FaTrash className={`${editStyles.editActions} ${editStyles.delete}`} onClick={() => setDeleteActive(true)}/>
                                </div>
                            </div>
                            <p className={styles.projectDate}>Date Started: {project.dateStarted}</p>
                            <p className={styles.projectDesc}>{project.description}</p>
                        </section>
                        
                    }
                    <section className={styles.postsContainer}>
                        {posts.map((post) => (
                            <Link key={post._id} href={`/dynamicRoutes/posts/${post._id}`} passHref>
                                <div className={styles.post}>
                                    <h1 className={styles.postTitle}>{post.title}</h1>
                                    <div className={styles.postContent}>
                                        <p className={styles.postText}>{post.excerpt}</p>
                                        <p className={styles.postDate}>Date Created: {post.dateCreated}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </section>
                </section>
                {deleteActive ? 
                <div className={editStyles.popup_modal}>
                    <div className={editStyles.blur}></div>
                    <div className={editStyles.modal}>
                        <h1>Are you sure?</h1>
                        <h2>Deleting this project will also remove all posts and forums that associated with it.</h2>
                        <div className={editStyles.confirmBtns}>
                            <button className={editStyles.deleteCancelBtn} onClick={()  => setDeleteActive(false)}>
                                Cancel
                            </button>
                            <button className={editStyles.confirmDeleteBtn} onClick={deleteProject}>
                                Just do it.
                            </button>
                        </div>
                    </div>
                </div> 
                :
                <></>
                }
            </main>
            <PageFooter />
        </div>
    );
};

export default editProject;
