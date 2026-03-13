// src/pages/SignUp.jsx
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Calendar, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [agreed, setAgreed] = useState(false)
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    
    const navigate = useNavigate()
    const { signUp } = useAuth()
    
    // Password Strength
    const getPasswordStrength = () => {
        if (!password) return { percent: 0, color: 'transparent', label: '' }
        if (password.length < 8 || /^[A-Za-z]+$/.test(password)) return { percent: 33, color: '#EF4444', label: 'ضعيفة' }
        if (/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password)) return { percent: 66, color: '#F59E0B', label: 'متوسطة' }
        return { percent: 100, color: '#10B981', label: 'قوية' }
    }
    const strength = getPasswordStrength()
    
    const validate = () => {
        let isValid = true
        let errors = {}
        
        if (!name || name.length < 2) {
            errors.name = 'الاسم الكامل مطلوب (أكثر من حرفين)'
            isValid = false
        }
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            errors.email = 'البريد الإلكتروني غير صالح'
            isValid = false
        }
        
        const ageNum = parseInt(age, 10)
        if (!age || isNaN(ageNum) || ageNum < 13 || ageNum > 100) {
            errors.age = 'العمر يجب أن يكون بين 13 و 100'
            isValid = false
        }
        
        if (!password || password.length < 8) {
            errors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
            isValid = false
        }
        
        if (!confirmPassword || confirmPassword !== password) {
            errors.confirmPassword = 'كلمتا المرور غير متطابقتين'
            isValid = false
        }
        
        if (!agreed) {
            errors.agreed = 'يجب الموافقة على الشروط'
            isValid = false
        }
        
        setValidationErrors(errors)
        return isValid
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        if (!validate()) return
        
        setLoading(true)
        try {
            await signUp(name, email, password, parseInt(age, 10))
            setSuccess(true)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }
    
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/')
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [success, navigate])
    
    return (
        <div className="flex min-h-screen relative" dir="rtl">
            {success && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
                    <img src="/logo.png" alt="EVE" style={{ height: '80px', marginBottom: '24px' }} />
                    <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: '#F0FDF4' }}>
                        <svg className="w-12 h-12 text-[#10B981] animate-[pulse_1s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#6B1535' }}>مرحباً بكِ في EVE! 🌸</h2>
                    <p className="text-xl font-bold mb-4" style={{ color: '#C2185B' }}>أهلاً {name}</p>
                    <p className="text-slate-500">تم إنشاء حسابك بنجاح</p>
                </div>
            )}
            
            {/* LEFT COLUMN */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6B1535 0%, #C2185B 50%, #F5B8CE 100%)' }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    opacity: 0.1,
                    pointerEvents: 'none'
                }}></div>
                
                <div className="relative z-10 text-center flex flex-col items-center max-w-md px-8 text-white">
                    <img src="/logo.png" alt="EVE" className="mb-4" style={{ height: '140px', objectFit: 'contain', borderRadius: '16px' }} />
                    <p className="text-lg italic tracking-wider mb-10 opacity-90" style={{ fontFamily: 'serif' }}>
                        · Her life. Her care ·
                    </p>
                    <p className="text-2xl font-bold leading-relaxed text-center" style={{ fontFamily: 'Cairo, sans-serif' }}>
                        "صحتك بيدك — ابدأي رحلتك مع EVE اليوم"
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#FFF5F8] p-6 relative">
                <div className="w-full max-w-[420px] mx-auto bg-white rounded-3xl p-8 shadow-sm my-6" style={{ border: '1px solid #F9D0DF' }}>
                    <div className="md:hidden flex justify-center mb-6">
                        <img src="/logo.png" alt="EVE" style={{ height: '48px' }} />
                    </div>
                    
                    <h1 className="text-[26px] font-bold mb-1" style={{ color: '#6B1535' }}>انضمي إلى EVE</h1>
                    <p className="text-[14px] italic mb-6" style={{ color: '#C2185B' }}>أنشئي حسابك مجاناً اليوم</p>
                    
                    {error && (
                        <div className="bg-[#FFF5F5] rounded-xl p-3 mb-5 flex items-start gap-2 text-[#EF4444]" style={{ border: '1px solid #EF4444' }}>
                            <AlertCircle size={18} className="mt-0.5" />
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* NAME */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-1">الاسم الكامل</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="اسمك الكامل"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full h-[48px] rounded-xl px-4 text-[15px] focus:outline-none transition-all"
                                    style={{
                                        fontFamily: 'Cairo, sans-serif',
                                        border: `1.5px solid ${validationErrors.name ? '#EF4444' : '#F9D0DF'}`,
                                        backgroundColor: validationErrors.name ? '#FFF5F5' : '#FFFFFF',
                                        paddingRight: '44px'
                                    }}
                                    onFocus={e => e.target.style.boxShadow = validationErrors.name ? 'none' : '0 0 0 3px rgba(194,24,91,0.1)'}
                                    onBlur={e => e.target.style.boxShadow = 'none'}
                                />
                                <div className="absolute top-1/2 right-[16px] -translate-y-1/2 text-slate-400">
                                    <User size={20} />
                                </div>
                            </div>
                            {validationErrors.name && (
                                <div className="flex items-center gap-1 mt-1 text-[#EF4444] text-[12px]">
                                    <AlertCircle size={12} /><span>{validationErrors.name}</span>
                                </div>
                            )}
                        </div>

                        {/* EMAIL */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="example@email.com"
                                    dir="ltr"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full h-[48px] rounded-xl px-4 text-[15px] focus:outline-none transition-all"
                                    style={{
                                        fontFamily: 'Cairo, sans-serif',
                                        border: `1.5px solid ${validationErrors.email ? '#EF4444' : '#F9D0DF'}`,
                                        backgroundColor: validationErrors.email ? '#FFF5F5' : '#FFFFFF',
                                        paddingRight: '44px'
                                    }}
                                    onFocus={e => e.target.style.boxShadow = validationErrors.email ? 'none' : '0 0 0 3px rgba(194,24,91,0.1)'}
                                    onBlur={e => e.target.style.boxShadow = 'none'}
                                />
                                <div className="absolute top-1/2 right-[16px] -translate-y-1/2 text-slate-400">
                                    <Mail size={20} />
                                </div>
                            </div>
                            {validationErrors.email && (
                                <div className="flex items-center gap-1 mt-1 text-[#EF4444] text-[12px]">
                                    <AlertCircle size={12} /><span>{validationErrors.email}</span>
                                </div>
                            )}
                        </div>

                        {/* AGE */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-1">العمر</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="عمرك"
                                    min="13" max="100"
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                    className="w-full h-[48px] rounded-xl px-4 text-[15px] focus:outline-none transition-all"
                                    style={{
                                        fontFamily: 'Cairo, sans-serif',
                                        border: `1.5px solid ${validationErrors.age ? '#EF4444' : '#F9D0DF'}`,
                                        backgroundColor: validationErrors.age ? '#FFF5F5' : '#FFFFFF',
                                        paddingRight: '44px'
                                    }}
                                    onFocus={e => e.target.style.boxShadow = validationErrors.age ? 'none' : '0 0 0 3px rgba(194,24,91,0.1)'}
                                    onBlur={e => e.target.style.boxShadow = 'none'}
                                />
                                <div className="absolute top-1/2 right-[16px] -translate-y-1/2 text-slate-400">
                                    <Calendar size={20} />
                                </div>
                            </div>
                            {validationErrors.age && (
                                <div className="flex items-center gap-1 mt-1 text-[#EF4444] text-[12px]">
                                    <AlertCircle size={12} /><span>{validationErrors.age}</span>
                                </div>
                            )}
                        </div>
                        
                        {/* PASSWORD */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-1">كلمة المرور</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    dir="ltr"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full h-[48px] rounded-xl px-4 text-[15px] focus:outline-none transition-all"
                                    style={{
                                        fontFamily: 'Cairo, sans-serif',
                                        border: `1.5px solid ${validationErrors.password ? '#EF4444' : '#F9D0DF'}`,
                                        backgroundColor: validationErrors.password ? '#FFF5F5' : '#FFFFFF',
                                        paddingRight: '44px',
                                        paddingLeft: '44px'
                                    }}
                                    onFocus={e => e.target.style.boxShadow = validationErrors.password ? 'none' : '0 0 0 3px rgba(194,24,91,0.1)'}
                                    onBlur={e => e.target.style.boxShadow = 'none'}
                                />
                                <div className="absolute top-1/2 right-[16px] -translate-y-1/2 text-slate-400">
                                    <Lock size={20} />
                                </div>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 left-[16px] -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            
                            {/* Strength bar */}
                            {password && (
                                <div className="mt-2 text-xs flex items-center justify-between">
                                    <div className="w-[85%] h-[4px] bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full transition-all duration-300" style={{ width: `${strength.percent}%`, backgroundColor: strength.color }}></div>
                                    </div>
                                    <span style={{ color: strength.color, fontWeight: 'bold' }}>{strength.label}</span>
                                </div>
                            )}
                            
                            {validationErrors.password && (
                                <div className="flex items-center gap-1 mt-1 text-[#EF4444] text-[12px]">
                                    <AlertCircle size={12} /><span>{validationErrors.password}</span>
                                </div>
                            )}
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-1">تأكيد كلمة المرور</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    dir="ltr"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    className="w-full h-[48px] rounded-xl px-4 text-[15px] focus:outline-none transition-all"
                                    style={{
                                        fontFamily: 'Cairo, sans-serif',
                                        border: `1.5px solid ${validationErrors.confirmPassword ? '#EF4444' : '#F9D0DF'}`,
                                        backgroundColor: validationErrors.confirmPassword ? '#FFF5F5' : '#FFFFFF',
                                        paddingRight: '44px',
                                        paddingLeft: '44px'
                                    }}
                                    onFocus={e => e.target.style.boxShadow = validationErrors.confirmPassword ? 'none' : '0 0 0 3px rgba(194,24,91,0.1)'}
                                    onBlur={e => e.target.style.boxShadow = 'none'}
                                />
                                {confirmPassword && confirmPassword === password ? (
                                    <div className="absolute top-1/2 right-[16px] -translate-y-1/2 text-[#10B981]">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                ) : (
                                    <div className="absolute top-1/2 right-[16px] -translate-y-1/2 text-slate-400">
                                        <Lock size={20} />
                                    </div>
                                )}
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-1/2 left-[16px] -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {validationErrors.confirmPassword && (
                                <div className="flex items-center gap-1 mt-1 text-[#EF4444] text-[12px]">
                                    <AlertCircle size={12} /><span>{validationErrors.confirmPassword}</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="pt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={agreed}
                                    onChange={e => setAgreed(e.target.checked)}
                                    className="w-4 h-4 rounded"
                                    style={{ accentColor: '#C2185B' }}
                                />
                                <span className={`text-sm font-bold ${validationErrors.agreed ? 'text-[#EF4444]' : 'text-slate-600'}`}>
                                    أوافق على الشروط والأحكام وسياسة الخصوصية
                                </span>
                            </label>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full h-[48px] rounded-xl flex items-center justify-center font-bold text-white transition-all mt-6"
                            style={{ backgroundColor: '#C2185B', opacity: loading || success ? 0.7 : 1 }}
                            onMouseEnter={e => { if(!loading && !success) e.target.style.backgroundColor = '#8B1245' }}
                            onMouseLeave={e => { if(!loading && !success) e.target.style.backgroundColor = '#C2185B' }}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>جاري إنشاء الحساب...</span>
                                </div>
                            ) : "إنشاء الحساب"}
                        </button>
                    </form>
                    
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-[#F9D0DF]"></div>
                        <span className="text-sm text-slate-400 font-bold">أو</span>
                        <div className="flex-1 h-px bg-[#F9D0DF]"></div>
                    </div>
                    
                    <div className="text-center text-sm">
                        <span className="text-slate-600">لديكِ حساب بالفعل؟ </span>
                        <Link to="/signin" className="font-bold underline transition-colors" style={{ color: '#C2185B' }} onMouseEnter={e => e.target.style.color = '#8B1245'} onMouseLeave={e => e.target.style.color = '#C2185B'}>
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
