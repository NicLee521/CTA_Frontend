import Link from 'next/link';
import styles from '../styles/navbar.module.css'
import { useAuth } from '../pages/context'; 

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
    const auth = useAuth();

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                <Link href="/">Home</Link>
                <Link href="/create">Create a Story</Link>
                <Link href="/view">View Your Stories</Link>
            </div>
            <div className={styles.profileDropdown}>
                {auth.loggedIn ? (
                <>
                    <span className={styles.username}>{auth.user?.email}</span>
                    <div className={styles.dropdownContent}>
                    <button onClick={auth.logout}>Logout</button>
                    </div>
                </>
                ) : (
                <button onClick={auth.login}>Login</button>
                )}
            </div>
        </nav>
    );
};
