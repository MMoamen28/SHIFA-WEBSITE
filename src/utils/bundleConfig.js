// src/utils/bundleConfig.js
export const BUNDLES = {
    essential: {
        name: 'Essential',
        nameAr: 'الأساسية',
        emoji: '⚪',
        price: 'مجاناً',
        priceNum: 0,
        color: 'gray',
        borderColor: '#94A3B8',
        features: [
            'الوصول لجميع الصفحات',
            'حجز المواعيد',
            'تتبع الصحة والدورة',
            'بدون تذكير الأدوية',
            'بدون استشارات أونلاين',
        ],
    },
    plus: {
        name: 'Plus',
        nameAr: 'بلس',
        emoji: '🔵',
        price: '49 ج.م/شهر',
        priceNum: 49,
        color: 'blue',
        borderColor: '#3B82F6',
        features: [
            'كل مزايا الأساسية',
            'تذكير الأدوية',
            'استشارة أونلاين مجانية شهرياً',
            'وصفات طبية رقمية',
            'تحليل المزاج',
            'تتبع متقدم للدورة',
        ],
    },
    premium: {
        name: 'Premium',
        nameAr: 'بريميوم',
        emoji: '🟣',
        price: '99 ج.م/شهر',
        priceNum: 99,
        color: 'purple',
        borderColor: '#8B5CF6',
        popular: true,
        features: [
            'كل مزايا بلس',
            '3 استشارات مجانية شهرياً',
            'تحليل الأعراض بالذكاء الاصطناعي',
            'لوحة تحكم الأمراض المزمنة',
            'نصائح تغذوية شخصية',
            'إرشادات الصحة الهرمونية والجلدية',
        ],
    },
    ultimate: {
        name: 'Ultimate',
        nameAr: 'الشاملة',
        emoji: '🔴',
        price: '199 ج.م/شهر',
        priceNum: 199,
        color: 'red',
        borderColor: '#EF4444',
        features: [
            'كل مزايا بريميوم',
            'استشارات أونلاين غير محدودة',
            'مساعد AI صحي كامل',
            'جلسة علاج نفسي شهرية',
            'حجز VIP بأولوية مضمونة',
            'دعم على مدار الساعة 24/7',
            'خصومات حصرية مع الأطباء',
        ],
    },
}

export const BUNDLE_ORDER = ['essential', 'plus', 'premium', 'ultimate']

export const hasAccess = (userBundle, requiredBundle) => {
    return BUNDLE_ORDER.indexOf(userBundle) >= BUNDLE_ORDER.indexOf(requiredBundle)
}
