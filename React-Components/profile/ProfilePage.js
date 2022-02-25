import styles from '../../styles/profile/profile.module.css';
import Projects from './Projects';
import Settings from './Settings';

const ProfilePage = () => {
    return (
        <div className={styles.profileContainer}>
            <section className={styles.sideNav}>
                <div className={styles.navBtn}>Profile</div>
                <div className={styles.navBtn}>Projects</div>
            </section>

            <section className={styles.content}>
                <Settings />
                <Projects />
            </section>
        </div>
    )
}

export default ProfilePage