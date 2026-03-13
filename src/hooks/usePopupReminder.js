// src/hooks/usePopupReminder.js
import { useState, useEffect } from 'react'
import { getCurrentTime } from '../utils/dateHelpers'

export const usePopupReminder = () => {
    const [medPopup, setMedPopup] = useState(null)
    const [apptPopup, setApptPopup] = useState(null)

    useEffect(() => {
        const check = () => {
            const now = getCurrentTime()
            const nowMs = Date.now()

            // Medicine reminders
            const meds = JSON.parse(localStorage.getItem('eve_meds') || '[]')
            for (const med of meds) {
                if (med.times?.includes(now)) {
                    setMedPopup({ name: med.name, time: now, id: med.id })
                    break
                }
            }

            // Appointment reminders (60 min before)
            const appts = JSON.parse(localStorage.getItem('eve_appts') || '[]')
            for (const appt of appts) {
                const apptMs = new Date(appt.dateTime).getTime()
                const diffMin = (apptMs - nowMs) / 60000
                if (diffMin > 0 && diffMin <= 60 && appt.status === 'confirmed') {
                    setApptPopup({ doctorName: appt.doctorName, dateTime: appt.dateTime })
                    break
                }
            }

            if (process.env.NODE_ENV === 'development') {
                console.log(`[reminder] checking at ${now} — ${meds.length} meds, ${appts.length} appts`)
            }
        }

        check()
        const interval = setInterval(check, 60000)
        return () => clearInterval(interval)
    }, [])

    return {
        medPopup, dismissMed: () => setMedPopup(null),
        apptPopup, dismissAppt: () => setApptPopup(null),
        snoozeMed: (med) => {
            setMedPopup(null)
            setTimeout(() => setMedPopup(med), 10 * 60 * 1000)
        }
    }
}
