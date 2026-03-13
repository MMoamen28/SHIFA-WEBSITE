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

function AppInner({ setToast }) {
    const { medPopup, dismissMed, snoozeMed, apptPopup, dismissAppt } = usePopupReminder()

    return (
        <div className="min-h-screen bg-[#F8FAFC]" dir="rtl">
            <Navbar />
            <main className="pt-16 pb-20 md:pb-0">
                <Routes>
                    <Route path="/" element={<Home setToast={setToast} />} />
                    <Route path="/doctors" element={<Doctors setToast={setToast} />} />
                    <Route path="/health" element={<Health setToast={setToast} />} />
                    <Route path="/womens-health" element={<WomensHealth setToast={setToast} />} />
                    <Route path="/medications" element={<Medications setToast={setToast} />} />
                    <Route path="/payment" element={<Payment setToast={setToast} />} />
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
            <AppInner setToast={(msg, type) => setToast({ msg, type })} />
            {toast && <Toast message={toast.msg} type={toast.type || 'success'} onClose={() => setToast(null)} />}
        </BrowserRouter>
    )
}
