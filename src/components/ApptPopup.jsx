// src/components/ApptPopup.jsx
import { useNavigate } from 'react-router-dom'

export default function ApptPopup({ appt, onDismiss }) {
    const navigate = useNavigate()
    return (
        <div className="fixed bottom-20 md:bottom-6 right-1/2 translate-x-1/2 md:translate-x-0 md:right-6 z-[9999] bg-white rounded-2xl 
                    shadow-2xl p-5 w-72 border border-blue-100 popup-enter">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🗓️</span>
                <div>
                    <p className="font-bold text-gray-800">موعدك على وشك!</p>
                    <p className="text-blue-600 font-bold">د. {appt.doctorName}</p>
                    <p className="text-gray-400 text-sm">بعد ساعة</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => { navigate('/doctors'); onDismiss() }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-xl 
                     font-bold text-sm hover:bg-blue-700 transition"
                >
                    عرض التفاصيل
                </button>
                <button
                    onClick={onDismiss}
                    className="flex-1 border border-gray-300 text-gray-500 py-2 
                     rounded-xl font-bold text-sm hover:bg-gray-50 transition"
                >
                    إغلاق
                </button>
            </div>
        </div>
    )
}
