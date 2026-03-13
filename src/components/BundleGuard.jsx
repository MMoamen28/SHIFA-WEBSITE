// src/components/BundleGuard.jsx
import { useNavigate } from 'react-router-dom'
import { useBundle } from '../hooks/useBundle'

export default function BundleGuard({ required, children, inline = false }) {
    const { canAccess } = useBundle()
    const navigate = useNavigate()

    if (canAccess(required)) return children

    if (inline) {
        return (
            <div className="relative">
                <div className="locked-blur">{children}</div>
                <div className="absolute inset-0 flex flex-col items-center 
                        justify-center bg-white/60 rounded-xl z-10">
                    <span className="text-3xl mb-2">🔒</span>
                    <p className="text-gray-600 font-semibold mb-3">
                        متاح مع باقة {required === 'plus' ? 'بلس' :
                            required === 'premium' ? 'بريميوم' : 'الشاملة'}
                    </p>
                    <button
                        onClick={() => navigate(`/payment?bundle=${required}`)}
                        className="bg-teal-600 text-white px-5 py-2 rounded-full 
                       text-sm font-bold hover:bg-teal-700 transition"
                    >
                        ترقّي الآن
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center bg-white rounded-2xl shadow-lg p-10 max-w-md">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    هذه الميزة متاحة مع باقة بلس فما فوق
                </h2>
                <p className="text-gray-500 mb-6">تبدأ من 49 ج.م/شهر فقط</p>
                <button
                    onClick={() => navigate(`/payment?bundle=${required}`)}
                    className="bg-teal-600 text-white px-8 py-3 rounded-full 
                     font-bold text-lg hover:bg-teal-700 transition"
                >
                    ترقّي الآن 🚀
                </button>
            </div>
        </div>
    )
}
