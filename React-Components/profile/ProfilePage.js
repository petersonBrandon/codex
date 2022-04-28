import styles from '../../styles/profile/profile.module.css';
import Projects from './Projects';
import Settings from './Settings';
import {useState} from 'react'

const ProfilePage = (props) => {
    const SETTINGS = "settings";
    const DASH = "dashboard";
    const [window, setWindow] = useState(DASH);
    const [focus, setFocus] = useState(DASH);

    return (
        <div className={styles.profileContainer}>
            <section className={styles.nav}>
                <div className={styles.navBtn_container}>
                    <div className={styles.navBtn} id={focus === DASH ? styles.focused : null} onClick={() => {setWindow(DASH); setFocus(DASH)}}>Dashboard</div>
                    <div className={styles.navBtn} id={focus === SETTINGS ? styles.focused : null} onClick={() => {setWindow(SETTINGS); setFocus(SETTINGS)}}>Settings</div>
                </div>
            </section>

            <section className={styles.content}>
                {window === SETTINGS ? <Settings user={props.user} /> : <meta />}
                {window === DASH ? <Projects projects = {props.projectData}/> : <meta />}
            </section>
        </div>
    )
}

export default ProfilePage