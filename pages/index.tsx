import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Layout from './_layout';
import { useRouter } from 'next/router';
import { useAuth } from './context'; 


export default function Home() {
    const auth = useAuth();
    const cardImages = [
        '/CTA-cards/honor.png',
        '/CTA-cards/one.png',
        '/CTA-cards/hunter.png'
      ];
    const extendedCardImages = [...Array(10)].flatMap(() => cardImages);
    const router = useRouter();
    return (
        <Layout>
        <Head>
            <title>Call to Adventure Story Creator</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
            <div className={styles.background}>
            <div className={styles.collage}>
            <div className={styles.cardWrapper}>
                {extendedCardImages.map((image, index) => (
                <img 
                    key={index} 
                    src={image} 
                    alt={`Image ${index + 1}`} 
                    className={styles.card}
                />
                ))}
            </div>
            <div className={styles.cardWrapper}>
                {extendedCardImages.map((image, index) => (
                <img 
                    key={index + extendedCardImages.length}
                    src={image} 
                    alt={`Image ${index + 1}`} 
                    className={styles.card}
                />
                ))}
            </div>
            </div>
            </div>
            <div className={styles.contentOverlay}>
                <header className={styles.header}>
                    <h1>Welcome to Call to Adventure Character Story generator!</h1>
                    <p>Generate epic stories based on your character board!</p>
                </header>
                {!auth.loggedIn ? 
                    <main className={styles.main}>
                        <button className={styles.createStoryBtn} onClick={auth.login}>Log in</button>
                    </main> :
                    <main className={styles.main}>
                        <button className={styles.createStoryBtn} onClick={() => router.push('/create')}>Create Your Story</button>
                        {/* <button className={styles.exploreStoriesBtn}>Explore Shared Stories</button> */}
                    </main>
                }       
            </div>
        </div>
        </Layout>
    )
}