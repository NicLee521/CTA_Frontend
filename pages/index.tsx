import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { myContext } from './context'
import { useContext } from 'react';
import {login, logout} from './user'
import Layout from './_layout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const userObject = useContext(myContext);
  return (
    <Layout>
      <Head>
        <title>Call to Adventure Story Creator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
            <h1 className={inter.className}>
                This is the home page
            </h1>
            <button onClick={login}>
                Login
            </button>
            <button onClick={logout}>
                Logout
            </button>
            <button onClick={() => user(userObject)}>
                User
            </button>
        </div>
      </main>
    </Layout>
  )
}

const user = (user: any) =>{
    console.log(user)
}