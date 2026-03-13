// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import MedPopup from './components/MedPopup'
import ApptPopup from './components/ApptPopup'
import Toast from './components/Toast'
import { usePopupReminder } from './hooks/usePopupReminder'

import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Health from './pages/Health'
import WomensHealth from './pages/WomensHealth'
import Medications from './pages/Medications'
import Payment from './pages/Payment'
import About from './pages/About'

// ← NEW FILE imports
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AuthGuard from './components/AuthGuard'
import { AuthProvider } from './context/AuthContext'

function AppInner({ setToast }) {
    const { medPopup, dismissMed, snoozeMed, apptPopup, dismissAppt } = usePopupReminder()

    return (
        <div className="min-h-screen bg-[#FFF5F8]" dir="rtl">
            <Navbar setToast={setToast} />
            <main className="pt-16 pb-20 md:pb-0">
                <Routes>
                    <Route path="/" element={<AuthGuard><Home setToast={setToast} /></AuthGuard>} />
                    <Route path="/doctors" element={<AuthGuard><Doctors setToast={setToast} /></AuthGuard>} />
                    <Route path="/health" element={<AuthGuard><Health setToast={setToast} /></AuthGuard>} />
                    <Route path="/womens-health" element={<AuthGuard><WomensHealth setToast={setToast} /></AuthGuard>} />
                    <Route path="/medications" element={<AuthGuard><Medications setToast={setToast} /></AuthGuard>} />
                    <Route path="/payment" element={<AuthGuard><Payment setToast={setToast} /></AuthGuard>} />
                    
                    <Route path="/about" element={<About />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </main>

            {medPopup && <MedPopup med={medPopup} onDismiss={dismissMed} onSnooze={snoozeMed} />}
            {apptPopup && <ApptPopup appt={apptPopup} onDismiss={dismissAppt} />}
        </div>
    )
}

export default function App() {
    const [toast, setToast] = useState(null)

    return (
        <BrowserRouter>
            <AuthProvider>
                <AppInner setToast={(msg, type) => setToast({ msg, type })} />
                {toast && <Toast message={toast.msg} type={toast.type || 'success'} onClose={() => setToast(null)} />}
            </AuthProvider>
        </BrowserRouter>
    )
}
