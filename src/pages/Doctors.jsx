// src/pages/Doctors.jsx
import { useState, useMemo } from 'react'
import DoctorCard from '../components/DoctorCard'
import BookingModal from '../components/BookingModal'
import { Search, Filter, Stethoscope } from 'lucide-react'

const DOCTORS = [
    { id: 1, name: 'سارة المنصوري', specialty: 'نساء وتوليد', rating: 4.8, reviews: 142, price: 250, gender: 'female', days: 'السبت والاثنين والأربعاء', initials: 'سم', color: '#C2185B' },
    { id: 2, name: 'أحمد خليل', specialty: 'طب باطني', rating: 4.6, reviews: 98, price: 200, gender: 'male', days: 'الأحد والثلاثاء والخميس', initials: 'أخ', color: '#3B82F6' },
    { id: 3, name: 'منى العمري', specialty: 'نفسية', rating: 4.9, reviews: 215, price: 300, gender: 'female', days: 'الاثنين والأربعاء والجمعة', initials: 'مع', color: '#8B5CF6' },
    { id: 4, name: 'كريم حسن', specialty: 'قلب وأوعية', rating: 4.7, reviews: 176, price: 350, gender: 'male', days: 'السبت والثلاثاء', initials: 'كح', color: '#EF4444' },
    { id: 5, name: 'ريم الشمري', specialty: 'جلدية', rating: 4.5, reviews: 89, price: 220, gender: 'female', days: 'الأحد والأربعاء', initials: 'رش', color: '#F59E0B' },
    { id: 7, name: 'هند الجابري', specialty: 'غدد صماء', rating: 4.8, reviews: 123, price: 260, gender: 'female', days: 'السبت والثلاثاء والخميس', initials: 'هج', color: '#10B981' },
    { id: 8, name: 'يوسف مصطفى', specialty: 'أطفال', rating: 4.9, reviews: 304, price: 180, gender: 'male', days: 'كل أيام الأسبوع', initials: 'يم', color: '#6366F1' },
]

export default function Doctors({ setToast }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSpecialty, setSelectedSpecialty] = useState('')
    const [minRating, setMinRating] = useState(0)
    const [priceRange, setPriceRange] = useState(1000)

    const [selectedDoctor, setSelectedDoctor] = useState(null)

    const specialties = [...new Set(DOCTORS.map(d => d.specialty))]

    const filteredDoctors = useMemo(() => {
        return DOCTORS.filter(d => {
            const matchQuery = d.name.includes(searchQuery) || d.specialty.includes(searchQuery)
            const matchSpecialty = selectedSpecialty ? d.specialty === selectedSpecialty : true
            const matchRating = d.rating >= minRating
            const matchPrice = d.price <= priceRange

            return matchQuery && matchSpecialty && matchRating && matchPrice
        })
    }, [searchQuery, selectedSpecialty, minRating, priceRange])

    const handleBookingConfirm = (apptDetails) => {
        const existingAppts = JSON.parse(localStorage.getItem('eve_appts') || '[]')
        existingAppts.push(apptDetails)
        localStorage.setItem('eve_appts', JSON.stringify(existingAppts))

        setSelectedDoctor(null)
        setToast('تم تأكيد حجزك بنجاح! راجعي صفحة صحتي لمتابعة الموعد.', 'success')
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2" style={{ color: '#6B1535' }}>أطباء EVE</h1>
                <p className="text-slate-500">ابحثي واحجزي مع أفضل الأطباء في التخصصات المختلفة</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar Filters */}
                <div className="w-full lg:w-1/4 bg-white rounded-2xl shadow-sm p-6 sticky top-24 eve-card">
                    <div className="flex items-center gap-2 mb-6 pb-4" style={{ color: '#6B1535', borderBottom: '1px solid #F9D0DF' }}>
                        <Filter size={20} />
                        <h2 className="font-bold text-lg">تصفية النتائج</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">بحث بالاسم</label>
                            <div className="relative">
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full rounded-xl pr-10 pl-4 py-2 focus:outline-none"
                                    style={{ border: '1px solid #F9D0DF' }}
                                    placeholder="ابحثي..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">التخصص</label>
                            <select
                                className="w-full rounded-xl px-4 py-2 bg-white outline-none"
                                style={{ border: '1px solid #F9D0DF' }}
                                value={selectedSpecialty}
                                onChange={e => setSelectedSpecialty(e.target.value)}
                            >
                                <option value="">الكل</option>
                                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                التقييم (أعلى من {minRating}) ⭐️
                            </label>
                            <input
                                type="range"
                                min="0" max="5" step="0.5"
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none"
                                style={{ accentColor: '#C2185B' }}
                                value={minRating}
                                onChange={e => setMinRating(parseFloat(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                أقصى سعر للكشف: <span className="font-bold" style={{ color: '#C2185B' }}>{priceRange} ج.م</span>
                            </label>
                            <input
                                type="range"
                                min="100" max="1000" step="50"
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none"
                                style={{ accentColor: '#C2185B' }}
                                value={priceRange}
                                onChange={e => setPriceRange(parseInt(e.target.value))}
                            />
                        </div>

                        <button
                            onClick={() => {
                                setSearchQuery(''); setSelectedSpecialty(''); setMinRating(0); setPriceRange(1000);
                            }}
                            className="w-full py-2 text-sm text-slate-500 hover:text-slate-800 font-bold underline mt-4"
                        >
                            إعادة ضبط الفلاتر
                        </button>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="w-full lg:w-3/4">
                    <div className="mb-4 text-slate-500 font-semibold">
                        نطابق لك {filteredDoctors.length} طبيب/ة يطابق بحثك
                    </div>

                    {filteredDoctors.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredDoctors.map(doctor => (
                                <DoctorCard
                                    key={doctor.id}
                                    doctor={doctor}
                                    onBook={setSelectedDoctor}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center mt-8 eve-card">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4" style={{ backgroundColor: '#FDE8EF' }}>
                                <Search size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#6B1535' }}>لا توجد نتائج</h3>
                            <p className="text-slate-500">حاولي تغيير معايير البحث أو التخصص للوصول إلى الطبيب/ة المناسب/ة.</p>
                        </div>
                    )}
                </div>
            </div>

            {selectedDoctor && (
                <BookingModal
                    doctor={selectedDoctor}
                    onClose={() => setSelectedDoctor(null)}
                    onConfirm={handleBookingConfirm}
                />
            )}
        </div>
    )
}
