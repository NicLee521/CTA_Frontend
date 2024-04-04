import { AxiosResponse } from 'axios';
import axios from 'axios'

export async function login(){
    let newUrl = process.env.NEXT_PUBLIC_API_URL + '/login/google'
    window.location.href = newUrl;
}

export async function logout(){
    axios.get( process.env.NEXT_PUBLIC_API_URL + '/logout', {
        withCredentials: true
    }).then((res: AxiosResponse) => {
        if (res.data === "done") {
            window.location.href = "/"
        }
    })
}
