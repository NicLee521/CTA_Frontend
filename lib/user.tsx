import axios from 'axios';
import { AxiosResponse } from 'axios';

export async function login(){
    window.open(process.env.API_URL+ '/login/google', "_self")
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