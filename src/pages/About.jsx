// src/pages/About.jsx
export default function About() {
    const cardStyle = {
        background: '#FFFFFF',
        borderRadius: '20px',
        boxShadow: '0 4px 24px rgba(107,21,53,0.08)',
        border: '1px solid #F9D0DF',
        padding: '2rem',
        borderTop: '4px solid #C2185B',
    }

    const titleStyle = {
        color: '#6B1535',
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '1rem'
    }

    const bodyStyle = {
        color: '#334155',
        fontSize: '15px',
        lineHeight: 1.9
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
        <div style={{ background: '#FFF5F8', minHeight: '100vh', padding: '2rem 1rem' }}>

            {/* Logo + Title Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <img src="/logo.png" alt="EVE" style={{ height: '100px', margin: '0 auto 1rem', display: 'block' }} />
                <h1 style={{ color: '#6B1535', fontSize: '32px', fontWeight: 800 }}>من نحن</h1>
                <p style={{ color: '#C2185B', fontStyle: 'italic', fontSize: '14px', letterSpacing: '2px' }}>· Her life. Her care ·</p>
            </div>

            {/* 2x2 Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1100px',
                margin: '0 auto'
            }}>

                {/* Block 1 — Core Values (TOP RIGHT) */}
                <div style={cardStyle}>
                    <h2 style={titleStyle}>OUR CORE VALUES</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {values.map((v, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                <span style={{ color: '#C2185B', fontSize: '12px', marginTop: '6px', flexShrink: 0 }}>●</span>
                                <p style={bodyStyle}>
                                    <strong style={{ color: '#6B1535' }}>{v.label}:</strong> {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Block 2 — Vision (TOP LEFT) */}
                <div style={{ ...cardStyle, position: 'relative', overflow: 'hidden' }}>
                    {/* Decorative quote mark */}
                    <div style={{
                        position: 'absolute', top: '-10px', left: '10px',
                        fontSize: '80px', color: '#F5B8CE', opacity: 0.3,
                        fontFamily: 'serif', pointerEvents: 'none', lineHeight: 1
                    }}>"</div>
                    <h2 style={titleStyle}>Our Vision</h2>
                    <p style={{ ...bodyStyle, position: 'relative', zIndex: 1 }}>
                        To become the leading digital health platform for women in Egypt
                        and the region, offering comprehensive, personalized care including
                        health tracking, telemedicine, mental and nutritional support, and
                        integration with advanced technologies for all life stages.
                    </p>
                </div>

                {/* Block 3 — About Us (BOTTOM RIGHT) */}
                <div style={cardStyle}>
                    <h2 style={titleStyle}>ABOUT US</h2>
                    <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
                        EVE is a women's health and wellness platform founded in 2026 to
                        support women at every stage of life. It offers personalized health
                        tracking, reproductive guidance, self-care resources, and community
                        support.
                    </p>
                    <p style={bodyStyle}>
                        We aim to empower women to take control of their well-being, make
                        informed health decisions, and thrive physically, mentally, and
                        emotionally. By providing reliable information, integrated tools,
                        and a supportive community, EVE encourages, enables, and facilitates
                        women's active participation in all aspects of life — health, family,
                        work, and personal growth — while changing perceptions about
                        women's empowerment.
                    </p>
                </div>

                {/* Block 4 — Mission (BOTTOM LEFT) */}
                <div style={{ ...cardStyle, position: 'relative', overflow: 'hidden' }}>
                    {/* Decorative female symbol */}
                    <div style={{
                        position: 'absolute', bottom: '10px', left: '10px',
                        fontSize: '64px', color: '#F5B8CE', opacity: 0.3,
                        pointerEvents: 'none', lineHeight: 1
                    }}>♀</div>
                    <h2 style={titleStyle}>Our Mission</h2>
                    <p style={{ ...bodyStyle, position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
                        To empower women at every stage of life with a simple, centralized
                        platform that tracks health, provides personalized guidance, and
                        fosters community support, helping them make informed decisions,
                        prioritize well-being, and thrive.
                    </p>

                    {/* Stat pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', position: 'relative', zIndex: 1 }}>
                        <div style={{
                            background: '#FDE8EF', color: '#6B1535', borderRadius: '9999px',
                            padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px',
                            fontSize: '13px', fontWeight: 600
                        }}>
                            💗 <span>٢٠٢٦</span> <span style={{ fontSize: '11px', opacity: 0.7 }}>تأسست عام</span>
                        </div>
                        <div style={{
                            background: '#FDE8EF', color: '#6B1535', borderRadius: '9999px',
                            padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px',
                            fontSize: '13px', fontWeight: 600
                        }}>
                            🌍 <span>مصر والمنطقة</span> <span style={{ fontSize: '11px', opacity: 0.7 }}>نطاق الخدمة</span>
                        </div>
                        <div style={{
                            background: '#FDE8EF', color: '#6B1535', borderRadius: '9999px',
                            padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px',
                            fontSize: '13px', fontWeight: 600
                        }}>
                            👩 <span>لكل مرأة</span> <span style={{ fontSize: '11px', opacity: 0.7 }}>الفئة المستهدفة</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom decorative strip */}
            <div style={{
                marginTop: '3rem',
                textAlign: 'center',
                color: '#F5B8CE',
                fontSize: '32px',
                letterSpacing: '8px'
            }}>
                ✦ ✦ ✦
            </div>
        </div>
    )
}
