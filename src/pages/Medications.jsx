// src/pages/Medications.jsx
import { useState } from 'react'
import BundleGuard from '../components/BundleGuard'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Pill, AlertCircle, Clock, Calendar, Edit2, Trash2, Plus } from 'lucide-react'

export default function Medications({ setToast }) {
    const [meds, setMeds] = useLocalStorage('eve_meds', [])
    const [formOpen, setFormOpen] = useState(false)

    const initialForm = { name: '', timesPerDay: 1, durationMonths: 1, times: ['08:00'], notes: '' }
    const [form, setForm] = useState(initialForm)
    const [editingId, setEditingId] = useState(null)

    const handleTimesPerDayChange = (e) => {
        const val = parseInt(e.target.value) || 1
        const newTimes = Array(val).fill('08:00').map((t, i) => form.times[i] || '08:00')
        setForm({ ...form, timesPerDay: val, times: newTimes })
    }

    const handleTimeChange = (index, value) => {
        const newTimes = [...form.times]
        newTimes[index] = value
        setForm({ ...form, times: newTimes })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name) return

        if (editingId) {
            setMeds(meds.map(m => m.id === editingId ? { ...form, id: editingId, status: 'active' } : m))
            setToast('تم تحديث الدواء بنجاح')
        } else {
            setMeds([...meds, { ...form, id: Date.now(), status: 'active' }])
            setToast('تم إضافة الدواء بنجاح')
        }

        setForm(initialForm)
        setEditingId(null)
        setFormOpen(false)
    }

    const handleDelete = (id) => {
        if (window.confirm('هل أنتِ متأكدة من حذف هذا الدواء؟')) {
            setMeds(meds.filter(m => m.id !== id))
            setToast('تم الحذف', 'error')
        }
    }

    const handleEdit = (med) => {
        setForm(med)
        setEditingId(med.id)
        setFormOpen(true)
    }

    return (
        <BundleGuard required="plus">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: '#6B1535' }}>أدويتي</h1>
                        <p className="text-slate-500">تتبّعي أدويتك وسنقوم بتذكيرك في موعدها</p>
                    </div>
                    {!formOpen && (
                        <button
                            onClick={() => setFormOpen(true)}
                            className="text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition"
                            style={{ backgroundColor: '#C2185B' }}
                            onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                            onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                        >
                            <Plus size={20} /> أضيفي دواء
                        </button>
                    )}
                </div>

                {formOpen && (
                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 popup-enter eve-card">
                        <h2 className="text-xl font-bold mb-6" style={{ color: '#6B1535' }}>{editingId ? 'تعديل الدواء' : 'إضافة دواء جديد'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">اسم الدواء</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="مثال: بانادول"
                                        className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none"
                                        style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">مدة العلاج (بالشهور)</label>
                                    <input
                                        type="number"
                                        min="1" max="24"
                                        className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none"
                                        style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                        value={form.durationMonths}
                                        onChange={e => setForm({ ...form, durationMonths: parseInt(e.target.value) || 1 })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">عدد المرات يومياً</label>
                                <select
                                    className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none bg-white"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    value={form.timesPerDay}
                                    onChange={handleTimesPerDayChange}
                                >
                                    <option value={1}>مرة واحدة</option>
                                    <option value={2}>مرتين</option>
                                    <option value={3}>3 مرات</option>
                                    <option value={4}>4 مرات</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {form.times.map((time, i) => (
                                    <div key={i}>
                                        <label className="block text-xs text-slate-500 mb-1">الجرعة {i + 1}</label>
                                        <input
                                            type="time"
                                            required
                                            className="w-full rounded-xl px-4 py-2 text-center"
                                            style={{ border: '1px solid #F9D0DF' }}
                                            value={time}
                                            onChange={e => handleTimeChange(i, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">ملاحظات (اختياري)</label>
                                <textarea
                                    className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    placeholder="مثال: بعد الأكل"
                                    rows="2"
                                    value={form.notes}
                                    onChange={e => setForm({ ...form, notes: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button type="submit" className="flex-1 text-white font-bold py-3 rounded-xl transition"
                                    style={{ backgroundColor: '#C2185B' }}
                                    onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                                    onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                                >
                                    {editingId ? 'تحديث' : 'حفظ الدواء'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setFormOpen(false); setForm(initialForm); setEditingId(null); }}
                                    className="flex-1 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition"
                                    style={{ border: '1px solid #F9D0DF' }}
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {meds.length === 0 && !formOpen ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm flex flex-col items-center eve-card">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#FDE8EF', color: '#C2185B' }}>
                            <Pill size={48} />
                        </div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: '#6B1535' }}>لم تضيفي أي أدوية بعد 💊</h3>
                        <p className="text-slate-500 mb-6 max-w-sm">ابدأي بإضافة دوائك الآن لتلقي تنبيهات في موعدها وتجنب نسيان أي جرعة</p>
                        <button
                            onClick={() => setFormOpen(true)}
                            className="text-white px-8 py-3 rounded-full font-bold transition"
                            style={{ backgroundColor: '#C2185B' }}
                            onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                            onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                        >
                            أضيفي دواءك الأول
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {meds.map(med => (
                            <div key={med.id} className="bg-white rounded-2xl p-5 shadow-sm flex flex-col eve-card">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FDE8EF', color: '#C2185B' }}>
                                            <Pill size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg" style={{ color: '#6B1535' }}>{med.name}</h3>
                                            <p className="text-sm text-slate-500">{med.timesPerDay} مرات يومياً</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(med)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(med.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="p-3 rounded-xl flex items-center gap-2" style={{ backgroundColor: '#FFF5F8' }}>
                                        <Clock size={16} style={{ color: '#C2185B' }} />
                                        <span className="text-sm font-semibold text-slate-700">{med.times.join(' - ')}</span>
                                    </div>
                                    <div className="p-3 rounded-xl flex items-center gap-2" style={{ backgroundColor: '#FFF5F8' }}>
                                        <Calendar size={16} style={{ color: '#C2185B' }} />
                                        <span className="text-sm font-semibold text-slate-700">لمدة {med.durationMonths} شهر</span>
                                    </div>
                                </div>

                                {med.notes && (
                                    <div className="mt-auto bg-amber-50 text-amber-800 text-sm p-3 rounded-xl flex gap-2">
                                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                        <p>{med.notes}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </BundleGuard>
    )
}
