import styles from '../../styles/profile/dashboard.module.css';
import { VscAdd } from 'react-icons/vsc';
import ProjectCard from './ProjectCard';

const Projects = ({projects}) => {
    return (
        <div className={styles.projects_container}>
            <div className={styles.project_header}>
                <h1 className={styles.project_count}>Projects: {projects.length}</h1>
                <VscAdd className={styles.addIcon}/>
            </div>
            <section className={styles.projects_list}>
                {projects.map((project) => (
                    <ProjectCard project={project}/>
                ))}
            </section>
        </div>
    )
}

export default Projects