// src/pages/WomensHealth.jsx
import { useState, useMemo } from 'react'
import BundleGuard from '../components/BundleGuard'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { addDays, formatDateAr, getPregnancyWeek, getTrimester, getMilestone } from '../utils/dateHelpers'
import { Calendar as CalendarIcon, Droplets, Baby, Activity, Info } from 'lucide-react'

export default function WomensHealth({ setToast }) {
    const [periodData, setPeriodData] = useLocalStorage('eve_period', { lastPeriodStart: null, cycleHistory: [] })
    const [pregnancyData, setPregnancyData] = useLocalStorage('eve_pregnancy', { lmpDate: null })

    const [activeTab, setActiveTab] = useState('period') // 'period' | 'pregnancy'

    // Date states for inputs
    const [tempPeriodStart, setTempPeriodStart] = useState('')
    const [tempLMPDate, setTempLMPDate] = useState('')

    const handleSavePeriod = () => {
        if (!tempPeriodStart) return
        setPeriodData({ ...periodData, lastPeriodStart: tempPeriodStart })
        setToast('تم حفظ موعد الدورة بنجاح', 'success')
    }

    const handleSavePregnancy = () => {
        if (!tempLMPDate) return
        setPregnancyData({ lmpDate: tempLMPDate })
        setToast('تم حفظ موعد الحمل بنجاح', 'success')
    }

    // --- PERIOD CALCULATIONS ---
    const periodCalc = useMemo(() => {
        if (!periodData.lastPeriodStart) return null
        const lps = periodData.lastPeriodStart
        return {
            start: lps,
            end: addDays(lps, 7),
            ovulationStart: addDays(lps, 10),
            ovulationEnd: addDays(lps, 15),
            nextPeriod: addDays(lps, 27)
        }
    }, [periodData.lastPeriodStart])

    // Calendar logic
    const calendarDays = useMemo(() => {
        if (!periodCalc) return []
        const startObj = new Date(periodCalc.start)
        // Find Sunday of the week containing startObj
        const dayOfWeek = startObj.getDay()
        const calendarStart = addDays(periodCalc.start, -dayOfWeek)

        const days = []
        for (let i = 0; i < 35; i++) {
            const currentObj = addDays(calendarStart, i)
            const dateStr = currentObj.toISOString().split('T')[0]
            const currentMs = currentObj.getTime()

            let type = 'normal'
            if (currentMs >= new Date(periodCalc.start).getTime() && currentMs <= periodCalc.end.getTime()) {
                type = 'period'
            } else if (currentMs >= periodCalc.ovulationStart.getTime() && currentMs <= periodCalc.ovulationEnd.getTime()) {
                type = 'ovulation'
            } else if (currentMs === periodCalc.nextPeriod.getTime()) {
                type = 'nextPeriod'
            }

            days.push({
                date: currentObj,
                dayNum: currentObj.getDate(),
                type
            })
        }
        return days
    }, [periodCalc])

    // --- PREGNANCY CALCULATIONS ---
    const pregCalc = useMemo(() => {
        if (!pregnancyData.lmpDate) return null
        const week = getPregnancyWeek(pregnancyData.lmpDate)
        const trimester = getTrimester(week)
        const milestone = getMilestone(week)
        const expectedDelivery = addDays(pregnancyData.lmpDate, 280) // 40 weeks

        return {
            week, trimester, milestone, expectedDelivery,
            progressPct: Math.min(Math.round((week / 40) * 100), 100)
        }
    }, [pregnancyData.lmpDate])


    return (
        <BundleGuard required="essential">
            <div className="max-w-4xl mx-auto px-4 py-8 relative">
                {/* Decorative female symbol */}
                <div style={{
                    position: 'absolute', top: '-20px', left: '20px',
                    fontSize: '80px', color: '#F5B8CE', opacity: 0.4,
                    pointerEvents: 'none', zIndex: 0
                }}>♀</div>

                <h1 className="text-3xl font-bold text-center mb-2 relative z-10" style={{ color: '#6B1535' }}>أدوات صحة المرأة <span style={{ color: '#C2185B' }}>🌸</span></h1>
                <p className="text-center mb-8 relative z-10" style={{ color: '#C2185B', fontStyle: 'italic' }}>أدوات متخصصة لتتبع الدورة الشهرية ومراحل الحمل بخصوصية تامة</p>

                {/* Tab switcher */}
                <div className="flex p-1 rounded-2xl mb-8 w-full max-w-sm mx-auto" style={{ backgroundColor: '#FDE8EF' }}>
                    <button
                        onClick={() => setActiveTab('period')}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'period' ? 'bg-white shadow-sm' : 'hover:text-slate-700'}`}
                        style={activeTab === 'period' ? { color: '#C2185B' } : { color: '#6B7280' }}
                    >
                        تتبع الدورة الشهرية
                    </button>
                    <button
                        onClick={() => setActiveTab('pregnancy')}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'pregnancy' ? 'bg-white shadow-sm' : 'hover:text-slate-700'}`}
                        style={activeTab === 'pregnancy' ? { color: '#C2185B' } : { color: '#6B7280' }}
                    >
                        حاسبة الحمل
                    </button>
                </div>

                {/* PERIOD CONTENT */}
                {activeTab === 'period' && (
                    <div className="space-y-6 popup-enter">
                        {/* Input card */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 items-center eve-card">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#FDE8EF', color: '#C2185B' }}>
                                <Droplets size={32} />
                            </div>
                            <div className="flex-1 text-center md:text-right">
                                <h2 className="text-xl font-bold mb-1" style={{ color: '#6B1535' }}>تحديث بيانات الدورة</h2>
                                <p className="text-sm text-slate-500 mb-4 md:mb-0">سجّلي أول يوم لآخر دورة شهرية وسنقوم بحساب التوقعات القادمة.</p>
                            </div>
                            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                                <input
                                    type="date"
                                    className="rounded-xl px-4 py-3 focus:outline-none w-full"
                                    style={{ border: '1px solid #F9D0DF' }}
                                    value={tempPeriodStart}
                                    onChange={e => setTempPeriodStart(e.target.value)}
                                />
                                <button
                                    onClick={handleSavePeriod}
                                    className="text-white font-bold px-6 py-3 rounded-xl transition shrink-0"
                                    style={{ backgroundColor: '#C2185B' }}
                                    onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                                    onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                                >
                                    تحديث
                                </button>
                            </div>
                        </div>

                        {periodCalc ? (
                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Stats cards */}
                                <div className="lg:col-span-1 space-y-4">
                                    <div className="bg-white rounded-3xl p-6 shadow-sm" style={{ borderTop: '4px solid #C2185B' }}>
                                        <p className="text-sm text-slate-500 font-semibold mb-1">موعد الدورة القادمة المتوقع</p>
                                        <p className="text-2xl font-bold text-slate-800">{formatDateAr(periodCalc.nextPeriod)}</p>
                                    </div>
                                    <div className="bg-white rounded-3xl p-6 shadow-sm" style={{ borderTop: '4px solid #8B1245' }}>
                                        <p className="text-sm text-slate-500 font-semibold mb-1">أيام الإباضة العالية الخصوبة</p>
                                        <p className="text-lg font-bold text-slate-800">{formatDateAr(periodCalc.ovulationStart)} - {formatDateAr(periodCalc.ovulationEnd)}</p>
                                    </div>

                                    <div className="p-5 rounded-2xl" style={{ backgroundColor: '#FDE8EF' }}>
                                        <h3 className="font-bold mb-2 flex gap-2 items-center" style={{ color: '#6B1535' }}><Info size={16} /> نصيحة لكِ</h3>
                                        <p className="text-sm leading-relaxed" style={{ color: '#8B1245' }}>
                                            خلال فترة دورتك، احرصي على شرب المشروبات الدافئة كالنعناع والبابونج لتقليل التقلصات.
                                        </p>
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm eve-card">
                                    <h3 className="font-bold text-lg mb-6 flex gap-2 items-center" style={{ color: '#6B1535' }}><CalendarIcon style={{ color: '#C2185B' }} /> التقويم الذكي</h3>

                                    {/* Legend */}
                                    <div className="flex flex-wrap gap-4 mb-6 text-xs font-semibold">
                                        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C2185B' }}></div> أيام الدورة</div>
                                        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8B1245' }}></div> نافذة الإباضة</div>
                                        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6B1535' }}></div> الدورة القادمة</div>
                                    </div>

                                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-bold text-slate-500 mb-2">
                                        <div>أحد</div><div>إثنين</div><div>ثلاثاء</div><div>أربعاء</div><div>خميس</div><div>جمعة</div><div>سبت</div>
                                    </div>

                                    <div className="grid grid-cols-7 gap-2">
                                        {calendarDays.map((d, i) => (
                                            <div
                                                key={i}
                                                className="aspect-square flex items-center justify-center rounded-xl font-semibold text-sm transition-all"
                                                style={
                                                    d.type === 'period' ? { backgroundColor: '#FDE8EF', color: '#C2185B', fontWeight: 700, border: '1px solid #F9D0DF' } :
                                                    d.type === 'ovulation' ? { backgroundColor: '#F5B8CE', color: '#6B1535', fontWeight: 700, border: '1px solid #C2185B' } :
                                                    d.type === 'nextPeriod' ? { backgroundColor: '#6B1535', color: 'white', fontWeight: 700, boxShadow: '0 2px 8px rgba(107,21,53,0.3)' } :
                                                    { backgroundColor: '#FAFAFA', color: '#6B7280' }
                                                }
                                            >
                                                {d.dayNum}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-3xl eve-card">
                                <span className="text-5xl text-slate-200 block mb-4">📅</span>
                                <p className="text-slate-500 font-semibold">أدخلي موعد آخر دورة لكتابة تقويمك الشخصي.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* PREGNANCY CONTENT */}
                {activeTab === 'pregnancy' && (
                    <div className="space-y-6 popup-enter">
                        <BundleGuard required="plus">
                            {/* Input card */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 items-center mb-8 eve-card">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#FDE8EF', color: '#C2185B' }}>
                                    <Baby size={32} />
                                </div>
                                <div className="flex-1 text-center md:text-right">
                                    <h2 className="text-xl font-bold mb-1" style={{ color: '#6B1535' }}>حاسبة الحمل وموعد الولادة</h2>
                                    <p className="text-sm text-slate-500 mb-4 md:mb-0">سجّلي أول يوم لآخر دورة شهرية لمعرفة موعد الولادة وتطور جنينك.</p>
                                </div>
                                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="date"
                                        className="rounded-xl px-4 py-3 focus:outline-none w-full"
                                        style={{ border: '1px solid #F9D0DF' }}
                                        value={tempLMPDate}
                                        onChange={e => setTempLMPDate(e.target.value)}
                                    />
                                    <button
                                        onClick={handleSavePregnancy}
                                        className="text-white font-bold px-6 py-3 rounded-xl transition shrink-0"
                                        style={{ backgroundColor: '#C2185B' }}
                                        onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                                        onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                                    >
                                        احسبي
                                    </button>
                                </div>
                            </div>

                            {pregCalc ? (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm text-center relative overflow-hidden eve-card">
                                        <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-10" style={{ backgroundColor: '#FDE8EF' }}></div>
                                        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-full -z-10" style={{ backgroundColor: '#FFF5F8' }}></div>

                                        <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6" style={{ backgroundColor: '#FDE8EF', color: '#6B1535' }}>
                                            {pregCalc.trimester}
                                        </div>

                                        <div className="mb-8">
                                            <p className="text-slate-500 font-semibold mb-2">أنتِ الآن في الأسبوع</p>
                                            <p className="text-6xl font-black text-slate-800">{pregCalc.week}</p>
                                            <p className="font-bold mt-2" style={{ color: '#C2185B' }}>من أصل 40 أسبوع مبروك! 🤰</p>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="max-w-md mx-auto mb-6">
                                            <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: '#FDE8EF' }}>
                                                <div
                                                    className="h-full transition-all duration-1000"
                                                    style={{ width: `${pregCalc.progressPct}%`, background: 'linear-gradient(to left, #F5B8CE, #C2185B)' }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                                                <span>البداية</span>
                                                <span>موعد الولادة المتوقع</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-white p-6 rounded-3xl shadow-sm flex items-start gap-4 eve-card">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#FDE8EF', color: '#C2185B' }}>
                                                <Activity size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold mb-1" style={{ color: '#6B1535' }}>تطور طفلك في هذا الأسبوع</h3>
                                                <p className="text-slate-600 leading-relaxed text-sm p-3 rounded-xl mt-3" style={{ backgroundColor: '#FFF5F8' }}>{pregCalc.milestone}</p>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-3xl shadow-md flex items-center justify-between text-white" style={{ background: 'linear-gradient(to bottom right, #C2185B, #6B1535)' }}>
                                            <div>
                                                <p className="font-medium mb-1" style={{ color: '#F5B8CE' }}>موعد الولادة المتوقع</p>
                                                <p className="text-2xl font-bold">{formatDateAr(pregCalc.expectedDelivery)}</p>
                                                <p className="text-sm mt-2 opacity-80" style={{ color: '#F5B8CE' }}>بإذن الله 🎉</p>
                                            </div>
                                            <Baby size={64} className="opacity-30" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-3xl eve-card">
                                    <span className="text-5xl block mb-4">🤰</span>
                                    <p className="text-slate-500 font-semibold">أدخلي موعد آخر دورة لمعرفة تفاصيل حملك.</p>
                                </div>
                            )}
                        </BundleGuard>
                    </div>
                )}
            </div>
        </BundleGuard>
    )
}
