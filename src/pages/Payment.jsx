// src/pages/Payment.jsx
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BUNDLES } from '../utils/bundleConfig'

export default function Payment() {
    const [searchParams] = useSearchParams()
    const bundleKey = searchParams.get('bundle') || 'plus'
    const bundle = BUNDLES[bundleKey] || BUNDLES.plus
    const navigate = useNavigate()

    const [form, setForm] = useState({ cardHolder: '', cardNumber: '', expiry: '', cvv: '', agreed: false })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const validate = () => {
        if (!form.cardHolder.trim()) return 'الرجاء إدخال اسم حامل البطاقة'
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

        localStorage.setItem('shifa_bundle', JSON.stringify(bundleKey))
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
            <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
                <svg className="w-32 h-32 text-emerald-500 mb-6" viewBox="0 0 52 52">
                    <circle className="text-emerald-100 fill-current" cx="26" cy="26" r="25" />
                    <path className="check-draw fill-none stroke-emerald-500 stroke-[4] stroke-linecap-round" d="M14 27l7 7 16-16" />
                </svg>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">تم الاشتراك بنجاح!</h2>
                <p className="text-slate-500 text-lg">مرحباً بك في باقة {bundle.nameAr}</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-800 mb-3">إتمام الدفع</h1>
                <p className="text-slate-500 text-lg">الترقية إلى باقة {bundle.nameAr} - {bundle.price}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Order Summary */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 order-2 md:order-1">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">ملخص الطلب</h2>

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{bundle.emoji}</span>
                            <div>
                                <p className="font-bold text-slate-800">باقة {bundle.nameAr}</p>
                                <p className="text-sm text-slate-500">اشتراك شهري</p>
                            </div>
                        </div>
                        <p className="font-bold text-xl text-slate-800">{bundle.priceNum} ج.م</p>
                    </div>

                    <div className="space-y-3 mb-8">
                        {bundle.features.map((f, i) => (
                            <div key={i} className="flex gap-3 items-center">
                                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                                <span className="text-slate-600">{f}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                        <span className="font-bold text-slate-700">الإجمالي الدفع:</span>
                        <span className="font-bold text-2xl text-teal-600">{bundle.priceNum} ج.م</span>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-teal-100 order-1 md:order-2">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">بطاقة الدفع</h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-semibold flex items-center gap-2">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">اسم حامل البطاقة</label>
                            <input
                                type="text"
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-left font-mono"
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
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-center font-mono"
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
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-center font-mono tracking-widest"
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
                                    className="w-5 h-5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                                    checked={form.agreed}
                                    onChange={e => setForm({ ...form, agreed: e.target.checked })}
                                />
                                <span className="text-sm text-slate-600">أوافق على الشروط والأحكام وسياسة الخصوصية</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition text-lg shadow-md hover:shadow-lg"
                        >
                            ادفع {bundle.priceNum} ج.م
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
