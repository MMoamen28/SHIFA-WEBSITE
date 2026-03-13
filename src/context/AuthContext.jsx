// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const session = localStorage.getItem('eve_session')
        if (session) {
            const parsedSession = JSON.parse(session)
            const users = JSON.parse(localStorage.getItem('eve_users') || '[]')
            const user = users.find(u => u.email === parsedSession.email)
            if (user) {
                setCurrentUser(user)
                setIsLoggedIn(true)
            }
        }
        setLoading(false)
    }, [])

    const signUp = async (name, email, password, age) => {
        const users = JSON.parse(localStorage.getItem('eve_users') || '[]')
        
        if (users.some(u => u.email === email)) {
            throw new Error('هذا البريد الإلكتروني مسجل بالفعل — يرجى تسجيل الدخول')
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            age,
            createdAt: new Date().toISOString()
        }

        users.push(newUser)
        localStorage.setItem('eve_users', JSON.stringify(users))

        const session = {
            userId: newUser.id,
            email: newUser.email,
            name: newUser.name,
            loggedInAt: new Date().toISOString()
        }
        localStorage.setItem('eve_session', JSON.stringify(session))

        setCurrentUser(newUser)
        setIsLoggedIn(true)
        return { success: true }
    }

    const signIn = async (email, password) => {
        const users = JSON.parse(localStorage.getItem('eve_users') || '[]')
        const user = users.find(u => u.email === email)

        if (!user || user.password !== password) {
            throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
        }

        const session = {
            userId: user.id,
            email: user.email,
            name: user.name,
            loggedInAt: new Date().toISOString()
        }
        localStorage.setItem('eve_session', JSON.stringify(session))

        setCurrentUser(user)
        setIsLoggedIn(true)
        return { success: true }
    }

    const signOut = () => {
        localStorage.removeItem('eve_session')
        setCurrentUser(null)
        setIsLoggedIn(false)
        window.location.href = '/signin'
    }

    const updateUser = (data) => {
        if (!currentUser) return
        
        const updatedUser = { ...currentUser, ...data }
        
        const users = JSON.parse(localStorage.getItem('eve_users') || '[]')
        const userIndex = users.findIndex(u => u.email === currentUser.email)
        
        if (userIndex !== -1) {
            users[userIndex] = updatedUser
            localStorage.setItem('eve_users', JSON.stringify(users))
            setCurrentUser(updatedUser)
            
            if (data.name) {
                const session = JSON.parse(localStorage.getItem('eve_session') || '{}')
                session.name = data.name
                localStorage.setItem('eve_session', JSON.stringify(session))
            }
        }
    }

    const value = {
        currentUser,
        isLoggedIn,
        signUp,
        signIn,
        signOut,
        updateUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
