// src/hooks/useBundle.js
import { useAuth } from '../context/AuthContext'
import { hasAccess } from '../utils/bundleConfig'

export const useBundle = () => {
    const { currentUser } = useAuth()
    const storedBundle = JSON.parse(localStorage.getItem('eve_bundle') || '"essential"')
    const bundle = currentUser?.bundle || storedBundle
    return {
        bundle,
        canAccess: (required) => hasAccess(bundle, required),
        isPlus: ['plus', 'premium', 'ultimate'].includes(bundle),
        isPremium: ['premium', 'ultimate'].includes(bundle),
        isUltimate: bundle === 'ultimate',
    }
}
