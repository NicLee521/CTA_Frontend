import { AxiosResponse } from 'axios';
import api from '../lib/api'

export async function login(){
    window.location.href = process.env.API_URL + '/login/google'
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