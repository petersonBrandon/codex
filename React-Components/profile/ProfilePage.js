import styles from '../../styles/profile/profile.module.css';
import Projects from './Projects';
import Settings from './Settings';
import {useState} from 'react'

const ProfilePage = () => {
    const PROFILE = "profile";
    const PROJECTS = "projects";
    const [window, setWindow] = useState(PROFILE);

    return (
        <div className={styles.profileContainer}>
            <section className={styles.sideNav}>
                <div className={styles.navBtn} onClick={() => setWindow(PROFILE)}>Profile</div>
                <div className={styles.navBtn} onClick={() => setWindow(PROJECTS)}>Projects</div>
            </section>

            <section className={styles.content}>
                {window === PROFILE ? <Settings /> : <meta />}
                {window === PROJECTS ? <Projects /> : <meta />}
            </section>
        </div>
    )
}

export default ProfilePage