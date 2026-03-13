// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom'
import { Stethoscope, Pill, HeartPulse, Heart, ArrowLeft, Star } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { BUNDLES, BUNDLE_ORDER } from '../utils/bundleConfig'

export default function Home({ setToast }) {
    const navigate = useNavigate()
    const [user] = useLocalStorage('eve_user', { name: 'ضيفة' })
    const bundlesList = BUNDLE_ORDER.map(k => ({ id: k, ...BUNDLES[k] }))

    return (
        <div className="flex flex-col min-h-screen">
            {/* SECTION 1 — Hero */}
            <section className="relative text-white min-h-[70vh] flex items-center pt-16 pb-32" style={{ background: 'linear-gradient(135deg, #6B1535 0%, #C2185B 50%, #F5B8CE 100%)' }}>
                {/* Polka dot overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(#F5B8CE 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    opacity: 0.15,
                    pointerEvents: 'none'
                }}></div>

                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        {/* Logo in hero */}
                        <img
                            src="/logo.png"
                            alt="EVE"
                            style={{
                                height: '120px',
                                width: 'auto',
                                margin: '0 auto 24px',
                                display: 'block',
                                filter: 'brightness(0) invert(1)'
                            }}
                        />
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            صحتك بيدك مع EVE <span className="text-pink-200">🌸</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg" style={{ color: '#FFE4EC' }}>
                            احجزي طبيبتك، تتبعي صحتك، ولا تنسي دواءك — كل شيء في مكان واحد
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/payment')}
                                className="px-8 py-4 rounded-full font-bold text-lg shadow-lg transition"
                                style={{ background: 'white', color: '#C2185B' }}
                                onMouseEnter={e => e.target.style.backgroundColor = '#FDE8EF'}
                                onMouseLeave={e => e.target.style.backgroundColor = 'white'}
                            >
                                إنشاء حساب مجاني
                            </button>
                            <button
                                onClick={() => navigate('/doctors')}
                                className="px-8 py-4 rounded-full font-bold text-lg shadow-lg transition"
                                style={{ border: '2px solid white', color: 'white', background: 'transparent' }}
                                onMouseEnter={e => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#C2185B' }}
                                onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'white' }}
                            >
                                تسجيل الدخول
                            </button>
                        </div>
                    </div>
                    <div className="hidden md:flex justify-end">
                        <div className="relative w-80 h-80">
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl align-middle m-auto animate-pulse"></div>
                            <div className="absolute inset-0 rounded-full opacity-30 shadow-2xl" style={{ background: 'linear-gradient(to top right, #F5B8CE, #FDE8EF)' }}></div>
                            {/* Abstract decorative elements */}
                            <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FDE8EF', color: '#C2185B' }}>
                                    <Star size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">4.9/5</p>
                                    <p className="text-xs text-slate-500">تقييم المستخدمات</p>
                                </div>
                            </div>
                            <div className="absolute bottom-10 left-0 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FDE8EF', color: '#C2185B' }}>
                                    <HeartPulse size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">+50,000</p>
                                    <p className="text-xs text-slate-500">مستخدمة نشطة</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave SVG */}
                <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full">
                    <path fill="#FFF5F8" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
                </svg>
            </section>

            {/* Decorative Divider */}
            <div style={{ textAlign: 'center', color: '#F5B8CE', fontSize: '20px', letterSpacing: '6px', margin: '1rem 0' }}>
                ✦ ✦ ✦
            </div>

            {/* SECTION 2 — Services (What We Offer) */}
            <section className="py-16 max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#6B1535' }}>خدماتنا المتميزة</h2>
                <p className="text-center mb-12" style={{ color: '#C2185B', fontStyle: 'italic' }}>كل ما تحتاجينه في مكان واحد</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { id: 1, icon: <Stethoscope size={32} />, title: "احجزي طبيبتك", desc: "احجزي موعدك مع أفضل الطبيبات في مختلف التخصصات بسهولة.", link: "/doctors" },
                        { id: 2, icon: <HeartPulse size={32} />, title: "تتبعي صحتك", desc: "سجّلي مؤشراتك الحيوية وراقبي تطور صحتك بانتظام.", link: "/health" },
                        { id: 3, icon: <Pill size={32} />, title: "تذكير الأدوية", desc: "لا تنسي أي جرعة مع نظام التذكير الذكي والآلي للأدوية.", link: "/medications" },
                        { id: 4, icon: <Heart size={32} />, title: "صحتك الأنثوية", desc: "تتبعي دورتك الشهرية ومراحل الحمل بخصوصية تامة.", link: "/womens-health" }
                    ].map(s => (
                        <div key={s.id} onClick={() => navigate(s.link)} className="bg-white rounded-3xl p-8 shadow-sm cursor-pointer group eve-card">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #FDE8EF, #F5B8CE)', color: '#C2185B' }}>
                                {s.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3" style={{ color: '#6B1535' }}>{s.title}</h3>
                            <p className="text-slate-500 leading-relaxed mb-6">{s.desc}</p>
                            <div className="flex items-center gap-2 font-bold group-hover:translate-x-2 transition-transform" style={{ color: '#C2185B' }}>
                                <span>اكتشفي المزيد</span>
                                <ArrowLeft size={18} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Decorative Divider */}
            <div style={{ textAlign: 'center', color: '#F5B8CE', fontSize: '20px', letterSpacing: '6px', margin: '1rem 0' }}>
                ✦ ✦ ✦
            </div>

            {/* SECTION 3 — Bundles */}
            <section className="py-20 bg-slate-900 text-white pb-32">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">اختاري الباقة المناسبة لكِ</h2>
                        <p className="text-slate-400 text-lg">باقات مرنة تناسب احتياجاتك الصحية بأفضل الأسعار</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bundlesList.map((b) => (
                            <div key={b.id} className={`bg-slate-800 rounded-3xl p-8 relative flex flex-col ${b.popular ? 'transform lg:-translate-y-4' : 'border border-slate-700'}`}
                                style={b.popular ? { border: '2px solid #C2185B', boxShadow: '0 8px 32px rgba(194, 24, 91, 0.2)' } : {}}>
                                {b.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg"
                                        style={{ backgroundColor: '#C2185B', fontSize: '11px', padding: '4px 16px' }}>
                                        الأكثر شعبية
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-3xl">{b.emoji}</span>
                                    <h3 className="text-xl font-bold" style={{ color: b.popular ? '#F5B8CE' : 'white' }}>{b.nameAr}</h3>
                                </div>

                                <div className="mb-8">
                                    <span className="text-3xl font-bold">{b.priceNum === 0 ? 'مجاناً' : b.price}</span>
                                    {b.priceNum > 0 && <span className="text-slate-400 text-sm line-through block mt-1">{(b.priceNum * 1.5).toFixed(0)} ج.م</span>}
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {b.features.map((f, i) => (
                                        <li key={i} className="flex gap-3 text-slate-300">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(194,24,91,0.2)', color: '#F5B8CE' }}>✓</div>
                                            <span className="text-sm">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => navigate(`/payment?bundle=${b.id}`)}
                                    className={`w-full py-4 rounded-xl font-bold transition mt-auto text-white`}
                                    style={{ backgroundColor: b.popular ? '#C2185B' : '#334155' }}
                                    onMouseEnter={e => e.target.style.backgroundColor = b.popular ? '#8B1245' : '#475569'}
                                    onMouseLeave={e => e.target.style.backgroundColor = b.popular ? '#C2185B' : '#334155'}
                                >
                                    {b.priceNum === 0 ? 'ابدأي مجاناً' : 'اشتركي الآن'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4 — Footer & Contact */}
            <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="font-bold text-2xl mb-4" style={{ color: '#C2185B' }}>
                            <img src="/logo.png" alt="EVE" style={{ height: '40px', display: 'inline-block', marginLeft: '8px', filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(310deg)' }} />
                        </div>
                        <p className="mb-6 max-w-sm">
                            منصة صحة المرأة الرقمية الأولى المتكاملة. نهدف إلى تمكين المرأة من إدارة صحتها وتقديم تجربة رعاية شاملة.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:text-white transition cursor-pointer" style={{ '--hover-bg': '#C2185B' }}
                                onMouseEnter={e => e.target.style.backgroundColor = '#C2185B'}
                                onMouseLeave={e => e.target.style.backgroundColor = '#1e293b'}>X</div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:text-white transition cursor-pointer"
                                onMouseEnter={e => e.target.style.backgroundColor = '#C2185B'}
                                onMouseLeave={e => e.target.style.backgroundColor = '#1e293b'}>in</div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:text-white transition cursor-pointer"
                                onMouseEnter={e => e.target.style.backgroundColor = '#C2185B'}
                                onMouseLeave={e => e.target.style.backgroundColor = '#1e293b'}>f</div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => navigate('/doctors')} className="hover:text-[#F5B8CE] transition">الأطباء</button></li>
                            <li><button onClick={() => navigate('/health')} className="hover:text-[#F5B8CE] transition">صحتي</button></li>
                            <li><button onClick={() => navigate('/womens-health')} className="hover:text-[#F5B8CE] transition">صحة المرأة</button></li>
                            <li><button onClick={() => navigate('/medications')} className="hover:text-[#F5B8CE] transition">الأدوية</button></li>
                            <li><button onClick={() => navigate('/about')} className="hover:text-[#F5B8CE] transition">من نحن</button></li>
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
                                <span>hello@eve-health.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">📍</div>
                                <span>القاهرة، مصر</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
                    © 2026 EVE · Her life. Her care. — جميع الحقوق محفوظة
                </div>
            </footer>
        </div>
    )
}
