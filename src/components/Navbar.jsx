// src/components/Navbar.jsx
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Home, Users, HeartPulse, Pill, Heart, Info } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useBundle } from '../hooks/useBundle'
import { BUNDLES } from '../utils/bundleConfig'

export default function Navbar() {
    const [user] = useLocalStorage('eve_user', null)
    const { bundle } = useBundle()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const activeLinkBase = "border-b-2 font-bold transition-all px-1 py-4 "
    const navLinkClass = ({ isActive }) =>
        isActive ? activeLinkBase + "border-[#C2185B] text-[#C2185B]"
            : activeLinkBase + "border-transparent text-slate-600 hover:text-[#C2185B]"

    const bundleData = BUNDLES[bundle] || BUNDLES['essential']

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4 md:px-8 flex items-center justify-between">
                {/* RIGHT SIDE: Logo */}
                <div className="cursor-pointer" onClick={() => navigate('/')}>
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
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end hidden md:flex">
                                <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full text-white font-semibold" style={{ backgroundColor: bundleData.color === 'gray' ? '#94A3B8' : bundleData.color === 'blue' ? '#3B82F6' : bundleData.color === 'purple' ? '#8B5CF6' : '#EF4444' }}>
                                    {bundleData.nameAr}
                                </span>
                            </div>
                            <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold text-sm select-none" style={{ backgroundColor: '#C2185B' }}>
                                {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/payment')}
                            className="text-white px-5 py-1.5 rounded-full font-bold text-sm transition"
                            style={{ backgroundColor: '#C2185B' }}
                            onMouseEnter={e => e.target.style.backgroundColor = '#8B1245'}
                            onMouseLeave={e => e.target.style.backgroundColor = '#C2185B'}
                        >
                            دخول
                        </button>
                    )}

                    {/* MOBILE Toggle */}
                    <button className="md:hidden text-slate-600 mt-1" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </nav>

            {/* MOBILE Navigation Drawer */}
            {menuOpen && (
                <div className="fixed top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-lg z-40 p-4 flex flex-col gap-4 md:hidden">
                    <NavLink to="/" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">الرئيسية</NavLink>
                    <NavLink to="/doctors" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">الأطباء</NavLink>
                    <NavLink to="/health" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">صحتي</NavLink>
                    <NavLink to="/womens-health" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">صحة المرأة</NavLink>
                    <NavLink to="/medications" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">الأدوية</NavLink>
                    <NavLink to="/about" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-[#FDE8EF] font-bold text-slate-700">من نحن</NavLink>
                </div>
            )}

            {/* MOBILE Bottom Action Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#F9D0DF] pb-safe z-40 flex justify-around">
                <NavLink to="/" className={({ isActive }) => `flex flex-col items-center p-3 w-full ${isActive ? 'text-[#C2185B]' : 'text-slate-400'}`}>
                    <Home size={20} className="mb-1" />
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
