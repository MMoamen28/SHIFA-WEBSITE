// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch { return initialValue }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
            if (process.env.NODE_ENV === 'development') {
                console.log(`[shifa] ${key} updated:`, value)
            }
        }
        catch (e) { console.error('localStorage error:', e) }
    }, [key, value])

    return [value, setValue]
}
