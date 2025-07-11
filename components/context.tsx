import {
  useRef,
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react"
import { createClient } from "@openauthjs/openauth/client"
import { authenticatedFetch } from "../lib/user"

const client = createClient({
    clientID: "cta-react",
    issuer: process.env.NEXT_PUBLIC_ISSUER ?? "http://auth.niclee.dev",
})


interface AuthContextType {
    user?: {
        id: string
        email: string
    }
    loaded: boolean
    loggedIn: boolean
    logout: () => void
    login: () => Promise<void>
    getToken: () => Promise<string | undefined>
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const initializing = useRef(true)
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const token = useRef<string | undefined>(undefined)
    const [userObj, setUserObj] = useState<{ id: string; email: string } | undefined>()

    useEffect(() => {
        const hash = new URLSearchParams(location.search.slice(1))
        const code = hash.get("code")
        const state = hash.get("state")

        if (!initializing.current) {
            return
        }

        initializing.current = false

        if (code && state) {
            callback(code, state)
            return
        }

        auth()
    }, [])

    async function auth() {
        const token = await refreshTokens()

        if (token) {
            await user()
        }

        setLoaded(true)
    }

    async function refreshTokens() {
        const refresh = localStorage.getItem("refresh")
        if (!refresh) return
        const next = await client.refresh(refresh, {
            access: token.current,
        })
        if (next.err) return
        if (!next.tokens) return token.current

        localStorage.setItem("refresh", next.tokens.refresh)
        token.current = next.tokens.access

        return next.tokens.access
    }

    async function getToken() {
        const token = await refreshTokens()

        if (!token) {
            await login()
            return
        }

        return token
    }

    async function login() {
        const { challenge, url } = await client.authorize(location.origin, "code", {
            pkce: true,
        })
        sessionStorage.setItem("challenge", JSON.stringify(challenge))
        location.href = url
    }

    async function callback(code: string, state: string) {
        const challenge = JSON.parse(sessionStorage.getItem("challenge")!)
        if (code) {
            if (state === challenge.state && challenge.verifier) {
                const exchanged = await client.exchange(
                code!,
                location.origin,
                challenge.verifier,
                )
                if (!exchanged.err) {
                    token.current = exchanged.tokens?.access
                    localStorage.setItem("refresh", exchanged.tokens.refresh)
                }
            }
            window.location.replace("/")
        }
    }

    async function user() {
        const res = await authenticatedFetch("/user", {
            method: "GET",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token.current}`,
            },
        })

        if (res.ok) {
            let user = await res.json()
            setUserObj(user.properties)
            setLoggedIn(true)
        }
    }

    function logout() {
        localStorage.removeItem("refresh")
        token.current = undefined

        window.location.replace("/")
    }

    return (
        <AuthContext.Provider
        value={{
            login,
            logout,
            user: userObj,
            loaded,
            loggedIn,
            getToken,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext)
}