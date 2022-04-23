import Image from 'next/image';
import styles from '../styles/PageFooter.module.css';

import fbLogo from '../public/images/facebook_logo.png';
import linkedInLogo from '../public/images/linkedin_logo.png';
import gitHubLogo from '../public/images/GitHub_logo.png';

const PageFooter = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.footContainer}>
                <p>Website created by Brandon Peterson</p>
                <div className={styles.socialNav}>
                    <div className={styles.socialLink}>
                        <a href='https://www.linkedin.com/in/brandon-peterson-194572198/'>
                            <Image src={linkedInLogo} alt='Facebook' layout='fill'/>
                        </a>
                    </div>
                    <div className={styles.socialLink}>
                        <a href='https://www.facebook.com/brandon.peterson.1694059'>
                            <Image src={fbLogo} alt='Facebook' layout='fill'/>
                        </a>
                    </div>
                    <div className={styles.socialLink}>
                        <a href='https://github.com/petersonBrandon'>
                            <Image src={gitHubLogo} alt='Facebook' layout='fill'/> 
                        </a>
                    </div>
                   
                </div>
            </div>
        </footer>
    );
};

export default PageFooter;
