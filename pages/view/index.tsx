import { myContext } from '../context'
import { useContext, useEffect, useState } from 'react';
import api from '../../lib/api';
import { AxiosResponse } from 'axios';
import Book from '../../components/book'
import Layout from '../_layout';



export default function Create() {
    const userObject = useContext(myContext) as any;
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!userObject) {
            setIsLoading(false);
            return;
        }
        api('/api/story', {
            method: 'GET',
            withCredentials: true 
        }).then((res: AxiosResponse) => {
            if(res.data) {
                setStories(res.data)
                setIsLoading(false);
            }
        });
    }, [userObject])

    return (
        <Layout>
        <main>
            <div>
            {isLoading ? (
                <div>Loading...</div>
                ) : stories.length > 0 ? (
                <Book pages={stories} />
                ) : (!userObject ? 
                    <div>You are not logged in</div> :
                    <div>No stories found.</div>
                )
            }
            </div>
        </main>
        </Layout>
    )
}