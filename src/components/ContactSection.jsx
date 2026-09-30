'use client';

import { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SpaceDustCanvas from './SpaceDustCanvas';

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [isMobile, setIsMobile] = useState(false);
    const [status, setStatus] = useState('IDLE'); // 'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e) => setIsMobile(e.matches);
        setIsMobile(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setStatus('ERROR');
            setErrorMessage('Please fill out all required fields: Name, Email, and Message.');
            return;
        }

        setStatus('SENDING');
        setErrorMessage('');

        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            // Local development simulation fallback if env variable is not set yet
            console.warn(
                "Web3Forms access key (NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) is missing in environment variables. Simulating email submission in development mode."
            );

            setTimeout(() => {
                setStatus('SUCCESS');
                setForm({ name: '', email: '', subject: '', message: '' });
            }, 1800);
            return;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    name: form.name,
                    email: form.email,
                    subject: form.subject || 'Portfolio Contact Message',
                    message: form.message,
                    from_name: `${form.name} (Portfolio Site)`
                })
            });

            const data = await response.json();

            if (data.success) {
                setStatus('SUCCESS');
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('ERROR');
                setErrorMessage(data.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('ERROR');
            setErrorMessage('A network error occurred. Please check your connection and try again.');
        }
    };

    return (
        <section id="contact" style={{
            minHeight: '100vh',
            background: 'var(--about-bg)',
            padding: isMobile ? '60px 20px' : '100px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Modern Developer Background Grid */}
            <div className="site-grid-pattern" />

            {/* Animated space dust and nebula background */}
            <SpaceDustCanvas />

            {/* Custom Premium Stylesheet */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .contact-tag {
                    background: linear-gradient(135deg, var(--accent-purple) 0%, #563be8 100%);
                    padding: 8px 28px;
                    border-radius: 20px;
                    font-weight: 600;
                    font-size: 14px;
                    margin-bottom: 40px;
                    box-shadow: 0 4px 15px rgba(61, 47, 196, 0.3);
                    color: white;
                    z-index: 10;
                    letter-spacing: 0.5px;
                    position: relative;
                }
                .contact-card {
                    max-width: 1000px;
                    width: 100%;
                    background: var(--card-bg-glass);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-radius: 20px;
                    border: 1px solid var(--border-color);
                    padding: 48px;
                    display: flex;
                    gap: 48px;
                    position: relative;
                    z-index: 10;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
                                0 0 40px rgba(108, 99, 255, 0.05),
                                inset 0 1px 0 rgba(255, 255, 255, 0.05);
                    transition: border-color 0.4s ease, box-shadow 0.4s ease;
                }
                .contact-card:hover {
                    border-color: rgba(108, 99, 255, 0.3);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6),
                                0 0 50px rgba(108, 99, 255, 0.12),
                                inset 0 1px 0 rgba(255, 255, 255, 0.08);
                }
                .input-container {
                    margin-bottom: 20px;
                }
                .input-label {
                    display: block;
                    color: var(--text-muted);
                    font-size: 13px;
                    margin-bottom: 6px;
                    font-weight: 500;
                    transition: color 0.3s ease;
                }
                .input-field {
                    width: 100%;
                    padding: 12px 16px;
                    background: var(--toggle-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 10px;
                    color: var(--text-primary);
                    font-size: 14px;
                    outline: none;
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                .input-field:focus {
                    border-color: var(--accent-purple-bright);
                    background: rgba(6, 10, 32, 0.8);
                    box-shadow: 0 0 15px rgba(108, 99, 255, 0.25);
                }
                .input-container:focus-within .input-label {
                    color: var(--accent-purple-bright);
                }
                .submit-btn {
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(135deg, var(--accent-purple) 0%, #563be8 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 15px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    box-shadow: 0 4px 15px rgba(61, 47, 196, 0.4);
                }
                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(108, 99, 255, 0.45);
                    background: linear-gradient(135deg, #4b39e2 0%, var(--accent-purple-bright) 100%);
                }
                .submit-btn:active:not(:disabled) {
                    transform: translateY(0);
                }
                .submit-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .social-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: var(--text-muted);
                    text-decoration: none;
                    font-size: 14px;
                    margin-bottom: 18px;
                    transition: all 0.25s ease;
                    word-break: break-all;
                }
                .social-link:hover {
                    color: white;
                    transform: translateX(4px);
                }
                .social-icon-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 34px;
                    height: 34px;
                    background: rgba(30, 42, 94, 0.3);
                    border: 1px solid rgba(30, 42, 94, 0.6);
                    border-radius: 8px;
                    transition: all 0.25s ease;
                }
                .social-link:hover .social-icon-box {
                    background: rgba(108, 99, 255, 0.15);
                    border-color: var(--accent-purple-bright);
                    box-shadow: 0 0 10px rgba(108, 99, 255, 0.2);
                }
                .success-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 40px 10px;
                    animation: elementFadeIn 0.5s ease forwards;
                }
                .success-circle {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #10b981;
                    margin-bottom: 24px;
                    box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
                }
                .env-warning {
                    background: rgba(245, 158, 11, 0.1);
                    border: 1px solid rgba(245, 158, 11, 0.3);
                    border-radius: 8px;
                    padding: 12px 16px;
                    color: #f59e0b;
                    font-size: 13px;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    line-height: 1.5;
                }
                @keyframes elementFadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 768px) {
                    .contact-card {
                        padding: 28px 20px;
                        flex-direction: column;
                        gap: 40px;
                    }
                }
            ` }} />

            {/* Label Tag */}
            <div className="contact-tag">
                Get In Touch
            </div>

            {/* Glassmorphism Card */}
            <div className="contact-card">

                {/* Left Form Section */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {status === 'SUCCESS' ? (
                        <div className="success-wrapper">
                            <div className="success-circle">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: 'white' }}>
                                Message Sent!
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', maxWidth: '400px', marginBottom: '28px' }}>
                                Thank you for reaching out. I have received your message and will get back to you as soon as possible.
                            </p>
                            <button
                                onClick={() => setStatus('IDLE')}
                                className="submit-btn"
                                style={{ maxWidth: '200px' }}
                            >
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>


                            <div style={{
                                display: 'flex',
                                gap: '16px',
                                flexDirection: isMobile ? 'column' : 'row',
                            }}>
                                <div className="input-container" style={{ flex: 1 }}>
                                    <label className="input-label">Name *</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        disabled={status === 'SENDING'}
                                        className="input-field"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="input-container" style={{ flex: 1 }}>
                                    <label className="input-label">Email *</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        disabled={status === 'SENDING'}
                                        className="input-field"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div className="input-container">
                                <label className="input-label">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    disabled={status === 'SENDING'}
                                    className="input-field"
                                    placeholder="What is this about?"
                                />
                            </div>

                            <div className="input-container" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <label className="input-label">Message *</label>
                                <textarea
                                    required
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    disabled={status === 'SENDING'}
                                    rows={5}
                                    className="input-field"
                                    style={{ resize: 'vertical', minHeight: '120px', flexGrow: 1 }}
                                    placeholder="Tell me about your project or inquiry..."
                                />
                            </div>

                            {status === 'ERROR' && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: '#ef4444',
                                    fontSize: '13px',
                                    marginBottom: '16px',
                                    animation: 'elementFadeIn 0.3s ease'
                                }}>
                                    <AlertCircle size={16} />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'SENDING'}
                                className="submit-btn"
                            >
                                {status === 'SENDING' ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Sending Message...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Right Info Section */}
                <div style={{
                    width: isMobile ? '100%' : '280px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    textAlign: isMobile ? 'center' : 'left',
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Get in touch
                    </p>
                    <h3 style={{
                        fontSize: isMobile ? '28px' : '36px',
                        fontWeight: '800',
                        lineHeight: '1.25',
                        marginBottom: '36px',
                        color: 'var(--text-primary)',
                    }}>
                        Let&apos;s work<br />
                        <span style={{
                            background: 'linear-gradient(90deg, #ffffff 0%, var(--accent-purple-bright) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>together</span>
                    </h3>

                    {/* Social/Contact Links */}
                    <div style={{ width: '100%' }}>
                        {[
                            {
                                icon: Mail,
                                text: 'manushawijerathna02@gmail.com',
                                href: 'mailto:manushawijerathna02@gmail.com'
                            },
                            {
                                icon: FaLinkedin,
                                text: 'linkedin.com/in/manusha-nuwan',
                                href: 'https://www.linkedin.com/in/manusha-nuwan-b674a62bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
                            },
                            {
                                icon: FaGithub,
                                text: 'github.com/Manusha-N-Wijerathna',
                                href: 'https://github.com/Manusha-N-Wijerathna'
                            },
                        ].map(({ icon: Icon, text, href }) => (
                            <a
                                key={text}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="social-link"
                            >
                                <div className="social-icon-box">
                                    <Icon size={16} />
                                </div>
                                <span>{text}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}