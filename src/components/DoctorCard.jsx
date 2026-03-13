// src/components/DoctorCard.jsx
import { Star } from 'lucide-react'

export default function DoctorCard({ doctor, onBook }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden eve-card">
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
                            <h3 className="font-bold text-lg" style={{ color: '#6B1535' }}>{doctor.name}</h3>
                            <p className="text-sm font-semibold mb-1" style={{ color: '#C2185B' }}>{doctor.specialty}</p>
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="font-bold text-slate-700">{doctor.rating}</span>
                                <span>({doctor.reviews} تقييم)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl p-3 mb-4 space-y-2 text-sm" style={{ backgroundColor: '#FDE8EF' }}>
                    <div className="flex justify-between">
                        <span style={{ color: '#6B1535' }}>سعر الكشف:</span>
                        <span className="font-bold" style={{ color: '#6B1535' }}>{doctor.price} ج.م</span>
                    </div>
                    <div className="flex justify-between">
                        <span style={{ color: '#6B1535' }}>أيام العمل:</span>
                        <span className="font-semibold" style={{ color: '#6B1535' }}>{doctor.days}</span>
                    </div>
                </div>

                <button
                    onClick={() => onBook(doctor)}
                    className="w-full text-white font-bold py-3 rounded-xl transition"
                    style={{ backgroundColor: '#C2185B' }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                >
                    احجزي موعد الآن
                </button>
            </div>
        </div>
    )
}
