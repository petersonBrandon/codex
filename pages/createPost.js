import Head from 'next/head';
import PageFooter from '../React-Components/PageFooter';
import PageHeader from '../React-Components/PageHeader';

import styles from '../styles/createPost.module.css';

import dbConnect from '../lib/connectDB';
import Project from'../models/project';
import CreatePost from '../React-Components/CreatePost';

export async function getServerSideProps() {
 
    await dbConnect();

    try {
        let projectsData = await Project.find({});
        projectsData = JSON.stringify(projectsData);
        return {
            props: {projectsData}
        }
    } catch (error) {
        return {
            props: {}
        }
    }
}

const createPost = ({projectsData}) => {
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
            <PageHeader />
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
