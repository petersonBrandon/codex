import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/PageHeader.module.css'

import { MdSearch } from "react-icons/md";
import { useState } from 'react';
import { VscAdd } from 'react-icons/vsc';

import codexLogo from '../public/images/Codex_Logo.png';

const PageHeader = () => {
    const [isChecked, setChecked] = useState(false); 

    const handleCheck = () => {
        setChecked(!isChecked);
        console.log(isChecked);
    }

    let isLoggedIn = false;

    return (
        <header className={styles.container}>
            <nav className={styles.normalNav}>
                <div className={styles.navContainer}>
                    <Link href="/">
                        <div className={styles.logo}>
                            <Image src={codexLogo} alt='CodexLogo' layout='responsive'/>
                        </div>
                    </Link>
                    <div className={styles.link}>
                        <Link href='/New'>New</Link>
                    </div>
                    <div className={styles.link}>
                        <Link href='/Projects'>Projects</Link>
                    </div>
                    <div className={styles.search}>
                        <div className={styles.searchBox}>
                            <input type='text' />
                        </div>
                        <MdSearch className={styles.searchIcon}/>
                    </div>
                    {isLoggedIn ? 
                        <div className={styles.link}>
                            <Link href="/createPost">
                                <VscAdd className={styles.addIcon}/>
                            </Link>
                        </div>
                        : <meta/>
                    }
                    <div className={styles.link}>
                        {isLoggedIn ? <Link href="/login/Login">Logout</Link> : <Link href="/login/Login">Login</Link>}
                    </div>
                </div>
            </nav>
            <nav className={styles.mobileNav}>
                <div className={styles.mobileHeader}>
                    <Link href="/">
                        <div className={styles.logo}>
                            <Image src={codexLogo} alt='CodexLogo' layout='responsive'/>
                        </div>
                    </Link>
                    <input type="checkbox" checked={isChecked}/>
                    <div className={styles.hamburgerContainer}>
                        <div className={`${styles.hamburger} ${isChecked ? styles.open : ''}`} 
                                onClick={handleCheck}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className={`${isChecked ? styles.dropOpen : styles.dropClosed}`}>
                    <div className={styles.searchBox}>
                        <input type='text' placeholder='Search...'/>
                    </div>
                    <div className={styles.mItemsSection}>
                        <div className={styles.link}>
                            <Link href='/'>Home</Link>
                        </div>
                        <div className={styles.link}>
                            <Link href='/New'>New</Link>
                        </div>
                        <div className={styles.link}>
                            <Link href='/Projects'>Projects</Link>
                        </div>
                        <div className={styles.link}>
                            <Link href="/login/Login">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default PageHeader;
