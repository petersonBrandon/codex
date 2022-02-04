import React, { useState } from 'react';

import styles from '../styles/createPost.module.css';

const CreatePost = ({projects}) => {
    const [createProject, setCreateProject] = useState(false);
    const toggleCreateProject = () => {
        setCreateProject(!createProject);
    }
    return (
        <div>
            <p className={styles.projectHeading}>Project:</p>
                <div className={styles.project}>
                    <span className={styles.createProject} onClick={toggleCreateProject}>Create Project</span>
                        <select name='project' className={styles.projectSelect}>
                            <option value='default' disabled hidden selected>select project</option>
                            {projects.map((project) => (
                                <option key={project._id} value={project._id}>{project.title}</option>
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
        </div>
    );
};

export default CreatePost;
