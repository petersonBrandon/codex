import dbConnect from '../../../lib/connectDB';
import Project from '../../../models/project';
import Post from '../../../models/post';
import Head from 'next/head';
import Link from 'next/link';

import PageHeader from '../../../React-Components/PageHeader';
import PageFooter from '../../../React-Components/PageFooter';
import styles from '../../../styles/ProjectInfo.module.css';

export async function getServerSideProps({ params }) {
 
    await dbConnect();

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
            props: {projectData, postsData}
        }
    } catch (error) {
        return {
            props: {}
        }
    }
}

const project = ({projectData, postsData}) => {
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
            <PageHeader />
            <main className={styles.main} >
                <section className={styles.bodyContainer}>
                    <section className={styles.heading}>
                        <h1>{project.title}</h1>
                        <p className={styles.projectDate}>Date Started: {project.dateStarted}</p>
                        <p className={styles.projectDesc}>{project.description}</p>
                    </section>
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
            </main>
            <PageFooter />
        </div>
    );
};

export default project;
