// src/pages/Health.jsx
import { useState } from 'react'
import { ChevronDown, ChevronUp, Save, HeartPulse, Activity } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Health({ setToast }) {
    const [healthData, setHealthData] = useLocalStorage('eve_health', { physical: {}, mental: {} })

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6" style={{ borderBottom: '1px solid #F9D0DF' }}>
                <div>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#6B1535' }}>صحتي</h1>
                    <p className="text-slate-500">سجّلي بياناتك الحيوية بانتظام لتتبع صحتك ومشاركتها مع طبيبتك</p>
                </div>
                <button
                    onClick={handleSave}
                    className="text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition w-full md:w-auto"
                    style={{ backgroundColor: '#C2185B' }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                >
                    <Save size={20} /> حفظ التغييرات
                </button>
            </div>

            <div className="space-y-6">
                {/* Physical Health */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden eve-card">
                    <button
                        className="w-full flex items-center justify-between p-5 transition"
                        style={{ backgroundColor: '#FFF5F8' }}
                        onClick={() => setPhysicalOpen(!physicalOpen)}
                    >
                        <div className="flex items-center gap-3" style={{ color: '#6B1535' }}>
                            <HeartPulse size={24} />
                            <h2 className="text-xl font-bold">المؤشرات الحيوية</h2>
                        </div>
                        {physicalOpen ? <ChevronUp style={{ color: '#C2185B' }} /> : <ChevronDown style={{ color: '#C2185B' }} />}
                    </button>

                    {physicalOpen && (
                        <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">الوزن (كجم)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    value={physical.weight || ''}
                                    onChange={e => setPhysical({ ...physical, weight: e.target.value })}
                                    placeholder="مثال: 70"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">الطول (سم)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
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
                                    className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none text-right"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    value={physical.bloodPressure || ''}
                                    onChange={e => setPhysical({ ...physical, bloodPressure: e.target.value })}
                                    placeholder="120/80"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">مستوى السكر (صائم)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    value={physical.bloodSugar || ''}
                                    onChange={e => setPhysical({ ...physical, bloodSugar: e.target.value })}
                                    placeholder="mg/dL"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">فصيلة الدم</label>
                                <select
                                    className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none bg-white font-sans"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    value={physical.bloodType || ''}
                                    onChange={e => setPhysical({ ...physical, bloodType: e.target.value })}
                                    dir="ltr"
                                >
                                    <option value="">اختاري...</option>
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
                                    className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    value={physical.chronic || ''}
                                    onChange={e => setPhysical({ ...physical, chronic: e.target.value })}
                                    placeholder="مثال: ضغط، سكري (إن وجد)"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Mental Health */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden eve-card">
                    <button
                        className="w-full flex items-center justify-between p-5 transition"
                        style={{ backgroundColor: '#FFF5F8' }}
                        onClick={() => setMentalOpen(!mentalOpen)}
                    >
                        <div className="flex items-center gap-3" style={{ color: '#6B1535' }}>
                            <Activity size={24} />
                            <h2 className="text-xl font-bold">الصحة النفسية ونمط الحياة</h2>
                        </div>
                        {mentalOpen ? <ChevronUp style={{ color: '#C2185B' }} /> : <ChevronDown style={{ color: '#C2185B' }} />}
                    </button>

                    {mentalOpen && (
                        <div className="p-6 space-y-8">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="font-semibold text-slate-700">مستوى التوتر والقلق اليوم</label>
                                    <span className="font-bold" style={{ color: '#C2185B' }}>{mental.stress || 5}/10</span>
                                </div>
                                <input
                                    type="range" min="1" max="10"
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                    style={{ accentColor: '#C2185B', backgroundColor: '#FDE8EF' }}
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
                                            className={`flex-1 py-3 rounded-xl border transition font-semibold`}
                                            style={mental.sleep === q
                                                ? { backgroundColor: '#C2185B', color: 'white', borderColor: '#C2185B', boxShadow: '0 2px 8px rgba(194,24,91,0.3)' }
                                                : { backgroundColor: 'white', color: '#6B7280', borderColor: '#F9D0DF' }
                                            }
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">ساعات النوم (تقريباً)</label>
                                <select
                                    className="w-full md:w-1/3 rounded-xl px-4 py-3 focus:ring-1 focus:outline-none bg-white"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    value={mental.sleepHours || ''}
                                    onChange={e => setMental({ ...mental, sleepHours: e.target.value })}
                                >
                                    <option value="">اختاري...</option>
                                    <option value="less_5">أقل من 5 ساعات</option>
                                    <option value="5_to_7">5 إلى 7 ساعات</option>
                                    <option value="7_to_9">7 إلى 9 ساعات</option>
                                    <option value="more_9">أكثر من 9 ساعات</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">ملاحظات عن مزاجك اليوم</label>
                                <textarea
                                    className="w-full rounded-xl px-4 py-3 focus:ring-1 focus:outline-none"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    rows="3"
                                    placeholder="كيف تشعرين اليوم؟ هل هناك ما يزعجك؟"
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
