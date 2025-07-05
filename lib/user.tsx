
export async function login(){
    let newUrl = process.env.NEXT_PUBLIC_API_URL + '/login/google'
    window.location.href = newUrl;
}

export async function logout(){
    try {
        const res = await authenticatedFetch('/logout', {
            method: 'GET',
            credentials: 'include',
        });

        const data = await res.text();
        if (data === "done") {
            window.localStorage.removeItem('authToken');
            window.location.href = "/";
        }
    } catch (error) {
        console.error('Logout failed', error);
    }
}

export const getAuthToken = () => {
    return window.localStorage.getItem('authToken');
};
  
export const authenticatedFetch = (url: String, options: any) => {
    options ??= {};
    let baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
        throw new Error('Base url not set')
    }
    return fetch(baseUrl + url, {
        ...options,
        headers: {
            ...options.headers,
        },
    });
};
