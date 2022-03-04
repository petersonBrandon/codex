import styles from '../../styles/profile/profile.module.css';

const Settings = ({user}) => {
    return (
        <div className={styles.settings_container}>
            <h1 className={styles.profileHeader}>
                {user.userName}
            </h1>
            <div className={styles.profileBody}>
                Email: {user.userEmail}
            </div>
            <button className={styles.deleteAccBtn}>
                Delete Account
            </button>
        </div>
    )
}

export default Settings