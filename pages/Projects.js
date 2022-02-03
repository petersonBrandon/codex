import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Projects.module.css';
import PageHeader from '../React-Components/PageHeader';
import PageFooter from '../React-Components/PageFooter';

import dbConnect from '../lib/connectDB';
import Project from'../models/project';

export async function getServerSideProps() {
 
    await dbConnect();

    try {
        let projectsData = await Project.find({})
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

const Projects = ({ projectsData }) => {
    let projects = null;
    if (projectsData) {
        projects = JSON.parse(projectsData);
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Codex Projects</title>
                <meta name="description" content="Here are all our current and past projects!" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <h1>{projects[0].title}</h1>
                </section> 
            </main>
            <PageFooter />
        </div>
    );
};

export default Projects;
