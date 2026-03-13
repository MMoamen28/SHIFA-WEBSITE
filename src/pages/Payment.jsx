// src/pages/Payment.jsx
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BUNDLES } from '../utils/bundleConfig'
import { useAuth } from '../context/AuthContext'

export default function Payment() {
    const [searchParams] = useSearchParams()
    const bundleKey = searchParams.get('bundle') || 'plus'
    const bundle = BUNDLES[bundleKey] || BUNDLES.plus
    const navigate = useNavigate()
    const { updateUser } = useAuth()

    const [form, setForm] = useState({ cardHolder: '', cardNumber: '', expiry: '', cvv: '', agreed: false })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const validate = () => {
        if (!form.cardHolder.trim()) return 'الرجاء إدخال اسم حاملة البطاقة'
        if (form.cardNumber.replace(/\s/g, '').length !== 16) return 'رقم البطاقة يجب أن يكون 16 رقماً'
        if (form.expiry.length !== 5 || !form.expiry.includes('/')) return 'تاريخ انتهاء غير صحيح'
        if (form.cvv.length !== 3) return 'رمز CVV يجب أن يكون 3 أرقام'
        if (!form.agreed) return 'يجب الموافقة على الشروط والأحكام'
        return null
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const err = validate()
        if (err) return setError(err)

        localStorage.setItem('eve_bundle', JSON.stringify(bundleKey))
        updateUser({ bundle: bundleKey })
        setSuccess(true)
        setTimeout(() => {
            navigate('/')
            window.location.reload()
        }, 3000)
    }

    const handleCardNumber = (e) => {
        let val = e.target.value.replace(/\D/g, '')
        val = val.replace(/(.{4})/g, '$1 ').trim()
        if (val.length <= 19) setForm({ ...form, cardNumber: val })
    }

    const handleExpiry = (e) => {
        let val = e.target.value.replace(/\D/g, '')
        if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4)
        if (val.length <= 5) setForm({ ...form, expiry: val })
    }

    if (success) {
        return (
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ backgroundColor: '#FFF5F8' }}>
                <img src="/logo.png" alt="EVE" style={{ height: '60px', margin: '0 auto 16px' }} />
                <svg className="w-32 h-32 mb-6" viewBox="0 0 52 52">
                    <circle style={{ fill: '#FDE8EF' }} cx="26" cy="26" r="25" />
                    <path className="check-draw" style={{ fill: 'none', stroke: '#C2185B', strokeWidth: 4, strokeLinecap: 'round' }} d="M14 27l7 7 16-16" />
                </svg>
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#6B1535' }}>تم الاشتراك بنجاح!</h2>
                <p className="text-lg" style={{ color: '#C2185B' }}>مرحباً بكِ في باقة {bundle.nameAr}</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-3" style={{ color: '#6B1535' }}>إتمام الدفع</h1>
                <p className="text-lg" style={{ color: '#C2185B' }}>الترقية إلى باقة {bundle.nameAr} - {bundle.price}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Order Summary */}
                <div className="bg-white rounded-3xl p-8 shadow-sm order-2 md:order-1 eve-card">
                    <h2 className="text-xl font-bold mb-6 pb-4" style={{ color: '#6B1535', borderBottom: '1px solid #F9D0DF' }}>ملخص الطلب</h2>

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{bundle.emoji}</span>
                            <div>
                                <p className="font-bold" style={{ color: '#6B1535' }}>باقة {bundle.nameAr}</p>
                                <p className="text-sm text-slate-500">اشتراك شهري</p>
                            </div>
                        </div>
                        <p className="font-bold text-xl" style={{ color: '#6B1535' }}>{bundle.priceNum} ج.م</p>
                    </div>

                    <div className="space-y-3 mb-8">
                        {bundle.features.map((f, i) => (
                            <div key={i} className="flex gap-3 items-center">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FDE8EF', color: '#C2185B' }}>✓</div>
                                <span className="text-slate-600">{f}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center p-4 rounded-xl" style={{ borderColor: '#F9D0DF', backgroundColor: '#FFF5F8' }}>
                        <span className="font-bold text-slate-700">الإجمالي الدفع:</span>
                        <span className="font-bold text-2xl" style={{ color: '#C2185B' }}>{bundle.priceNum} ج.م</span>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white rounded-3xl p-8 shadow-lg order-1 md:order-2 eve-card">
                    <h2 className="text-xl font-bold mb-6" style={{ color: '#6B1535' }}>بطاقة الدفع</h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-semibold flex items-center gap-2">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">اسم حاملة البطاقة</label>
                            <input
                                type="text"
                                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-1"
                                style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                placeholder="الاسم كما هو مطبوع على البطاقة"
                                value={form.cardHolder}
                                onChange={e => setForm({ ...form, cardHolder: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">رقم البطاقة</label>
                            <input
                                type="text"
                                dir="ltr"
                                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-1 text-left font-mono"
                                style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                placeholder="0000 0000 0000 0000"
                                value={form.cardNumber}
                                onChange={handleCardNumber}
                                maxLength="19"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">تاريخ الانتهاء</label>
                                <input
                                    type="text"
                                    dir="ltr"
                                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-1 text-center font-mono"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    placeholder="MM/YY"
                                    value={form.expiry}
                                    onChange={handleExpiry}
                                    maxLength="5"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">رمز CVV</label>
                                <input
                                    type="password"
                                    dir="ltr"
                                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-1 text-center font-mono tracking-widest"
                                    style={{ border: '1px solid #F9D0DF', '--tw-ring-color': '#C2185B' }}
                                    placeholder="•••"
                                    value={form.cvv}
                                    onChange={e => {
                                        const val = e.target.value.replace(/\D/g, '')
                                        if (val.length <= 3) setForm({ ...form, cvv: val })
                                    }}
                                    maxLength="3"
                                />
                            </div>
                        </div>

                        <div className="pt-2 pb-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded"
                                    style={{ accentColor: '#C2185B' }}
                                    checked={form.agreed}
                                    onChange={e => setForm({ ...form, agreed: e.target.checked })}
                                />
                                <span className="text-sm text-slate-600">أوافق على الشروط والأحكام وسياسة الخصوصية</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white font-bold py-4 rounded-xl transition text-lg shadow-md hover:shadow-lg"
                            style={{ backgroundColor: '#C2185B' }}
                            onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                            onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                        >
                            ادفعي {bundle.priceNum} ج.م
                        </button>
                        <div className="flex justify-center gap-4 pt-4 opacity-50">
                            <span className="text-xl font-bold italic">VISA</span>
                            <span className="text-xl font-bold italic">MasterCard</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
