import { AxiosResponse } from 'axios';
import api from '../lib/api'

export async function login(){
    let newUrl = process.env.NEXT_PUBLIC_API_URL + '/login/google'
    window.location.href = newUrl;
}

export async function logout(){
    api.get('/logout', {
        withCredentials: true
    }).then((res: AxiosResponse) => {
        if (res.data === "done") {
            window.location.href = "/"
        }
    })
}
