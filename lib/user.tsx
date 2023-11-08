import axios from 'axios';
import { AxiosResponse } from 'axios';

export async function login(){
    window.location.href = process.env.API_URL + '/login/google'
}

export async function logout(){
    axios.get(process.env.API_URL+ '/logout', {
        withCredentials: true
    }).then((res: AxiosResponse) => {
        if (res.data === "done") {
            window.location.href = "/"
        }
    })
}