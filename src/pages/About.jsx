// src/pages/About.jsx
export default function About() {
    const cardStyle = {
        background: '#FFFFFF',
        borderRadius: '20px',
        boxShadow: '0 4px 24px rgba(194, 24, 91, 0.08)',
        border: '1px solid #F9D0DF',
        padding: '2rem',
        borderTop: '4px solid #C2185B',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.3s ease'
    }

    const titleStyle = {
        color: '#6B1535',
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '1rem',
        letterSpacing: '0.5px'
    }

    const bodyStyle = {
        color: '#374151',
        fontSize: '15px',
        lineHeight: 1.9,
        flex: 1
    }

    const handleMouseEnter = (e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(194, 24, 91, 0.15)'
        e.currentTarget.style.transform = 'translateY(-2px)'
    }

    const handleMouseLeave = (e) => {
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(194, 24, 91, 0.08)'
        e.currentTarget.style.transform = 'translateY(0)'
    }

    const values = [
        { label: 'Empowerment', desc: 'Helping women reach their goals.' },
        { label: 'Holistic Care', desc: 'Supporting all aspects of life.' },
        { label: 'Respect', desc: "Valuing every woman's uniqueness." },
        { label: 'Growth', desc: 'Encouraging learning and development.' },
        { label: 'Trust', desc: 'Providing reliable guidance.' },
        { label: 'Creativity', desc: 'Making the journey inspiring and enjoyable.' },
    ]

    return (
        <div style={{ background: '#FFF5F8', minHeight: '100vh', padding: '2rem 1rem' }} dir="rtl">

            {/* Logo + Title Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <img src="/logo.png" alt="EVE" style={{ height: '100px', margin: '0 auto 1rem', display: 'block' }} />
                <h1 style={{ color: '#6B1535', fontSize: '32px', fontWeight: 800 }}>من نحن</h1>
                <p style={{ color: '#C2185B', fontStyle: 'italic', fontSize: '14px', letterSpacing: '2px' }}>· Her life. Her care ·</p>
                <div style={{ color: '#F5B8CE', fontSize: '20px', letterSpacing: '6px', margin: '1.5rem 0' }}>
                    ✦ ✦ ✦
                </div>
            </div>

            {/* STRICT 2x2 GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4" dir="ltr">

                {/* BLOCK 1 — OUR CORE VALUES (top left) */}
                <div style={{ ...cardStyle, gridColumn: '1', gridRow: '1' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <h2 style={titleStyle}>OUR CORE VALUES</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                        {values.map((v, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                                <span style={{ color: '#C2185B', fontSize: '18px', lineHeight: '1.6' }}>●</span>
                                <p style={{ margin: 0, color: '#374151', fontSize: '15px', lineHeight: '1.8' }}>
                                    <strong style={{ color: '#6B1535' }}>{v.label}:</strong> {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BLOCK 2 — Our Vision (top right) */}
                <div style={{ ...cardStyle, gridColumn: '2', gridRow: '1' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <h2 style={titleStyle}>Our Vision</h2>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{
                            position: 'absolute', top: '-20px', right: '-10px',
                            fontSize: '120px', color: '#F5B8CE', opacity: 0.5,
                            fontFamily: 'serif', lineHeight: 1, zIndex: 0,
                            userSelect: 'none', pointerEvents: 'none'
                        }}>"</span>
                        <p style={{ position: 'relative', zIndex: 1, color: '#374151', fontSize: '15px', lineHeight: '1.9' }}>
                            To become the leading digital health platform for women in Egypt
                            and the region, offering comprehensive, personalized care including
                            health tracking, telemedicine, mental and nutritional support,
                            and integration with advanced technologies for all life stages.
                        </p>
                    </div>
                </div>

                {/* BLOCK 3 — ABOUT US (bottom left) */}
                <div style={{ ...cardStyle, gridColumn: '1', gridRow: '2' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <h2 style={titleStyle}>ABOUT US</h2>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ margin: 0, color: '#374151', fontSize: '15px', lineHeight: '1.9' }}>
                            EVE is a women's health and wellness platform founded in 2026 to
                            support women at every stage of life. It offers personalized health
                            tracking, reproductive guidance, self-care resources, and community
                            support.
                        </p>
                        <p style={{ margin: 0, color: '#374151', fontSize: '15px', lineHeight: '1.9' }}>
                            We aim to empower women to take control of their well-being, make
                            informed health decisions, and thrive physically, mentally, and
                            emotionally. By providing reliable information, integrated tools, and
                            a supportive community, EVE encourages, enables, and facilitates
                            women's active participation in all aspects of life — health, family,
                            work, and personal growth — while changing perceptions about
                            women's empowerment.
                        </p>
                    </div>
                </div>

                {/* BLOCK 4 — Our Mission (bottom right) */}
                <div style={{ ...cardStyle, gridColumn: '2', gridRow: '2' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <h2 style={titleStyle}>Our Mission</h2>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <span style={{
                                position: 'absolute', left: '-10px', top: '-10px',
                                fontSize: '80px', color: '#F5B8CE', opacity: 0.4,
                                lineHeight: 1, userSelect: 'none', pointerEvents: 'none'
                            }}>♀</span>
                            <p style={{ position: 'relative', color: '#374151', fontSize: '15px', lineHeight: '1.9', marginBottom: '1.5rem', zIndex: 1 }}>
                                To empower women at every stage of life with a simple, centralized
                                platform that tracks health, provides personalized guidance, and
                                fosters community support, helping them make informed decisions,
                                prioritize well-being, and thrive.
                            </p>
                        </div>

                        {/* Stat pills container */}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '1rem' }} dir="rtl">
                            <div style={{
                                display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                                background: '#FDE8EF', color: '#6B1535', borderRadius: '9999px',
                                padding: '8px 20px', fontWeight: 700, fontSize: '13px', gap: '2px'
                            }}>
                                <span style={{ fontSize: '16px' }}>💗</span>
                                <span>٢٠٢٦</span>
                                <span style={{ fontSize: '11px', fontWeight: 400, color: '#C2185B' }}>تأسست عام</span>
                            </div>
                            
                            <div style={{
                                display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                                background: '#FDE8EF', color: '#6B1535', borderRadius: '9999px',
                                padding: '8px 20px', fontWeight: 700, fontSize: '13px', gap: '2px'
                            }}>
                                <span style={{ fontSize: '16px' }}>🌍</span>
                                <span>مصر والمنطقة</span>
                                <span style={{ fontSize: '11px', fontWeight: 400, color: '#C2185B' }}>نطاق الخدمة</span>
                            </div>
                            
                            <div style={{
                                display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                                background: '#FDE8EF', color: '#6B1535', borderRadius: '9999px',
                                padding: '8px 20px', fontWeight: 700, fontSize: '13px', gap: '2px'
                            }}>
                                <span style={{ fontSize: '16px' }}>👩</span>
                                <span>لكل امرأة</span>
                                <span style={{ fontSize: '11px', fontWeight: 400, color: '#C2185B' }}>الفئة المستهدفة</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom decorative strip */}
            <div style={{
                marginTop: '3rem',
                textAlign: 'center',
                color: '#F5B8CE',
                fontSize: '28px',
                letterSpacing: '8px'
            }}>
                ✦ ✦ ✦
            </div>
        </div>
    )
}
