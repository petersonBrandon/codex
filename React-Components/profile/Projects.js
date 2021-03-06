import styles from '../../styles/profile/dashboard.module.css';
import { VscAdd } from 'react-icons/vsc';
import ProjectCard from './ProjectCard';
import axios from 'axios'
import { useState } from 'react';
import editStyles from '../../styles/EditStyles.module.css'
import {AiOutlineClose} from 'react-icons/ai'
import { useForm, Controller } from 'react-hook-form';

const Projects = ({ user, projects}) => {
    const [createProject, setCreateProject] = useState(false);
    const [projectCreated, setProjectCreated] = useState(true);
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = (data) => {
        axios.post('/api/createProject', {
            projectName: data.projectTitle,
            projectDesc: data.projectDesc,
            email: user.userEmail
        })
        .then(res => {
            if (res.data === -1) {
                setProjectCreated(false);
            } else {
                setProjectCreated(true);
                window.location = '/profile';
            }
          console.log(res);
        })
    } 

    return (
        <div className={styles.projects_container}>
            <div className={styles.project_header}>
                <h1 className={styles.project_count}>Projects: {projects.length}</h1>
                <VscAdd className={styles.addIcon} onClick={() => setCreateProject(true)}/>
            </div>
            <section className={styles.projects_list}>
                {projects.length === 0 ?
                    <div className={styles.emptyProjectList}></div>
                    :
                    projects.map((project) => (
                        <ProjectCard project={project} user={user}/>
                    ))
                }
            </section>
            {createProject ? 
                <div className={editStyles.popup_modal}>
                    <div className={editStyles.blur}></div>
                    <div className={editStyles.modal}>
                        <div className={editStyles.createClose}>
                            <AiOutlineClose className={editStyles.edit} onClick={()  => setCreateProject(false)}/>
                        </div>
                        <h1>Create Project</h1>
                        <form className={editStyles.createProj} onSubmit={handleSubmit(onSubmit)}>
                            <input {...register('projectTitle', {required: true})} type='text' placeholder='Title' className={editStyles.createProjectTitle}></input>
                            {errors.projectTitle && <p>*Please enter a title.</p>}
                            <textarea {...register('projectDesc', {required: true})} placeholder='Description' className={editStyles.createProjectDesc} rows='15'></textarea>
                            {errors.projectDesc && <p>*Please enter a description.</p>}
                            <div>
                                <button className={editStyles.createProjBtn} >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div> 
                :
                <></>
            }
            {/* TODO: Implement error message for failed project creation */}
        </div>
    )
}

export default Projects