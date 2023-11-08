import {useContext} from 'react';
import Link from 'next/link';
import { myContext } from '../pages/context'
import { login, logout } from '../lib/user';
import styles from '../styles/navbar.module.css'


interface IUser {
    gId: string
    email: string;
    source: string;
    profilePhoto?: string;
    lastVisited?: Date;
}

export default function Navbar () {
    
    const user = useContext(myContext) as IUser;

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                <Link href="/">Home</Link>
                <Link href="/create">Create a Story</Link>
                <Link href="/view">View Your Stories</Link>
            </div>
            <div className={styles.profileDropdown}>
                {user ? (
                <>
                    <img className={styles.avatar} src={user.profilePhoto} alt="User Avatar" />
                    <span className={styles.username}>{user.email}</span>
                    <div className={styles.dropdownContent}>
                    <button onClick={logout}>Logout</button>
                    </div>
                </>
                ) : (
                <button onClick={login}>Login</button>
                )}
            </div>
        </nav>
    );
};
