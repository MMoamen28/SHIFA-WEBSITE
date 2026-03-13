// src/components/AuthGuard.jsx
import { useAuth } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

export default function AuthGuard({ children }) {
    const { isLoggedIn } = useAuth()
    const location = useLocation()

    if (!isLoggedIn) {
        return <Navigate to="/signin" state={{ from: location }} replace />
    }
    return children
}
