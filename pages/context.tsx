import React, { createContext, useEffect, useState } from 'react'
import api from '../lib/api';
import { AxiosResponse } from 'axios';

export const myContext = createContext({});
export default function Context(props: any) {

    const [userObject, setUserObject] = useState<any>();

    useEffect(() => {
        api.get('/user', { withCredentials: true }).then((res: AxiosResponse) => {
            if (res.data) {
                setUserObject(res.data);
            }
        }).catch(e => {})
    }, [])
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}