// src/pages/Health.jsx
import { useState } from 'react'
import { ChevronDown, ChevronUp, Save, HeartPulse, Activity } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Health({ setToast }) {
    const [healthData, setHealthData] = useLocalStorage('shifa_health', { physical: {}, mental: {} })

    const [physicalOpen, setPhysicalOpen] = useState(true)
    const [mentalOpen, setMentalOpen] = useState(false)

    const [physical, setPhysical] = useState(healthData.physical || {})
    const [mental, setMental] = useState(healthData.mental || {})

    const handleSave = () => {
        setHealthData({ physical, mental, lastUpdated: new Date().toISOString() })
        setToast('تم حفظ بياناتك الصحية بنجاح', 'success')
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">صحتي</h1>
                    <p className="text-slate-500">سجل بياناتك الحيوية بانتظام لتتبع صحتك ومشاركتها مع طبيبك</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition w-full md:w-auto"
                >
                    <Save size={20} /> حفظ التغييرات
                </button>
            </div>

            <div className="space-y-6">
                {/* Physical Health */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <button
                        className="w-full flex items-center justify-between p-5 bg-teal-50/50 hover:bg-teal-50 transition"
                        onClick={() => setPhysicalOpen(!physicalOpen)}
                    >
                        <div className="flex items-center gap-3 text-teal-700">
                            <HeartPulse size={24} />
                            <h2 className="text-xl font-bold">المؤشرات الحيوية</h2>
                        </div>
                        {physicalOpen ? <ChevronUp className="text-teal-600" /> : <ChevronDown className="text-teal-600" />}
                    </button>

                    {physicalOpen && (
                        <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">الوزن (كجم)</label>
                                <input
                                    type="number"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                    value={physical.weight || ''}
                                    onChange={e => setPhysical({ ...physical, weight: e.target.value })}
                                    placeholder="مثال: 70"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">الطول (سم)</label>
                                <input
                                    type="number"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                    value={physical.height || ''}
                                    onChange={e => setPhysical({ ...physical, height: e.target.value })}
                                    placeholder="مثال: 175"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">ضغط الدم</label>
                                <input
                                    type="text"
                                    dir="ltr"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-teal-500 focus:outline-none text-right"
                                    value={physical.bloodPressure || ''}
                                    onChange={e => setPhysical({ ...physical, bloodPressure: e.target.value })}
                                    placeholder="120/80"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">مستوى السكر (صائم)</label>
                                <input
                                    type="number"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                    value={physical.bloodSugar || ''}
                                    onChange={e => setPhysical({ ...physical, bloodSugar: e.target.value })}
                                    placeholder="mg/dL"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">فصيلة الدم</label>
                                <select
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white font-sans"
                                    value={physical.bloodType || ''}
                                    onChange={e => setPhysical({ ...physical, bloodType: e.target.value })}
                                    dir="ltr"
                                >
                                    <option value="">اختر...</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">الأمراض المزمنة</label>
                                <input
                                    type="text"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                    value={physical.chronic || ''}
                                    onChange={e => setPhysical({ ...physical, chronic: e.target.value })}
                                    placeholder="مثال: ضغط، سكري (إن وجد)"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Mental Health */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <button
                        className="w-full flex items-center justify-between p-5 bg-purple-50/50 hover:bg-purple-50 transition"
                        onClick={() => setMentalOpen(!mentalOpen)}
                    >
                        <div className="flex items-center gap-3 text-purple-700">
                            <Activity size={24} />
                            <h2 className="text-xl font-bold">الصحة النفسية ونمط الحياة</h2>
                        </div>
                        {mentalOpen ? <ChevronUp className="text-purple-600" /> : <ChevronDown className="text-purple-600" />}
                    </button>

                    {mentalOpen && (
                        <div className="p-6 space-y-8">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="font-semibold text-slate-700">مستوى التوتر والقلق اليوم</label>
                                    <span className="text-purple-600 font-bold">{mental.stress || 5}/10</span>
                                </div>
                                <input
                                    type="range" min="1" max="10"
                                    className="w-full accent-purple-600 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                                    value={mental.stress || 5}
                                    onChange={e => setMental({ ...mental, stress: e.target.value })}
                                />
                                <div className="flex justify-between text-xs text-slate-400 mt-2">
                                    <span>منخفض جداً</span>
                                    <span>مرتفع جداً</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-4">جودة النوم البارحة</label>
                                <div className="flex gap-4">
                                    {['سيئة', 'متوسطة', 'جيدة', 'ممتازة'].map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => setMental({ ...mental, sleep: q })}
                                            className={`flex-1 py-3 rounded-xl border transition font-semibold ${mental.sleep === q
                                                    ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">ساعات النوم (تقريباً)</label>
                                <select
                                    className="w-full md:w-1/3 border border-slate-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-purple-500 focus:outline-none bg-white"
                                    value={mental.sleepHours || ''}
                                    onChange={e => setMental({ ...mental, sleepHours: e.target.value })}
                                >
                                    <option value="">اختر...</option>
                                    <option value="less_5">أقل من 5 ساعات</option>
                                    <option value="5_to_7">5 إلى 7 ساعات</option>
                                    <option value="7_to_9">7 إلى 9 ساعات</option>
                                    <option value="more_9">أكثر من 9 ساعات</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">ملاحظات عن مزاجك اليوم</label>
                                <textarea
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                                    rows="3"
                                    placeholder="كيف تشعر اليوم؟ هل هناك ما يزعجك؟"
                                    value={mental.notes || ''}
                                    onChange={e => setMental({ ...mental, notes: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
