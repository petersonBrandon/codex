import styles from '../../styles/profile/dashboard.module.css';
import FollowButton from '../project/FollowButton'

const ProjectCard = ({project, user}) => {
    return (
        <div className={styles.project_card}>
            <a href={`/dynamicRoutes/dashboard/${project._id}`} className={styles.project_card_link}>
                <div className={styles.project_card_header}>
                    {project.title}
                </div>
                <div className={styles.project_card_body}>
                    {project.description}
                </div>
            </a>
            <div className={styles.project_card_footer}>
                <FollowButton project={project} user={user}/>
                <div>{project.dateStarted}</div>
            </div>
        </div>
    )
}

export default ProjectCard