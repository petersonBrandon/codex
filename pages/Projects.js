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
                    <section className={styles.big_hero_centered}>
                        <h1>Projects</h1>
                    </section>
                    <section className={styles.projectsContainer}>
                        {projects.map((project) => (
                            <Link href={`/dynamicRoutes/projectPosts/${project._id}`} key={project._id} passHref>
                                <div className={styles.projectCard}>
                                    <h1 className={styles.projectTitle}>{project.title}</h1>
                                    <div className={styles.projectContent}>
                                        <p className={styles.projectDesc}>{project.description}</p>
                                        <div className={styles.cardFooter}>
                                            <p className={styles.postNumber}>Posts: {project.posts.length}</p>
                                            <p className={styles.projectDate}>Date Started: {project.dateStarted}</p>
                                        </div>
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

export default Projects;
