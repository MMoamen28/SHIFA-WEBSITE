// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom'
import { Stethoscope, Pill, HeartPulse, Video, ArrowLeft, Star, Heart } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { BUNDLES, BUNDLE_ORDER } from '../utils/bundleConfig'

export default function Home({ setToast }) {
    const navigate = useNavigate()
    const [user, setUser] = useLocalStorage('shifa_user', { name: 'ضيف', gender: null })
    const bundlesList = BUNDLE_ORDER.map(k => ({ id: k, ...BUNDLES[k] }))

    const handleGenderSelect = (gender) => {
        setUser({ ...user, gender })
        setToast('تم حفظ تفضيلاتك بنجاح', 'success')
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* SECTION 1 — Hero */}
            <section className="relative bg-gradient-to-l from-teal-600 to-emerald-500 text-white min-h-[70vh] flex items-center pt-16 pb-32">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            رعايتك الصحية <br /> <span className="text-teal-200">في مكان واحد</span>
                        </h1>
                        <p className="text-lg md:text-xl text-teal-50 mb-8 opacity-90 max-w-lg">
                            احجز موعدك مع نخبة من الأطباء، تتبع مؤشراتك الحيوية، ولا تفوت أي جرعة دواء مع منصة شفا.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/doctors')}
                                className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-50 shadow-lg transition"
                            >
                                احجز طبيبك الآن
                            </button>
                            <button
                                onClick={() => navigate('/payment')}
                                className="bg-teal-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-800 shadow-lg transition border border-teal-500"
                            >
                                اكتشف الباقات
                            </button>
                        </div>
                    </div>
                    <div className="hidden md:flex justify-end">
                        <div className="relative w-80 h-80">
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl align-middle m-auto animate-pulse"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-300 to-emerald-300 rounded-full opacity-30 shadow-2xl"></div>
                            {/* Abstract decorative elements */}
                            <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                    <Star size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">4.9/5</p>
                                    <p className="text-xs text-slate-500">تقييم المرضى</p>
                                </div>
                            </div>
                            <div className="absolute bottom-10 left-0 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                                    <HeartPulse size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">+50,000</p>
                                    <p className="text-xs text-slate-500">مريض تمت معالجته</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave SVG */}
                <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full">
                    <path fill="#F8FAFC" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
                </svg>
            </section>

            {/* SECTION 2 — Gender Selection */}
            <section className="py-16 max-w-4xl mx-auto px-6 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                    <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">كيف يمكننا مساعدتك بشكل أفضل؟</h2>
                    <p className="text-center text-slate-500 mb-8">اختر الجنس لتخصيص تجربتك والمحتوى الطبي لك</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Male Card */}
                        <button
                            onClick={() => handleGenderSelect('male')}
                            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${user.gender === 'male'
                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                    : 'border-slate-100 hover:border-blue-200 hover:bg-blue-50/50'
                                }`}
                        >
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl">👨</div>
                            <h3 className={`font-bold text-xl ${user.gender === 'male' ? 'text-blue-700' : 'text-slate-700'}`}>ذكر</h3>
                        </button>

                        {/* Female Card */}
                        <button
                            onClick={() => handleGenderSelect('female')}
                            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${user.gender === 'female'
                                    ? 'border-rose-500 bg-rose-50 shadow-md'
                                    : 'border-slate-100 hover:border-rose-200 hover:bg-rose-50/50'
                                }`}
                        >
                            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-4xl">👩</div>
                            <div className="text-center">
                                <h3 className={`font-bold text-xl ${user.gender === 'female' ? 'text-rose-700' : 'text-slate-700'}`}>أنثى</h3>
                                {user.gender === 'female' && (
                                    <p className="text-xs text-rose-500 mt-2 font-bold flex items-center justify-center gap-1">
                                        <Heart size={12} fill="currentColor" /> تفعيل أدوات صحة المرأة
                                    </p>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 3 — Services */}
            <section className="py-16 max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">خدماتنا المتميزة</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { id: 1, icon: <Stethoscope size={32} />, title: "حجز العيادات", desc: "احجز موعدك مع أفضل الأطباء في مختلف التخصصات بسهولة.", color: "bg-blue-100 text-blue-600", link: "/doctors" },
                        { id: 2, icon: <Video size={32} />, title: "استشارات أونلاين", desc: "تحدث مع طبيبك عبر مكالمة فيديو آمنة من منزلك.", color: "bg-purple-100 text-purple-600", link: "/doctors" },
                        { id: 3, icon: <Pill size={32} />, title: "تذكير الأدوية", desc: "لا تفوت أي جرعة مع نظام التذكير الذكي والآلي للأدوية.", color: "bg-amber-100 text-amber-600", link: "/medications" },
                        { id: 4, icon: <HeartPulse size={32} />, title: "تتبع الصحة", desc: "سجل مؤشراتك الحيوية وراقب تطور صحتك بانتظام.", color: "bg-rose-100 text-rose-600", link: "/health" }
                    ].map(s => (
                        <div key={s.id} onClick={() => navigate(s.link)} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow cursor-pointer border border-slate-100 group">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${s.color} group-hover:scale-110 transition-transform`}>
                                {s.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{s.title}</h3>
                            <p className="text-slate-500 leading-relaxed mb-6">{s.desc}</p>
                            <div className="flex items-center gap-2 text-teal-600 font-bold group-hover:translate-x-reverse group-hover:translate-x-2 transition-transform">
                                <span>اكتشف المزيد</span>
                                <ArrowLeft size={18} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 4 — Bundles */}
            <section className="py-20 bg-slate-900 text-white pb-32">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">اختر الباقة المناسبة لك</h2>
                        <p className="text-slate-400 text-lg">باقات مرنة تناسب احتياجاتك الصحية بأفضل الأسعار</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bundlesList.map((b) => (
                            <div key={b.id} className={`bg-slate-800 rounded-3xl p-8 relative flex flex-col ${b.popular ? 'ring-2 ring-teal-500 transform lg:-translate-y-4' : 'border border-slate-700'}`}>
                                {b.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                        الأكثر شعبية
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-3xl">{b.emoji}</span>
                                    <h3 className="text-xl font-bold">{b.nameAr}</h3>
                                </div>

                                <div className="mb-8">
                                    <span className="text-3xl font-bold">{b.priceNum === 0 ? 'مجاناً' : b.price}</span>
                                    {b.priceNum > 0 && <span className="text-slate-400 text-sm line-through block mt-1">{(b.priceNum * 1.5).toFixed(0)} ج.م</span>}
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {b.features.map((f, i) => (
                                        <li key={i} className="flex gap-3 text-slate-300">
                                            <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                                            <span className="text-sm">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => navigate(`/payment?bundle=${b.id}`)}
                                    className={`w-full py-4 rounded-xl font-bold transition mt-auto ${b.popular
                                            ? 'bg-teal-500 hover:bg-teal-600 text-white'
                                            : 'bg-slate-700 hover:bg-slate-600 text-white'
                                        }`}
                                >
                                    {b.priceNum === 0 ? 'ابدأ مجاناً' : 'اشترك الآن'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5 — Footer & Contact */}
            <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-teal-500 font-bold text-2xl mb-4">شفا 🏥</div>
                        <p className="mb-6 max-w-sm">
                            المنصة الطبية العربية الأولى المتكاملة. نهدف إلى تبسيط الوصول للرعاية الصحية وتقديم تجربة طبية رقمية شاملة.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition cursor-pointer">X</div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition cursor-pointer">in</div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition cursor-pointer">f</div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => navigate('/doctors')} className="hover:text-teal-400 transition">الأطباء</button></li>
                            <li><button onClick={() => navigate('/health')} className="hover:text-teal-400 transition">صحتي</button></li>
                            <li><button onClick={() => navigate('/womens-health')} className="hover:text-teal-400 transition">صحة المرأة</button></li>
                            <li><button onClick={() => navigate('/medications')} className="hover:text-teal-400 transition">الأدوية</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">للتواصل المباشر</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">📞</div>
                                <span dir="ltr">16000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">📧</div>
                                <span>support@shifa.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">📍</div>
                                <span>القاهرة، مصر</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
                    جميع الحقوق محفوظة منصة شفا الطبيعية © {new Date().getFullYear()}
                </div>
            </footer>
        </div>
    )
}
