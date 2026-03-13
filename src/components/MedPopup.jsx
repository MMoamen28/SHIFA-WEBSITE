// src/components/MedPopup.jsx
export default function MedPopup({ med, onDismiss, onSnooze }) {
    return (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-6 z-[9999] bg-white rounded-2xl 
                    shadow-2xl p-5 w-72 popup-enter" style={{ border: '1px solid #F9D0DF' }}>
            <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">💊</span>
                <div>
                    <p className="font-bold text-gray-800">حان وقت دوائك</p>
                    <p className="font-bold text-lg" style={{ color: '#C2185B' }}>{med.name}</p>
                    <p className="text-gray-400 text-sm">{med.time}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={onDismiss}
                    className="flex-1 text-white py-2 rounded-xl 
                     font-bold text-sm transition"
                    style={{ backgroundColor: '#C2185B' }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                >
                    تم التناول ✓
                </button>
                <button
                    onClick={() => onSnooze(med)}
                    className="flex-1 py-2 
                     rounded-xl font-bold text-sm transition"
                    style={{ border: '1px solid #C2185B', color: '#C2185B' }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#FDE8EF'}
                    onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                >
                    بعد 10 دقائق
                </button>
            </div>
        </div>
    )
}
