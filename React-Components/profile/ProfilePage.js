import styles from '../../styles/profile/profile.module.css';
import Projects from './Projects';
import Settings from './Settings';
import {useState} from 'react'

const ProfilePage = (props) => {
    const SETTINGS = "settings";
    const PROJECTS = "projects";
    const [window, setWindow] = useState(PROJECTS);
    const [focus, setFocus] = useState(PROJECTS);

    return (
        <div className={styles.profileContainer}>
            <section className={styles.nav}>
                <div className={styles.navBtn_container}>
                    <div className={styles.navBtn} id={focus === PROJECTS ? styles.focused : null} onClick={() => {setWindow(PROJECTS); setFocus(PROJECTS)}}>Projects</div>
                    <div className={styles.navBtn} id={focus === SETTINGS ? styles.focused : null} onClick={() => {setWindow(SETTINGS); setFocus(SETTINGS)}}>Settings</div>
                </div>
            </section>

            <section className={styles.content}>
                {window === SETTINGS ? <Settings user={props.user} /> : <meta />}
                {window === PROJECTS ? <Projects projects = {props.projects}/> : <meta />}
            </section>
        </div>
    )
}

export default ProfilePage