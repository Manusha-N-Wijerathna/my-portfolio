'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Mail, GraduationCap, Database, Sparkles, FileText } from 'lucide-react';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Meteor shower canvas for subtle ambient space atmosphere
function MeteorCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const meteors = Array.from({ length: 14 }, () => createMeteor(canvas));

        function createMeteor(c) {
            return {
                x: Math.random() * c.width * 1.4,
                y: Math.random() * c.height - c.height,
                length: Math.random() * 100 + 50,
                speed: Math.random() * 3 + 1.5,
                opacity: Math.random() * 0.4 + 0.15,
                width: Math.random() * 1.2 + 0.6,
            };
        }

        function resetMeteor(m, c) {
            m.x = Math.random() * c.width * 1.4;
            m.y = -m.length;
            m.length = Math.random() * 100 + 50;
            m.speed = Math.random() * 3 + 1.5;
            m.opacity = Math.random() * 0.4 + 0.15;
            m.width = Math.random() * 1.2 + 0.6;
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            meteors.forEach((m) => {
                m.x -= m.speed * 0.35;
                m.y += m.speed;

                if (m.y > canvas.height + m.length || m.x < -m.length) {
                    resetMeteor(m, canvas);
                }

                const gradient = ctx.createLinearGradient(
                    m.x, m.y,
                    m.x + m.length * 0.35, m.y - m.length
                );
                gradient.addColorStop(0, `rgba(108, 99, 255, ${m.opacity})`);
                gradient.addColorStop(1, 'rgba(108, 99, 255, 0)');

                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(m.x + m.length * 0.35, m.y - m.length);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = m.width;
                ctx.lineCap = 'round';
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(m.x, m.y, m.width * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 190, 255, ${m.opacity * 1.2})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                opacity: 0.5,
            }}
        />
    );
}

const ROLES = [
    'IT Undergraduate',
    'Full-Stack Developer',
    'UI/UX Developer'
];

