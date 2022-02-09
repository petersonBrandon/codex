import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select'

import styles from '../styles/createPost.module.css';

const CreatePost = ({projects}) => {
    const [createProject, setCreateProject] = useState(false);
    const toggleCreateProject = () => {
        setCreateProject(!createProject);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm();
        
    const onSubmit = (data) => {
        console.log(data);
    };

    let options = [];

    projects.map((project) => {
      options.push({value: project._id, label: project.title});      
    });

    return (
        <form className={styles.postForm} action='/api/create' method='POST'>
            <h1 className={styles.projectHeading}>Project:</h1>
                <div className={styles.project}>
                    <span className={styles.createProject} onClick={toggleCreateProject}>Create Project</span>
                    {!createProject ? 
                        <Controller
                            name='projectSelect'
                            defaultValue=""
                            control={control}  
                            rules={{required: !createProject}}                         
                            render={({ field }) => (
                                <Select options={options} {...field} label="projectSelect" className={styles.projectSelect}/>
                            )} 
                        />
                         : <meta/>}
                </div>
                {!createProject ? errors.projectSelect && <p className={styles.selectError}>*Please select or create a project.</p>
                : <meta />}
                <input type='checkbox' name='createProject' defaultChecked={createProject} className={styles.hiddenCheckbox} />
                {createProject ? 
                    <div className={styles.createPSection}>
                        <div className={styles.inputField}>
                            <h1>Project Title:</h1>
                            <input {...register('projectTitle', {required: createProject})} name="projectTitle" type='text' placeholder='enter title'></input>
                            {errors.projectTitle && <p>*Please enter the project title.</p>}
                        </div>
                        <div className={styles.inputField}>
                            <h1>Project Description:</h1>
                            <textarea {...register('projectDesc', {required: createProject})} name="projectDesc" type='text' placeholder='enter description'></textarea>
                            {errors.projectDesc && <p>*Please enter the project description.</p>}
                        </div>
                    </div>
                        :
                        <meta />
                }
                <div className={styles.inputField}>
                    <h1>Title:</h1>
                    <input {...register('postTitle', {required: true})} name="postTitle" type='text' placeholder='enter title'></input>
                    {errors.postTitle && <p>*Please enter a title.</p>}
                </div>
                <div className={styles.inputField}>
                    <h1>Text:</h1>
                    <textarea {...register('postText', {required: true})} name="postText" type='text' placeholder='enter text'></textarea>
                    {errors.postText && <p>*Please enter the post body.</p>}
                </div>
                <button className={styles.formButton} type="submit">Post</button>
        </form>
    );
};

export default CreatePost;
