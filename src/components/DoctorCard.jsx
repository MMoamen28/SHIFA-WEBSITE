// src/components/DoctorCard.jsx
import { Star } from 'lucide-react'

export default function DoctorCard({ doctor, onBook }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4 items-center">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                            style={{ backgroundColor: doctor.color }}
                        >
                            {doctor.initials}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">{doctor.name}</h3>
                            <p className="text-teal-600 text-sm font-semibold mb-1">{doctor.specialty}</p>
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="font-bold text-slate-700">{doctor.rating}</span>
                                <span>({doctor.reviews} تقييم)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-500">سعر الكشف:</span>
                        <span className="font-bold text-slate-800">{doctor.price} ج.م</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">أيام العمل:</span>
                        <span className="font-semibold text-slate-700">{doctor.days}</span>
                    </div>
                </div>

                <button
                    onClick={() => onBook(doctor)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition"
                >
                    احجز موعد الآن
                </button>
            </div>
        </div>
    )
}
