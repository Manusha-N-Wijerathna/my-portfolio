'use client';

import { useState, useEffect } from 'react';
import { Mail, Users, GitBranch } from 'lucide-react';
import { FaGithub ,FaLinkedin} from 'react-icons/fa';

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e) => setIsMobile(e.matches);
        setIsMobile(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const inputStyle = {
        width: '100%',
        padding: isMobile ? '10px 12px' : '10px 14px',
        background: 'transparent',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        color: 'white',
        fontSize: isMobile ? '13px' : '14px',
        outline: 'none',
    };

    const labelStyle = {
        display: 'block',
        color: 'var(--text-muted)',
        fontSize: isMobile ? '12px' : '13px',
        marginBottom: '6px',
    };

    return (
        <section id="contact" style={{
            minHeight: '100vh',
            background: 'var(--bg-secondary)',
            padding: isMobile ? '60px 20px' : '80px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>

            {/* Label */}
            <div style={{
                background: 'var(--accent-purple)',
                padding: '8px 28px',
                borderRadius: '20px',
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: isMobile ? '36px' : '60px',
            }}>
                Contact me
            </div>

            {/* Card */}
            <div style={{
                maxWidth: '1000px',
                width: '100%',
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                padding: isMobile ? '24px' : '48px',
                display: 'flex',
                gap: isMobile ? '32px' : '48px',
                flexDirection: isMobile ? 'column' : 'row',
            }}>

                {/* Form */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        marginBottom: '16px',
                        flexDirection: isMobile ? 'column' : 'row',
                    }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Name</label>
                            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Email</label>
                            <input name="email" value={form.email} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>Subject</label>
                        <input name="subject" value={form.subject} onChange={handleChange} style={inputStyle} />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={labelStyle}>Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={5}
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </div>

                    <button style={{
                        width: '100%',
                        padding: '13px',
                        background: 'var(--accent-purple)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: isMobile ? '14px' : '15px',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                        Send Message
                    </button>
                </div>

                {/* Right — Contact Info */}
                <div style={{
                    width: isMobile ? '100%' : '260px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    textAlign: isMobile ? 'center' : 'left',
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>Get in touch</p>
                    <h3 style={{
                        fontSize: isMobile ? '26px' : '32px',
                        fontWeight: '800',
                        lineHeight: '1.2',
                        marginBottom: '32px',
                    }}>
                        Let's work<br />together
                    </h3>

                        {[
                        { icon: Mail, text: 'manushaugcnuwan@gmail.com', href: 'mailto:manushaugcnuwan@gmail.com' },
                        { icon: FaLinkedin, text: 'linkedin.com/in/manusha_nuwan', href: 'https://linkedin.com/in/manusha_nuwan' },
                        { icon: FaGithub, text: 'github.com/Manusha-N-Wijerathna', href: 'https://github.com/Manusha-N-Wijerathna' },
                    ].map(({ icon: Icon, text, href }) => (
                        <a key={text} href={href} target="_blank" rel="noreferrer" style={{
                            display: 'flex',
                            alignItems: isMobile ? 'center' : 'center',
                            gap: '12px',
                            color: 'var(--text-muted)',
                            textDecoration: 'none',
                            fontSize: isMobile ? '12px' : '13px',
                            marginBottom: '16px',
                            transition: 'color 0.2s',
                            wordBreak: 'break-all',
                        }}
                            onMouseEnter={e => e.currentTarget.style.color = 'white'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            <Icon size={16} style={{ flexShrink: 0 }} />
                            {text}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}