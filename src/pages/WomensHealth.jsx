// src/pages/WomensHealth.jsx
import { useState, useMemo } from 'react'
import BundleGuard from '../components/BundleGuard'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { addDays, formatDateAr, getPregnancyWeek, getTrimester, getMilestone } from '../utils/dateHelpers'
import { Calendar as CalendarIcon, Droplets, Baby, Activity, Info } from 'lucide-react'

export default function WomensHealth({ setToast }) {
    const [periodData, setPeriodData] = useLocalStorage('shifa_period', { lastPeriodStart: null, cycleHistory: [] })
    const [pregnancyData, setPregnancyData] = useLocalStorage('shifa_pregnancy', { lmpDate: null })

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
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">أدوات صحة المرأة <span className="text-rose-500">🌸</span></h1>
                <p className="text-slate-500 text-center mb-8">أدوات متخصصة لتتبع الدورة الشهرية ومراحل الحمل بخصوصية تامة</p>

                {/* Tab switcher */}
                <div className="flex bg-slate-100 p-1 rounded-2xl mb-8 w-full max-w-sm mx-auto">
                    <button
                        onClick={() => setActiveTab('period')}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'period' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        تتبع الدورة الشهرية
                    </button>
                    <button
                        onClick={() => setActiveTab('pregnancy')}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'pregnancy' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        حاسبة الحمل
                    </button>
                </div>

                {/* PERIOD CONTENT */}
                {activeTab === 'period' && (
                    <div className="space-y-6 popup-enter">
                        {/* Input card */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-col md:flex-row gap-4 items-center">
                            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                                <Droplets size={32} />
                            </div>
                            <div className="flex-1 text-center md:text-right">
                                <h2 className="text-xl font-bold text-slate-800 mb-1">تحديث بيانات الدورة</h2>
                                <p className="text-sm text-slate-500 mb-4 md:mb-0">سجلي أول يوم لآخر دورة شهرية وسنقوم بحساب التوقعات القادمة.</p>
                            </div>
                            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                                <input
                                    type="date"
                                    className="border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 w-full"
                                    value={tempPeriodStart}
                                    onChange={e => setTempPeriodStart(e.target.value)}
                                />
                                <button
                                    onClick={handleSavePeriod}
                                    className="bg-rose-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-rose-600 transition shrink-0"
                                >
                                    تحديث
                                </button>
                            </div>
                        </div>

                        {periodCalc ? (
                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Stats cards */}
                                <div className="lg:col-span-1 space-y-4">
                                    <div className="bg-white rounded-3xl p-6 border-t-4 border-rose-500 shadow-sm">
                                        <p className="text-sm text-slate-500 font-semibold mb-1">موعد الدورة القادمة المتوقع</p>
                                        <p className="text-2xl font-bold text-slate-800">{formatDateAr(periodCalc.nextPeriod)}</p>
                                    </div>
                                    <div className="bg-white rounded-3xl p-6 border-t-4 border-purple-500 shadow-sm">
                                        <p className="text-sm text-slate-500 font-semibold mb-1">أيام الإباضة العالية الخصوبة</p>
                                        <p className="text-lg font-bold text-slate-800">{formatDateAr(periodCalc.ovulationStart)} - {formatDateAr(periodCalc.ovulationEnd)}</p>
                                    </div>

                                    <div className="bg-rose-50 p-5 rounded-2xl">
                                        <h3 className="font-bold text-rose-800 mb-2 flex gap-2 items-center"><Info size={16} /> نصيحة لكِ</h3>
                                        <p className="text-sm text-rose-700 leading-relaxed">
                                            خلال فترة دورتك، احرصي على شرب المشروبات الدافئة كالنعناع والبابونج لتقليل التقلصات.
                                        </p>
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                                    <h3 className="font-bold text-lg text-slate-800 mb-6 flex gap-2 items-center"><CalendarIcon className="text-slate-400" /> التقويم الذكي</h3>

                                    {/* Legend */}
                                    <div className="flex flex-wrap gap-4 mb-6 text-xs font-semibold">
                                        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-rose-500 rounded-full"></div> أيام الدورة</div>
                                        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-purple-500 rounded-full"></div> نافذة الإباضة</div>
                                        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> الدورة القادمة</div>
                                    </div>

                                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-bold text-slate-500 mb-2">
                                        <div>أحد</div><div>إثنين</div><div>ثلاثاء</div><div>أربعاء</div><div>خميس</div><div>جمعة</div><div>سبت</div>
                                    </div>

                                    <div className="grid grid-cols-7 gap-2">
                                        {calendarDays.map((d, i) => (
                                            <div
                                                key={i}
                                                className={`aspect-square flex items-center justify-center rounded-xl font-semibold text-sm transition-all
                          ${d.type === 'normal' ? 'bg-slate-50 text-slate-600' : ''}
                          ${d.type === 'period' ? 'bg-rose-100 text-rose-700 font-bold border-rose-200 border' : ''}
                          ${d.type === 'ovulation' ? 'bg-purple-100 text-purple-700 font-bold border-purple-200 border' : ''}
                          ${d.type === 'nextPeriod' ? 'bg-blue-500 text-white font-bold shadow-md' : ''}
                        `}
                                            >
                                                {d.dayNum}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
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
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col md:flex-row gap-4 items-center mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                                    <Baby size={32} />
                                </div>
                                <div className="flex-1 text-center md:text-right">
                                    <h2 className="text-xl font-bold text-slate-800 mb-1">حاسبة الحمل وموعد الولادة</h2>
                                    <p className="text-sm text-slate-500 mb-4 md:mb-0">سجلي أول يوم لآخر دورة شهرية لمعرفة موعد الولادة وتطور جنينك.</p>
                                </div>
                                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="date"
                                        className="border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 w-full"
                                        value={tempLMPDate}
                                        onChange={e => setTempLMPDate(e.target.value)}
                                    />
                                    <button
                                        onClick={handleSavePregnancy}
                                        className="bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-600 transition shrink-0"
                                    >
                                        احسبي
                                    </button>
                                </div>
                            </div>

                            {pregCalc ? (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10"></div>
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-50 rounded-tr-full -z-10"></div>

                                        <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-6">
                                            {pregCalc.trimester}
                                        </div>

                                        <div className="mb-8">
                                            <p className="text-slate-500 font-semibold mb-2">أنتِ الآن في الأسبوع</p>
                                            <p className="text-6xl font-black text-slate-800">{pregCalc.week}</p>
                                            <p className="text-emerald-600 font-bold mt-2">من أصل 40 أسبوع مبروك! 🤰</p>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="max-w-md mx-auto mb-6">
                                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 transition-all duration-1000"
                                                    style={{ width: `${pregCalc.progressPct}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                                                <span>البداية</span>
                                                <span>موعد الولادة المتوقع</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
                                            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                                                <Activity size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800 mb-1">تطور طفلك في هذا الأسبوع</h3>
                                                <p className="text-slate-600 leading-relaxed text-sm bg-amber-50/50 p-3 rounded-xl mt-3">{pregCalc.milestone}</p>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-3xl shadow-md flex items-center justify-between text-white">
                                            <div>
                                                <p className="text-emerald-100 font-medium mb-1">موعد الولادة المتوقع</p>
                                                <p className="text-2xl font-bold">{formatDateAr(pregCalc.expectedDelivery)}</p>
                                                <p className="text-sm text-emerald-100 mt-2 opacity-80">بإذن الله 🎉</p>
                                            </div>
                                            <Baby size={64} className="opacity-30" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
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
