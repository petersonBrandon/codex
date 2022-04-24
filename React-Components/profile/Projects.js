import styles from '../../styles/profile/profile.module.css';
import { VscAdd } from 'react-icons/vsc';

const Projects = () => {
    return (
        <div className={styles.projects_container}>
            <div className={styles.project_header}>
                <h1 className={styles.project_count}>Projects: 0</h1>
                <VscAdd className={styles.addIcon}/>
            </div>
        </div>
    )
}

export default Projects