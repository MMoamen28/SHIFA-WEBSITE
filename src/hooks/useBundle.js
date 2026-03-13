// src/hooks/useBundle.js
import { useLocalStorage } from './useLocalStorage'
import { hasAccess } from '../utils/bundleConfig'

export const useBundle = () => {
    const [bundle] = useLocalStorage('eve_bundle', 'essential')
    return {
        bundle,
        canAccess: (required) => hasAccess(bundle, required),
        isPlus: ['plus', 'premium', 'ultimate'].includes(bundle),
        isPremium: ['premium', 'ultimate'].includes(bundle),
        isUltimate: bundle === 'ultimate',
    }
}
