// src/pages/SignIn.jsx
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, AlertCircle, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [validationErrors, setValidationErrors] = useState({ email: '', password: '' })
    
    const navigate = useNavigate()
    const location = useLocation()
    const { signIn } = useAuth()
    
    const validate = () => {
        let isValid = true
        let errors = { email: '', password: '' }
        
        if (!email) {
            errors.email = 'البريد الإلكتروني مطلوب'
            isValid = false
        } else if (!email.includes('@') || !email.includes('.')) {
            errors.email = 'البريد الإلكتروني غير صالح'
            isValid = false
        }
        
        if (!password) {
            errors.password = 'كلمة المرور مطلوبة'
            isValid = false
        } else if (password.length < 6) {
            errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
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
            await signIn(email, password)
            const from = location.state?.from?.pathname || '/'
            navigate(from, { replace: true })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="flex min-h-screen relative" dir="rtl">
            {/* RIGHT COLUMN */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#FFF5F8] p-6 relative">
                <div className="w-full max-w-[420px] mx-auto bg-white rounded-3xl p-8 shadow-sm" style={{ border: '1px solid #F9D0DF' }}>
                    <div className="md:hidden flex justify-center mb-8">
                        <img src="/logo.png" alt="EVE" style={{ height: '48px' }} />
                    </div>
                    
                    <h1 className="text-[26px] font-bold mb-1" style={{ color: '#6B1535' }}>أهلاً بكِ مرة أخرى</h1>
                    <p className="text-[14px] italic mb-8" style={{ color: '#C2185B' }}>سجّلي دخولك للمتابعة</p>
                    
                    {error && (
                        <div className="bg-[#FFF5F5] rounded-xl p-4 mb-6 flex items-start gap-3" style={{ border: '1px solid #EF4444' }}>
                            <div className="text-[#EF4444] mt-0.5"><X size={18} /></div>
                            <p className="text-[#EF4444] text-sm font-bold leading-relaxed">{error}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
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
                                        paddingRight: '44px',
                                        boxShadow: 'none'
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
                                    <AlertCircle size={12} />
                                    <span>{validationErrors.email}</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور</label>
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
                                        paddingLeft: '44px',
                                        boxShadow: 'none'
                                    }}
                                    onFocus={e => e.target.style.boxShadow = validationErrors.password ? 'none' : '0 0 0 3px rgba(194,24,91,0.1)'}
                                    onBlur={e => e.target.style.boxShadow = 'none'}
                                />
                                <div className="absolute top-1/2 right-[16px] -translate-y-1/2 text-slate-400">
                                    <Lock size={20} />
                                </div>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 left-[16px] -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {validationErrors.password && (
                                <div className="flex items-center gap-1 mt-1 text-[#EF4444] text-[12px]">
                                    <AlertCircle size={12} />
                                    <span>{validationErrors.password}</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex items-center">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={e => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded"
                                    style={{ accentColor: '#C2185B' }}
                                />
                                <span className="text-sm font-bold text-slate-600 select-none">تذكريني</span>
                            </label>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-[48px] rounded-xl flex items-center justify-center font-bold text-white transition-all mt-6"
                            style={{ 
                                backgroundColor: '#C2185B',
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                            onMouseEnter={e => { if(!loading) e.target.style.backgroundColor = '#8B1245' }}
                            onMouseLeave={e => { if(!loading) e.target.style.backgroundColor = '#C2185B' }}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>جاري التحقق...</span>
                                </div>
                            ) : (
                                "تسجيل الدخول"
                            )}
                        </button>
                    </form>
                    
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-[#F9D0DF]"></div>
                        <span className="text-sm text-slate-400 font-bold">أو</span>
                        <div className="flex-1 h-px bg-[#F9D0DF]"></div>
                    </div>
                    
                    <div className="text-center text-sm">
                        <span className="text-slate-600">ليس لديكِ حساب؟ </span>
                        <Link to="/signup" className="font-bold underline transition-colors" style={{ color: '#C2185B' }} onMouseEnter={e => e.target.style.color = '#8B1245'} onMouseLeave={e => e.target.style.color = '#C2185B'}>
                            إنشاء حساب جديد
                        </Link>
                    </div>
                </div>
            </div>

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
        </div>
    )
}