export default function HeroSection() {
    const isMobile = useMediaQuery('(max-width: 900px)');

    // Typing animation states for roles
    const [roleIndex, setRoleIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    // Typewriter cycle effect for the three roles
    useEffect(() => {
        const currentRole = ROLES[roleIndex];
        const speed = isDeleting ? 45 : 90;

        if (!isDeleting && currentText === currentRole) {
            const pauseTimeout = setTimeout(() => setIsDeleting(true), 2000);
            return () => clearTimeout(pauseTimeout);
        }

        if (isDeleting && currentText === '') {
            const nextTimeout = setTimeout(() => {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % ROLES.length);
            }, speed);
            return () => clearTimeout(nextTimeout);
        }

        const timer = setTimeout(() => {
            setCurrentText((prev) =>
                isDeleting
                    ? currentRole.substring(0, prev.length - 1)
                    : currentRole.substring(0, prev.length + 1)
            );
        }, speed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, roleIndex]);

    // Blinking cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    const socialLinks = [
        {
            icon: FaLinkedin,
            href: 'https://www.linkedin.com/in/manusha-nuwan-b674a62bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            label: 'LinkedIn',
        },
        {
            icon: FaGithub,
            href: 'https://github.com/Manusha-N-Wijerathna',
            label: 'GitHub',
        },
        {
            icon: Mail,
            href: 'mailto:manushawijerathna02@gmail.com',
            label: 'Email',
        },
        {
            icon: FaFacebook,
            href: 'https://www.facebook.com/share/1H1GNvRibD/',
            label: 'Facebook',
        },
        {
            icon: FaInstagram,
            href: 'https://www.instagram.com/manusha_nuwan?igsh=MWQxaHRzN2p6a3N3MA==',
            label: 'Instagram',
        },
    ];

    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                background: 'var(--hero-bg)',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '76px',
            }}
        >
            {/* ── Modern Developer Background Grid ── */}
            <div className="hero-grid-pattern" />

            {/* Ambient Background Meteor Canvas */}
            <MeteorCanvas />

            {/* ── RIGHT SIDE: Full-Bleed Background Image Filling Right Side (NO BORDER) ── */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: isMobile ? '100%' : '56%',
                    zIndex: 1,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: isMobile ? 'center' : 'flex-end',
                    opacity: isMobile ? 0.3 : 1,
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Image
                        src="/profile_hero_03.png"
                        alt="Manusha Wijerathna"
                        fill
                        priority
                        sizes="(max-width: 900px) 100vw, 56vw"
                        style={{
                            objectFit: isMobile ? 'cover' : 'contain',
                            objectPosition: isMobile ? 'center 15%' : 'right bottom',
                        }}
                    />
                </div>
            </div>

            {/* ── Black gradient at the bottom across the entire hero section ── */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: '180px',
                    background: 'linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0.75) 40%, transparent 100%)',
                    pointerEvents: 'none',
                    zIndex: 3,
                }}
            />

            {/* Scoped CSS Styles for Left Side Typography and Interactive Buttons */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .hero-content-container {
                    position: relative;
                    width: 100%;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 30px 24px 50px;
                    display: grid;
                    grid-template-columns: 1.15fr 0.85fr;
                    align-items: center;
                    gap: 32px;
                    min-height: calc(100vh - 76px);
                    z-index: 2;
                }

                .hero-left-column {
                    max-width: 620px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                @media (max-width: 900px) {
                    .hero-content-container {
                        grid-template-columns: 1fr;
                        justify-content: center;
                        padding: 30px 20px 60px;
                        text-align: center;
                        gap: 40px;
                    }
                    .hero-left-column {
                        align-items: center;
                        max-width: 100%;
                    }
                }

                /* Name Highlight using existing portfolio accent */
                .hero-name-highlight {
                    color: var(--accent-purple-bright);
                    display: inline-block;
                    position: relative;
                    text-shadow: 0 0 25px rgba(108, 99, 255, 0.45);
                }

                /* Primary CTA button */
                .hero-primary-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 14px 30px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-purple-bright) 100%);
                    color: #ffffff !important;
                    font-weight: 600;
                    font-size: 15px;
                    text-decoration: none;
                    box-shadow: 0 8px 24px rgba(108, 99, 255, 0.35);
                    transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
                    border: none;
                    cursor: pointer;
                }
                .hero-primary-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(108, 99, 255, 0.55);
                    color: #ffffff !important;
                }

                /* Secondary CTA button */
                .hero-secondary-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 13px 28px;
                    border-radius: 12px;
                    background: var(--card-bg-glass);
                    border: 1.5px solid var(--border-color);
                    color: var(--text-primary);
                    font-weight: 600;
                    font-size: 15px;
                    text-decoration: none;
                    transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                }
                .hero-secondary-btn:hover {
                    border-color: var(--accent-purple-bright);
                    background: rgba(108, 99, 255, 0.12);
                    transform: translateY(-2px);
                    color: var(--text-primary);
                }

                /* Social Icon Button */
                .hero-social-btn {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--card-bg-glass);
                    border: 1px solid var(--border-color);
                    color: var(--text-muted);
                    transition: all 0.2s ease;
                    text-decoration: none;
                    backdrop-filter: blur(10px);
                }
                .hero-social-btn:hover {
                    color: var(--accent-purple-bright);
                    border-color: var(--accent-purple-bright);
                    transform: translateY(-3px);
                    box-shadow: 0 6px 18px rgba(108, 99, 255, 0.3);
                }

                /* ── Floating Tech Badges Stage ── */
                .hero-badges-stage {
                    position: relative;
                    width: 100%;
                    height: 520px;
                    pointer-events: none;
                }

                @media (max-width: 900px) {
                    .hero-badges-stage {
                        height: 120px;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 12px;
                    }
                }

                /* Floating Skill / Credential Badges */
                .hero-floating-badge {
                    position: absolute;
                    padding: 8px 14px;
                    border-radius: 14px;
                    background: rgba(13, 18, 53, 0.88);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border: 1px solid var(--border-color);
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(108, 99, 255, 0.15);
                    z-index: 5;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    cursor: default;
                    pointer-events: auto;
                }

                [data-theme="light"] .hero-floating-badge {
                    background: rgba(255, 255, 255, 0.92);
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 0 15px rgba(99, 102, 241, 0.1);
                }

                .hero-floating-badge:hover {
                    transform: scale(1.08) translateY(-4px) !important;
                    border-color: var(--accent-purple-bright);
                    box-shadow: 0 15px 30px -5px rgba(108, 99, 255, 0.4);
                }

                /* Floating animations */
                @keyframes float-badge-1 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes float-badge-2 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(8px); }
                }
                @keyframes float-badge-3 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-7px); }
                }
                @keyframes float-badge-4 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(7px); }
                }

                .badge-top-left {
                    top: 50px;
                    left: 20px;
                    animation: float-badge-1 4.5s ease-in-out infinite;
                }
                .badge-top-right {
                    top: 80px;
                    right: 40px;
                    animation: float-badge-2 5s ease-in-out infinite 0.5s;
                }
                .badge-bottom-left {
                    bottom: 120px;
                    left: 10px;
                    animation: float-badge-3 4.2s ease-in-out infinite 1s;
                }
                .badge-bottom-right {
                    bottom: 90px;
                    right: 50px;
                    animation: float-badge-4 4.8s ease-in-out infinite 1.5s;
                }

                @media (max-width: 900px) {
                    .hero-floating-badge {
                        position: relative;
                        top: auto !important;
                        bottom: auto !important;
                        left: auto !important;
                        right: auto !important;
                        animation: none !important;
                    }
                }

                .hero-badge-icon {
                    width: 30px;
                    height: 30px;
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .icon-purple {
                    background: rgba(108, 99, 255, 0.15);
                    border: 1px solid rgba(108, 99, 255, 0.3);
                    color: var(--accent-purple-bright);
                }
                .icon-blue {
                    background: rgba(59, 130, 246, 0.15);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    color: #60a5fa;
                }
                .icon-gradient {
                    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-bright));
                    color: #ffffff;
                }
                .icon-green {
                    background: rgba(16, 185, 129, 0.15);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    color: #10b981;
                }

                .hero-badge-text {
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                }
                .badge-sub {
                    font-size: 10px;
                    color: var(--text-muted);
                    line-height: 1.1;
                }
                .badge-main {
                    font-size: 12px;
                    font-weight: 700;
                    color: var(--text-primary);
                    line-height: 1.25;
                }
            ` }} />

            {/* ── Main Hero Content Grid ── */}
            <div className="hero-content-container">
                {/* ── LEFT SIDE: Text, Badges, CTA, Socials ── */}
                <div className="hero-left-column">
                    {/* Small Greeting / Intro Pill Badge */}
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 16px',
                            borderRadius: '999px',
                            background: 'rgba(108, 99, 255, 0.12)',
                            border: '1px solid rgba(108, 99, 255, 0.3)',
                            marginBottom: '22px',
                        }}
                    >
                        <span
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#10b981',
                                boxShadow: '0 0 10px #10b981',
                            }}
                        />
                        <span
                            style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: 'var(--accent-purple-bright)',
                                letterSpacing: '0.4px',
                            }}
                        >
                            Available for Opportunities
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1
                        style={{
                            fontSize: isMobile ? '36px' : '58px',
                            fontWeight: '800',
                            lineHeight: 1.15,
                            letterSpacing: '-1px',
                            marginBottom: '14px',
                            color: 'var(--text-primary)',
                        }}
                    >
                        Hi, I&apos;m{' '}
                        <span className="hero-name-highlight">
                            Manusha Wijerathna
                        </span>
                    </h1>

                    {/* Professional Role Title with Typing Animation */}
                    <h2
                        style={{
                            fontSize: isMobile ? '22px' : '30px',
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                            marginBottom: '20px',
                            lineHeight: 1.3,
                            minHeight: isMobile ? '32px' : '42px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <span>{currentText}</span>
                        <span
                            style={{
                                color: 'var(--accent-purple-bright)',
                                fontWeight: '300',
                                opacity: showCursor ? 1 : 0,
                                marginLeft: '3px',
                                transition: 'opacity 0.15s ease',
                            }}
                        >
                            |
                        </span>
                    </h2>

                    {/* Short Professional Description */}
                    <p
                        style={{
                            color: 'var(--text-muted)',
                            fontSize: isMobile ? '15px' : '16px',
                            lineHeight: '1.75',
                            maxWidth: '540px',
                            marginBottom: '32px',
                        }}
                    >
                        Information Technology undergraduate at the University of Moratuwa passionate about
                        building modern web applications, solving real-world problems, and creating
                        practical technology solutions.
                    </p>

                    {/* Call To Action Buttons */}
                    <div
                        style={{
                            display: 'flex',
                            gap: isMobile ? '10px' : '14px',
                            marginBottom: '36px',
                            flexWrap: 'wrap',
                            justifyContent: isMobile ? 'center' : 'flex-start',
                        }}
                    >

                        <a
                            href="https://drive.google.com/file/d/15MJoIObedXG9_xFbGyzakUAvZoqiIw1M/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-primary-btn"
                        >
                            <ArrowRight size={16} />
                            Preview CV
                        </a>
                        <a href="#projects" className="hero-secondary-btn">
                            View Projects
                        </a>
                    </div>

                    {/* Social / Contact Icons */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            justifyContent: isMobile ? 'center' : 'flex-start',
                        }}
                    >
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('mailto:') ? '_self' : '_blank'}
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="hero-social-btn"
                            >
                                <Icon size={19} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT COLUMN: Interactive Floating Badges Over Background Image ── */}
                <div className="hero-badges-stage">
                    {/* Floating Badge 1: Next.js & React */}
                    <div className="hero-floating-badge badge-top-left">
                        <div className="hero-badge-icon icon-purple">
                            <SiNextdotjs size={16} />
                        </div>
                        <div className="hero-badge-text">
                            <span className="badge-sub">Frontend</span>
                            <span className="badge-main">Next.js &amp; React</span>
                        </div>
                    </div>

                    {/* Floating Badge 2: Full-Stack & DBs */}
                    <div className="hero-floating-badge badge-top-right">
                        <div className="hero-badge-icon icon-blue">
                            <Database size={16} />
                        </div>
                        <div className="hero-badge-text">
                            <span className="badge-sub">Backend</span>
                            <span className="badge-main">Full-Stack &amp; DBs</span>
                        </div>
                    </div>

                    {/* Floating Badge 3: Education */}
                    <div className="hero-floating-badge badge-bottom-left">
                        <div className="hero-badge-icon icon-gradient">
                            <GraduationCap size={16} />
                        </div>
                        <div className="hero-badge-text">
                            <span className="badge-sub">Education</span>
                            <span className="badge-main">Univ. of Moratuwa</span>
                        </div>
                    </div>

                    {/* Floating Badge 4: Solutions & IoT */}
                    <div className="hero-floating-badge badge-bottom-right">
                        <div className="hero-badge-icon icon-green">
                            <Sparkles size={15} />
                        </div>
                        <div className="hero-badge-text">
                            <span className="badge-sub">Focus</span>
                            <span className="badge-main">UI/UX &amp; IoT</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}