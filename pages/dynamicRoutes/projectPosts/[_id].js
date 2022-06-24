import dbConnect from '../../../lib/connectDB';
import Project from '../../../models/project';
import Post from '../../../models/post';
import Head from 'next/head';
import Link from 'next/link';

import { withIronSessionSsr } from 'iron-session/next'

import PageHeader from '../../../React-Components/PageHeader';
import PageFooter from '../../../React-Components/PageFooter';
import styles from '../../../styles/ProjectInfo.module.css';
import editStyles from '../../../styles/EditStyles.module.css'
import LikeButton from '../../../React-Components/Post/LikeButton';
import FollowButton from '../../../React-Components/project/FollowButton';

export const getServerSideProps = withIronSessionSsr (
    async ({params, req}) => {
        await dbConnect();

        if(!req.session.isLoggedIn) {
            req.session.isLoggedIn = false;
            req.session.clearance = 0;
            await req.session.save()
        }

        try {
            let projectData = await Project.findById(params._id);

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

const project = ({projectData, postsData, isLoggedIn, userClearance, user}) => {
    const project = JSON.parse(projectData);
    const posts = JSON.parse(postsData);
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
                    <section className={styles.heading}>
                        <div className={editStyles.projectHeading}>
                            <h1>{project.title}</h1>
                            <div className={editStyles.actionButtons}>
                                <FollowButton project={project} user={user}/>
                            </div>
                        </div>
                        <p className={styles.projectDate}>Date Started: {project.dateStarted}</p>
                        <p className={styles.projectDesc}>{project.description}</p>
                    </section>
                    <section className={styles.postsContainer}>
                        {posts.map((post) => (
                            <div className={styles.post}>
                                <Link key={post._id} href={`/dynamicRoutes/posts/${post._id}`} passHref>
                                    <div className={styles.postLink}>
                                        <h1 className={styles.postTitle}>{post.title}</h1>
                                        <div className={styles.postContent}>
                                            <p className={styles.postText}>{post.excerpt}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className={styles.postFooter}>
                                    <LikeButton post={post} user={user} />
                                    <p className={styles.postDate}>Date Created: {post.dateCreated}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default project;
