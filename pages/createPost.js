import Head from 'next/head';
import PageFooter from '../React-Components/PageFooter';
import PageHeader from '../React-Components/PageHeader';
import { UseState } from 'react';

import styles from '../styles/createPost.module.css';

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

const createPost = ({projectsData}) => {
    let projects = null;
    if (projectsData) {
        projects = JSON.parse(projectsData);
    }
    const [createProject, setCreateProject] = UseState(false);
    const toggleCreateProject = () => {
        setCreateProject(!createProject);
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
                    <form className={styles.postForm}>
                        <p className={styles.projectHeading}>Project:</p>
                        <div className={styles.project}>
                            <span className={styles.createProject} onClick={toggleCreateProject}>Create Project</span>
                            <select name='project' className={styles.projectSelect}>
                                <option value='default' disabled hidden selected>select project</option>
                                {projects.map((project) => (
                                    <option value={project._id}>{project.title}</option>
                                ))}
                            </select>
                        </div>
                        {createProject ? 
                            <div className={styles.createPSection}>
                                <div className={styles.inputField}>
                                    <p>Project Title:</p>
                                    <input type='text' placeholder='enter title'></input>
                                </div>
                                <div className={styles.inputField}>
                                    <p>Project Description:</p>
                                    <textarea type='text' placeholder='enter description'></textarea>
                                </div>
                            </div>
                            :
                            <meta />
                        }
                        <div className={styles.inputField}>
                            <p>Title:</p>
                            <input type='text' placeholder='enter title'></input>
                        </div>
                        <div className={styles.inputField}>
                            <p>Text:</p>
                            <textarea type='text' placeholder='enter text'></textarea>
                        </div>
                        <button className={styles.formButton} type="submit">Post</button>
                    </form>
                </section>
            </main>
            <PageFooter />
        </div>
    );
};

export default createPost;
