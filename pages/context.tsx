import React, { createContext, useEffect, useState } from 'react'

export const myContext = createContext({});
export default function Context(props: any) {

    const [userObject, setUserObject] = useState<any>();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log(process.env.NEXT_PUBLIC_API_URL + '/user')
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user', {
                    method: 'GET',
                    credentials: 'include',
                });
                if(res.status === 401) {
                    return;
                }
    
                const data = await res.json();
                if (data) {
                    setUserObject(data);
                }
            } catch (e) {
                console.error('Error fetching user data', e);
            }
        };
    
        fetchUserData();
    }, []);
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}