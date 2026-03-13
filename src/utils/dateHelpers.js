// src/utils/dateHelpers.js
// Format date to Arabic locale
export const formatDateAr = (date) =>
    new Date(date).toLocaleDateString('ar-EG', {
        year: 'numeric', month: 'long', day: 'numeric'
    })

// Add days to a date
export const addDays = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

// Difference in days between two dates
export const diffDays = (date1, date2) =>
    Math.floor((new Date(date1) - new Date(date2)) / (1000 * 60 * 60 * 24))

// Get current HH:MM
export const getCurrentTime = () => {
    const now = new Date()
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

// Get pregnancy week from LMP date
export const getPregnancyWeek = (lmpDate) =>
    Math.floor(diffDays(new Date(), new Date(lmpDate)) / 7)

// Get trimester label
export const getTrimester = (week) => {
    if (week <= 12) return 'الثلث الأول 🌱'
    if (week <= 27) return 'الثلث الثاني 🌿'
    return 'الثلث الثالث 🌳'
}

// Pregnancy milestones
export const MILESTONES = {
    4: 'البويضة المخصبة تنغرس في الرحم',
    8: 'يبدأ القلب بالنبض',
    12: 'تكتمل أعضاء الجنين الرئيسية',
    16: 'يمكن معرفة جنس المولود',
    20: 'يبدأ الطفل بالتحرك والركل',
    24: 'الجنين يسمع صوتك',
    28: 'عيون الجنين تفتح وتغلق',
    32: 'الجنين يأخذ وضع الولادة',
    36: 'الجنين يصبح جاهزاً للولادة',
    40: 'موعد الولادة قريب! 🎉',
}

export const getMilestone = (week) => {
    const keys = Object.keys(MILESTONES).map(Number).sort((a, b) => a - b)
    const key = keys.reverse().find(k => week >= k)
    return key ? MILESTONES[key] : 'تابعي رحلتك مع شفا 💚'
}
