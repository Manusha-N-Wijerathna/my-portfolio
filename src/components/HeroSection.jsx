'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, ArrowRight, Target } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import Image from 'next/image';



const FULL_NAME = 'Manusha';
const FULL_SUBTITLE = 'Nuwan Wijerathna';

// Meteor shower canvas
function MeteorCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Create meteors
        const meteors = Array.from({ length: 18 }, () => createMeteor(canvas));

        function createMeteor(canvas) {
            return {
                x: Math.random() * canvas.width * 1.5,
                y: Math.random() * canvas.height - canvas.height,
                length: Math.random() * 120 + 60,
                speed: Math.random() * 4 + 2,
                opacity: Math.random() * 0.6 + 0.2,
                width: Math.random() * 1.5 + 0.5,
            };
        }

        function resetMeteor(m, canvas) {
            m.x = Math.random() * canvas.width * 1.5;
            m.y = -m.length;
            m.length = Math.random() * 120 + 60;
            m.speed = Math.random() * 4 + 2;
            m.opacity = Math.random() * 0.6 + 0.2;
            m.width = Math.random() * 1.5 + 0.5;
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            meteors.forEach((m) => {
                // Move diagonally
                m.x -= m.speed * 0.4; // 10 degree angle
                m.y += m.speed;

                // Reset if off screen
                if (m.y > canvas.height + m.length || m.x < -m.length) {
                    resetMeteor(m, canvas);
                }

                // Draw meteor trail
                const gradient = ctx.createLinearGradient(
                    m.x, m.y,
                    m.x + m.length * 0.4, m.y - m.length
                );
                gradient.addColorStop(0, `rgba(180, 160, 255, ${m.opacity})`);
                gradient.addColorStop(1, 'rgba(180, 160, 255, 0)');

                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(m.x + m.length * 0.4, m.y - m.length);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = m.width;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Draw bright head dot
                ctx.beginPath();
                ctx.arc(m.x, m.y, m.width * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 210, 255, ${m.opacity})`;
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
                zIndex: 0,
            }}
        />
    );
}

export default function HeroSection() {
    const [name, setName] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [nameIndex, setNameIndex] = useState(0);
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [nameDone, setNameDone] = useState(false);


    // Type "Manusha" first
    useEffect(() => {
        if (nameIndex < FULL_NAME.length) {
            const t = setTimeout(() => {
                setName((prev) => prev + FULL_NAME[nameIndex]);
                setNameIndex((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(t);
        } else {
            setNameDone(true);
        }
    }, [nameIndex]);

    // Type "Nuwan Wijerathna" after "Manusha" is done
    useEffect(() => {
        if (nameDone && subtitleIndex < FULL_SUBTITLE.length) {
            const t = setTimeout(() => {
                setSubtitle((prev) => prev + FULL_SUBTITLE[subtitleIndex]);
                setSubtitleIndex((prev) => prev + 1);
            }, 80);
            return () => clearTimeout(t);
        }
    }, [nameDone, subtitleIndex]);

    // Repeat animation every 5 seconds after both finish
    useEffect(() => {
        if (nameDone && subtitleIndex === FULL_SUBTITLE.length) {
            const t = setTimeout(() => {
                setName('');
                setSubtitle('');
                setNameIndex(0);
                setSubtitleIndex(0);
                setNameDone(false);
            }, 3000);
            return () => clearTimeout(t);
        }
    }, [nameDone, subtitleIndex]);

    // Blinking cursor
    useEffect(() => {
        const interval = setInterval(() => setShowCursor((prev) => !prev), 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #020818 0%, #0a0f2e 50%, #0d1235 100%)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 80px',
        }}>
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '40px',
            }}>

                {/* Meteor shower background */}
                <MeteorCanvas />

                <div style_1={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '40px',
                    position: 'relative',
                    zIndex: 1,
                }}></div>

                {/* Left — Text */}
                <div style={{ flex: 1 }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '16px' }}>
                        Hi, I'm
                    </p>
                    <h1 style={{ fontSize: '64px', fontWeight: '800', lineHeight: 1.1, marginBottom: '4px' }}>
                        <span style={{ color: 'var(--accent-purple-bright)' }}>
                            {name}
                        </span>
                        {/* cursor blinks on h1 while name is typing, moves to h2 after */}
                        {!nameDone && (
                            <span style={{ opacity: showCursor ? 1 : 0, color: 'var(--accent-purple-bright)', fontWeight: '300' }}>|</span>
                        )}
                    </h1>

                    <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '20px', color: 'white', minHeight: '40px' }}>
                        {subtitle}
                        {nameDone && (
                            <span style={{ opacity: showCursor ? 1 : 0, color: 'var(--accent-purple-bright)', fontWeight: '300', marginLeft: '2px' }}>|</span>
                        )}
                    </h2>

                    <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', maxWidth: '420px', marginBottom: '28px' }}>
                        Freelance UI/UX Designer &amp; Frontend Developer.
                        I design and build digital products that people love to use — fast, clean, and accessible.
                    </p>

                    {/* Social Icons */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                        {[
                            { icon: FaFacebook, href: 'https://www.facebook.com/share/1H1GNvRibD/' },
                            { icon: FaInstagram, href: 'https://www.instagram.com/manusha_nuwan?igsh=MWQxaHRzN2p6a3N3MA==' },
                            { icon: FaLinkedin, href: 'https://www.linkedin.com/in/manusha-nuwan-b674a62bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
                            { icon: FaGithub, href: 'https://github.com/Manusha-N-Wijerathna' },

                        ].map(({ icon: Icon, href }, i) => (
                            <a key={`${href}-${i}`} href={href} target="_blank" rel="noopener noreferrer" style={{
                                color: 'var(--text-muted)',
                                transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-purple-bright)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <a href="/cv.pdf" download style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '12px 24px',
                            background: 'var(--accent-purple)',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'opacity 0.2s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            <Download size={16} /> Download CV
                        </a>
                        <a href="#projects" style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '12px 24px',
                            border: '2px solid var(--accent-purple)',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'background 0.2s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-purple)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            View Projects <ArrowRight size={16} />
                        </a>
                    </div>
                </div>

                {/* Right — Photo */}
                <div style={{
                    width: '280px',
                    height: '320px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '3px solid var(--border-color)',
                    flexShrink: 0,
                    position: 'relative',
                }}>
                    <Image
                        src="/profile_hero.jpg"
                        alt="Manusha Nuwan"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}