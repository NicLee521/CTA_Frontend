import { myContext } from '../context'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import Book from '../../components/book'
import Layout from '../_layout';



export default function Create() {
    const userObject = useContext(myContext) as any;
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios("http://localhost:8080/api/story", {
            method: 'GET',
            withCredentials: true 
        }).then((res: AxiosResponse) => {
            if(res.data) {
                setStories(res.data)
                setIsLoading(false);
            }
        });
    }, [])

    return (
        <Layout>
        <main >
            <div style={{ maxHeight: '92vh' }}>
            {isLoading ? (
                <div>Loading...</div>
                ) : stories.length > 0 ? (
                <Book pages={stories} />
                ) : (
                <div>No stories found.</div>
            )}
            </div>
        </main>
        </Layout>
    )
}