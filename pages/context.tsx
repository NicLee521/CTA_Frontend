import React, { createContext, useEffect, useState, useCallback } from 'react';
import { authenticatedFetch } from '../lib/user';


export const myContext = createContext({});
export default function Context(props: any) {

    const [userObject, setUserObject] = useState<any>();

    const fetchUserData = useCallback(async () => {
        try {
            const res = await authenticatedFetch('/user', {
                method: 'GET',
                credentials: 'include',
            });
            if (res.status === 401) {
                setUserObject(undefined); // Optionally clear userObject on auth failure
                return;
            }
        
            const data = await res.json();
            if (data) {
                setUserObject(data);
            }
            } catch (e) {
                console.error('Error fetching user data', e);
            }
        }, []);
    
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return (
        <myContext.Provider value={{ userObject, refetchUserData: fetchUserData }}>{props.children}</myContext.Provider>
    )
}