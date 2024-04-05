export async function login(){
    let newUrl = process.env.NEXT_PUBLIC_API_URL + '/login/google'
    window.location.href = newUrl;
}

export async function logout(){
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/logout', {
            method: 'GET',
            credentials: 'include',
        });

        const data = await res.text();
        if (data === "done") {
            window.location.href = "/";
        }
    } catch (error) {
        console.error('Logout failed', error);
    }
}
