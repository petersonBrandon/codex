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
                    {!createProject ? <select name='projectTitleDropdown' className={styles.projectSelect}>
                            <option value='default' disabled hidden selected>select project</option>
                            {projects.map((project) => (
                                <option key={project._id} value={project._id}>{project.title}</option>
                            ))}
                        </select> : <meta/>}
                </div>
                <input type='checkbox' name='createProject' defaultChecked={createProject} className={styles.hiddenCheckbox} />
                {createProject ? 
                    <div className={styles.createPSection}>
                        <div className={styles.inputField}>
                            <p>Project Title:</p>
                            <input name="projectTitle" type='text' placeholder='enter title'></input>
                        </div>
                        <div className={styles.inputField}>
                            <p>Project Description:</p>
                            <textarea name="projectDesc" type='text' placeholder='enter description'></textarea>
                        </div>
                    </div>
                        :
                        <meta />
                }
                <div className={styles.inputField}>
                    <p>Title:</p>
                    <input name="postTitle" type='text' placeholder='enter title'></input>
                </div>
                <div className={styles.inputField}>
                    <p>Text:</p>
                    <textarea name="postText" type='text' placeholder='enter text'></textarea>
                </div>
        </div>
    );
};

export default CreatePost;
