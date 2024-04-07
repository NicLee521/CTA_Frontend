import { myContext } from '../context'
import { useContext, useEffect, useState } from 'react';
import Book from '../../components/book'
import Layout from '../_layout';
import { authenticatedFetch } from '../../lib/user';


export default function Create() {
    const {userObject} = useContext(myContext) as any;
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userObject) {
            setIsLoading(false);
            return;
        }
    
        const fetchStories = async () => {
            try {
                const res = await authenticatedFetch('/api/story', {
                    method: 'GET',
                    credentials: 'include',
                });
    
                const data = await res.json(); 
                if (data) {
                    setStories(data);
                }
            } catch (error) {
                console.error('Failed to fetch stories', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchStories();
    }, [userObject]);

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