// src/components/Toast.jsx
import { useEffect } from 'react'

const COLORS = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-[#C2185B]',
}

export default function Toast({ message, type = 'success', onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3000)
        return () => clearTimeout(t)
    }, [onClose])

    return (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[9000] 
                     ${COLORS[type]} text-white px-6 py-3 rounded-full 
                     shadow-lg font-semibold toast-enter cursor-pointer`}
            onClick={onClose}>
            {message}
        </div>
    )
}
