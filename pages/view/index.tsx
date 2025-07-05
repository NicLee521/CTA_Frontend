import {useEffect, useState } from 'react';
import Book from '../../components/book'
import Layout from '../_layout'; 
import { authenticatedFetch } from '../../lib/user';
import { useAuth } from '../context'; 

export default function Create() {
    const auth = useAuth();
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!auth.loggedIn) {
            setIsLoading(false);
            return;
        }
    
        const fetchStories = async () => {
            try {
                const res = await authenticatedFetch('/api/story', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${await auth.getToken()}`,
                    },
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
    }, [auth.loggedIn]);

    return (
        <Layout>
        <main>
            <div>
            {isLoading ? (
                <div>Loading...</div>
                ) : stories.length > 0 ? (
                <Book pages={stories} />
                ) : (!auth.loggedIn ? 
                    <div>You are not logged in</div> :
                    <div>No stories found.</div>
                )
            }
            </div>
        </main>
        </Layout>
    )
}