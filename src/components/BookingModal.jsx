// src/components/BookingModal.jsx
import { useState } from 'react'

export default function BookingModal({ doctor, onClose, onConfirm }) {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!date || !time) return
        onConfirm({
            id: Date.now(),
            doctorName: doctor.name,
            specialty: doctor.specialty,
            dateTime: `${date}T${time}`,
            status: 'confirmed'
        })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden popup-enter">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-xl text-slate-800">تأكيد الحجز</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">&times;</button>
                </div>

                <div className="p-5">
                    <div className="flex gap-4 items-center mb-6">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: doctor.color }}
                        >
                            {doctor.initials}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">د. {doctor.name}</p>
                            <p className="text-slate-500 text-sm">{doctor.specialty}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">يوم الحجز</label>
                            <input
                                type="date"
                                required
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">الوقت</label>
                            <input
                                type="time"
                                required
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition"
                            >
                                تأكيد الحجز ({doctor.price} ج.م)
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
