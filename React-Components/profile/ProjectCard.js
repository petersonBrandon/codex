import styles from '../../styles/profile/dashboard.module.css';

const ProjectCard = ({project}) => {
    return (
        <a href={`/dynamicRoutes/dashboard/${project._id}`} className={styles.project_card}>
            <div className={styles.project_card_header}>
                {project.title}
            </div>
            <div className={styles.project_card_body}>
                {/* TODO: BODY GOES HERE */}
            </div>
            <div className={styles.project_card_footer}>
                {project.dateStarted}
            </div>
        </a>
    )
}

export default ProjectCard