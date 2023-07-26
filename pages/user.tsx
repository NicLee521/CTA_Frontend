import axios from 'axios';
import { AxiosResponse } from 'axios';

export async function login(){
    window.open("http://localhost:8080/login/google", "_self")
}

export async function logout(){
    axios.get("http://localhost:8080/logout", {
        withCredentials: true
    }).then((res: AxiosResponse) => {
        if (res.data === "done") {
            window.location.href = "/"
        }
    })
}