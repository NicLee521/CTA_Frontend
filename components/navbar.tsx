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
interface Context {
    userObject: IUser
}

export default function Navbar () {
    
    const {userObject} = useContext(myContext) as Context;

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                <Link href="/">Home</Link>
                <Link href="/create">Create a Story</Link>
                <Link href="/view">View Your Stories</Link>
            </div>
            <div className={styles.profileDropdown}>
                {userObject ? (
                <>
                    <img className={styles.avatar} src={userObject.profilePhoto} alt="User Avatar" />
                    <span className={styles.username}>{userObject.email}</span>
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
