// src/components/Navbar.jsx
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Home as HomeIcon, Users, HeartPulse, Pill, Heart, Info } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useBundle } from '../hooks/useBundle'
import { BUNDLES } from '../utils/bundleConfig'

export default function Navbar({ setToast }) {
    const { currentUser, isLoggedIn, signOut } = useAuth()
    const { bundle } = useBundle()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const activeLinkBase = "border-b-2 font-bold transition-all px-1 py-4 "
    const navLinkClass = ({ isActive }) =>
        isActive ? activeLinkBase + "border-[#C2185B] text-[#C2185B]"
            : activeLinkBase + "border-transparent text-slate-600 hover:text-[#C2185B]"

    const bundleData = BUNDLES[bundle] || BUNDLES['essential']

    const handleToast = (msg) => {
        if(setToast) setToast(msg, 'info')
        else alert(msg)
        setDropdownOpen(false)
    }

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4 md:px-8 flex items-center justify-between" dir="rtl">
                {/* RIGHT SIDE: Logo */}
                <div className="cursor-pointer shrink-0" onClick={() => navigate('/')}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            src="/logo.png"
                            alt="EVE"
                            style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
                            onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'block'
                            }}
                        />
                        <span
                            style={{
                                display: 'none',
                                fontWeight: 800,
                                fontSize: '22px',
                                color: '#6B1535',
                                letterSpacing: '3px',
                                fontFamily: 'serif'
                            }}
                        >
                            EVE
                        </span>
                        <span style={{
                            fontSize: '9px',
                            color: '#8B2252',
                            fontStyle: 'italic',
                            letterSpacing: '1px',
                            marginTop: '1px'
                        }}>
                            Her life. Her care.
                        </span>
                    </div>
                </div>

                {/* CENTER: Desktop Links */}
                <div className="hidden md:flex items-center gap-8 h-full pt-1">
                    <NavLink to="/" className={navLinkClass}>الرئيسية</NavLink>
                    <NavLink to="/doctors" className={navLinkClass}>الأطباء</NavLink>
                    <NavLink to="/health" className={navLinkClass}>صحتي</NavLink>
                    <NavLink to="/womens-health" className={navLinkClass}>صحة المرأة</NavLink>
                    <NavLink to="/medications" className={navLinkClass}>الأدوية</NavLink>
                    <NavLink to="/about" className={navLinkClass}>من نحن</NavLink>
                </div>

                {/* LEFT SIDE: User Profile / Login */}
                <div className="flex items-center gap-3 relative" dir="ltr">
                    {isLoggedIn && currentUser ? (
                        <div className="flex items-center gap-3 relative cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <div className="flex-col items-end hidden md:flex" dir="rtl">
                                <span className="font-bold text-slate-800 text-[11px] leading-tight mt-1" style={{ color: '#6B1535' }}>
                                    {currentUser.name}
                                </span>
                                <span className="text-[10px] px-2 py-[2px] rounded-full text-white font-semibold mt-1 inline-block" style={{ backgroundColor: bundleData.color === 'gray' ? '#94A3B8' : bundleData.color === 'blue' ? '#3B82F6' : bundleData.color === 'purple' ? '#8B5CF6' : '#EF4444' }}>
                                    {bundleData.nameAr}
                                </span>
                            </div>
                            <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full font-bold select-none" style={{ backgroundColor: '#FDE8EF', border: '2px solid #C2185B', color: '#6B1535', fontSize: '15px' }}>
                                {currentUser.name.charAt(0).toUpperCase()}
                            </div>
                            
                            {dropdownOpen && (
                                <div className="absolute top-[52px] right-0 w-[180px] bg-white rounded-[12px] shadow-lg border p-2 z-50 text-right" style={{ borderColor: '#F9D0DF' }} dir="rtl">
                                    <button onClick={(e) => { e.stopPropagation(); handleToast('قريباً...'); }} className="w-full text-right px-3 py-2 text-sm font-bold text-slate-700 hover:bg-[#FFF5F8] rounded-lg transition-colors flex items-center gap-2">
                                        <span>👤</span> <span>حسابي</span>
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); handleToast('قريباً...'); }} className="w-full text-right px-3 py-2 text-sm font-bold text-slate-700 hover:bg-[#FFF5F8] rounded-lg transition-colors flex items-center gap-2">
                                        <span>⚙️</span> <span>الإعدادات</span>
                                    </button>
                                    <div className="h-px w-full my-1 bg-[#F9D0DF]"></div>
                                    <button onClick={(e) => { e.stopPropagation(); signOut(); }} className="w-full text-right px-3 py-2 text-sm font-bold text-[#EF4444] hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
                                        <span>🚪</span> <span>تسجيل الخروج</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2" dir="rtl">
                            <button
                                onClick={() => navigate('/signin')}
                                className="px-5 py-1.5 rounded-full font-bold text-sm transition"
                                style={{ backgroundColor: 'transparent', color: '#C2185B', border: '1.5px solid #C2185B' }}
                                onMouseEnter={e => { e.target.style.backgroundColor = '#FDE8EF' }}
                                onMouseLeave={e => { e.target.style.backgroundColor = 'transparent' }}
                            >
                                دخول
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-white px-5 py-1.5 rounded-full font-bold text-sm transition"
                                style={{ backgroundColor: '#C2185B' }}
                                onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                                onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                            >
                                تسجيل
                            </button>
                        </div>
                    )}

                    {/* MOBILE Toggle */}
                    <button className="md:hidden text-slate-600 mt-1" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </nav>

            {/* MOBILE Navigation Drawer */}
            {menuOpen && (
                <div className="fixed top-16 left-0 right-0 bg-white border-b border-[#F9D0DF] shadow-lg z-40 p-4 flex flex-col gap-4 md:hidden" dir="rtl">
                    <NavLink to="/" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">الرئيسية</NavLink>
                    <NavLink to="/doctors" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">الأطباء</NavLink>
                    <NavLink to="/health" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">صحتي</NavLink>
                    <NavLink to="/womens-health" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">صحة المرأة</NavLink>
                    <NavLink to="/medications" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">الأدوية</NavLink>
                    <NavLink to="/about" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">من نحن</NavLink>
                </div>
            )}

            {/* MOBILE Bottom Action Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#F9D0DF] pb-safe z-40 flex justify-around" dir="rtl">
                <NavLink to="/" className={({ isActive }) => `flex flex-col items-center p-3 w-full ${isActive ? 'text-[#C2185B]' : 'text-slate-400'}`}>
                    <HomeIcon size={20} className="mb-1" />
                    <span className="text-[10px] font-bold">الرئيسية</span>
                </NavLink>
                <NavLink to="/doctors" className={({ isActive }) => `flex flex-col items-center p-3 w-full ${isActive ? 'text-[#C2185B]' : 'text-slate-400'}`}>
                    <Users size={20} className="mb-1" />
                    <span className="text-[10px] font-bold">الأطباء</span>
                </NavLink>
                <NavLink to="/health" className={({ isActive }) => `flex flex-col items-center p-3 w-full ${isActive ? 'text-[#C2185B]' : 'text-slate-400'}`}>
                    <HeartPulse size={20} className="mb-1" />
                    <span className="text-[10px] font-bold">صحتي</span>
                </NavLink>
                <NavLink to="/womens-health" className={({ isActive }) => `flex flex-col items-center p-3 w-full ${isActive ? 'text-[#C2185B]' : 'text-slate-400'}`}>
                    <Heart size={20} className="mb-1" />
                    <span className="text-[10px] font-bold">المرأة</span>
                </NavLink>
                <NavLink to="/medications" className={({ isActive }) => `flex flex-col items-center p-3 w-full ${isActive ? 'text-[#C2185B]' : 'text-slate-400'}`}>
                    <Pill size={20} className="mb-1" />
                    <span className="text-[10px] font-bold">الأدوية</span>
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => `flex flex-col items-center p-3 w-full ${isActive ? 'text-[#C2185B]' : 'text-slate-400'}`}>
                    <Info size={20} className="mb-1" />
                    <span className="text-[10px] font-bold">من نحن</span>
                </NavLink>
            </div>
        </>
    )
}
