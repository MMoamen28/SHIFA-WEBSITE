// src/components/MedPopup.jsx
export default function MedPopup({ med, onDismiss, onSnooze }) {
    return (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-6 z-[9999] bg-white rounded-2xl 
                    shadow-2xl p-5 w-72 border border-teal-100 popup-enter">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">💊</span>
                <div>
                    <p className="font-bold text-gray-800">حان وقت دوائك</p>
                    <p className="text-teal-600 font-bold text-lg">{med.name}</p>
                    <p className="text-gray-400 text-sm">{med.time}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={onDismiss}
                    className="flex-1 bg-teal-600 text-white py-2 rounded-xl 
                     font-bold text-sm hover:bg-teal-700 transition"
                >
                    تم التناول ✓
                </button>
                <button
                    onClick={() => onSnooze(med)}
                    className="flex-1 border border-teal-600 text-teal-600 py-2 
                     rounded-xl font-bold text-sm hover:bg-teal-50 transition"
                >
                    بعد 10 دقائق
                </button>
            </div>
        </div>
    )
}
