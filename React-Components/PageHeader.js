import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

import styles from '../styles/PageHeader.module.css'

import { useState } from 'react';
import { MdSearch } from "react-icons/md";
import { VscAdd } from 'react-icons/vsc';

import codexLogo from '../public/images/Codex_Logo.png';
import ProfileDropdown from './profile/ProfileDropdown';

const PageHeader = ({isLoggedIn, clearance}) => {
    console.log(isLoggedIn);
    const [isChecked, setChecked] = useState(false); 

    const handleCheck = () => {
        setChecked(!isChecked);
        console.log(isChecked);
    }

    const handleLogout = () => {
        axios.get('/api/logout')
            .then(res => {
                window.location = "/login/Login"
            });
    }

    const enterSearch = () => {
        const search = document.getElementById("search").value;
        if (event.keyCode == 13) {
            window.location = `/dynamicRoutes/search/${search}`
        }
    }

    const enterSearchMobile = () => {
        const search = document.getElementById("search2").value;
        if (event.keyCode == 13) {
            window.location = `/dynamicRoutes/search/${search}`
        }
    }

    const search = () => {
        let search = document.getElementById("search").value;
        if (search !== "") {
            window.location = `/dynamicRoutes/search/${search}`
        }
    }

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
                            <input type='text' id='search' onKeyPress={enterSearch}/>
                        </div>
                        <MdSearch className={styles.searchIcon} onClick={search}/>
                    </div>
                    <div className={styles.link}>
                        {isLoggedIn ? <ProfileDropdown onClick={handleLogout} /> : <Link href="/login/Login">Login</Link> }
                    </div>
                </div>
            </nav>
            <nav className={styles.mobileNav}>
                {isLoggedIn && clearance === '5' ? 
                    <div className={styles.mobilePlus}>
                        <Link href="/createPost">
                            <VscAdd className={styles.addIcon}/>
                        </Link>
                    </div>
                    : <meta/>
                }
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
                        <input type='text' placeholder='Search...' id='search2' onKeyPress={enterSearchMobile}/>
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
                            {isLoggedIn ? <Link href="/profile">Dashboard</Link> : <meta />}
                        </div>
                        <div className={styles.link}>
                            {isLoggedIn ? <div onClick={handleLogout}>Logout</div> : <Link href="/login/Login">Login</Link>}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};



export default PageHeader;
