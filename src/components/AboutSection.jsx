'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GraduationCap, TrendingUp, Sparkles, Compass } from 'lucide-react';

function WindCanvas() {
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

        // Create wind lines
        const lines = Array.from({ length: 25 }, () => createLine(canvas, true));

        function createLine(canvas, random = false) {
            return {
                x: random ? Math.random() * canvas.width : canvas.width + Math.random() * 200,
                y: Math.random() * canvas.height,
                length: Math.random() * 180 + 60,
                speed: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.25 + 0.05,
                width: Math.random() * 1.2 + 0.3,
                gap: Math.random() * 300 + 100, // delay before reappearing
            };
        }

        function resetLine(line, canvas) {
            line.x = canvas.width + Math.random() * 200;
            line.y = Math.random() * canvas.height;
            line.length = Math.random() * 180 + 60;
            line.speed = Math.random() * 2 + 0.5;
            line.opacity = Math.random() * 0.25 + 0.05;
            line.width = Math.random() * 1.2 + 0.3;
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            lines.forEach((line) => {
                // Move right to left
                line.x -= line.speed;

                // Reset when off screen left
                if (line.x + line.length < 0) {
                    resetLine(line, canvas);
                }

                // Draw wind line with gradient fade
                const gradient = ctx.createLinearGradient(
                    line.x, line.y,
                    line.x + line.length, line.y
                );
                gradient.addColorStop(0, 'rgba(108, 99, 255, 0)');
                gradient.addColorStop(0.3, 'rgba(108, 99, 255, ' + line.opacity + ')');
                gradient.addColorStop(0.7, 'rgba(140, 130, 255, ' + line.opacity + ')');
                gradient.addColorStop(1, 'rgba(108, 99, 255, 0)');

                ctx.beginPath();
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(line.x + line.length, line.y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = line.width;
                ctx.lineCap = 'round';
                ctx.stroke();
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

export default function AboutSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e) => setIsMobile(e.matches);
        setIsMobile(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const timeline = [
        { year: '2015', title: 'Diploma in Hardware Eng.', desc: 'Studied computer engineering, system configs & networking.', position: 'top' },
        { year: '2018', title: 'G.C.E O/L Exam', desc: 'Achieved 6 As and 3 Bs at Dambadenya National College.', position: 'bottom' },
        { year: '2022', title: 'G.C.E A/L Exam', desc: 'Achieved 1 A and 2 Bs (Physical Science) at Dambadenya National College.', position: 'top' },
        { year: '2023', title: 'Diploma in IT', desc: 'Completed an IT diploma at E Soft Metro College.', position: 'bottom' },
        { year: '2024', title: 'BSc(Hons) in IT', desc: 'Undergraduate student reading for IT degree at University of Moratuwa.', position: 'top' },
    ];

    const highlights = [
        { icon: GraduationCap, label: 'Education', value: 'University of Moratuwa (BSc Hons IT)' },
        { icon: TrendingUp, label: 'Target', value: 'Aspiring Data Scientis' },
        { icon: Sparkles, label: 'Interests', value: 'Web Apps, Problem Solving' },
        { icon: Compass, label: 'Hobbies', value: 'Teaching to some one ' },
    ];

    return (
        <section id="about" style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at center, #0a0f2e 0%, #020818 100%)',
            padding: isMobile ? '60px 20px' : '100px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* Custom stylesheet for beautiful cards and effects */}
            <style dangerouslySetInnerHTML={{ __html: `
                .about-tag {
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
                .about-card {
                    max-width: 1000px;
                    width: 100%;
                    background: rgba(13, 18, 53, 0.35);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-radius: 20px;
                    border: 1px solid rgba(30, 42, 94, 0.5);
                    padding: 40px;
                    z-index: 10;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
                                0 0 40px rgba(108, 99, 255, 0.05),
                                inset 0 1px 0 rgba(255, 255, 255, 0.05);
                    transition: border-color 0.4s ease, box-shadow 0.4s ease;
                }
                .about-card:hover {
                    border-color: rgba(108, 99, 255, 0.25);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6),
                                0 0 50px rgba(108, 99, 255, 0.12),
                                inset 0 1px 0 rgba(255, 255, 255, 0.08);
                }
                .profile-img-wrapper {
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 2px solid rgba(108, 99, 255, 0.3);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(108, 99, 255, 0.15);
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                .profile-img-wrapper:hover {
                    transform: scale(1.03) translateY(-4px);
                    border-color: var(--accent-purple-bright);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 35px rgba(108, 99, 255, 0.35);
                }
                .highlight-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                    margin-top: 28px;
                }
                .highlight-card {
                    background: rgba(6, 10, 32, 0.5);
                    border: 1px solid rgba(30, 42, 94, 0.7);
                    border-radius: 12px;
                    padding: 16px;
                    transition: all 0.3s ease;
                }
                .highlight-card:hover {
                    border-color: var(--accent-purple-bright);
                    background: rgba(6, 10, 32, 0.8);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(108, 99, 255, 0.1);
                }
                .timeline-line {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, rgba(61,47,196,0.3) 0%, rgba(108,99,255,0.7) 50%, rgba(61,47,196,0.3) 100%);
                    transform: translateY(-50%);
                }
                .timeline-card-desktop {
                    background: rgba(13, 18, 53, 0.5);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border: 1px solid rgba(30, 42, 94, 0.7);
                    border-radius: 12px;
                    padding: 14px 16px;
                    width: 175px;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }
                .timeline-node-top {
                    bottom: 24px;
                }
                .timeline-node-bottom {
                    top: 24px;
                }
                .timeline-card-desktop:hover {
                    border-color: var(--accent-purple-bright);
                    background: rgba(13, 18, 53, 0.85);
                    box-shadow: 0 10px 25px rgba(108, 99, 255, 0.2);
                }
                .timeline-node-top:hover {
                    transform: translateX(-50%) translateY(-4px);
                }
                .timeline-node-bottom:hover {
                    transform: translateX(-50%) translateY(4px);
                }
                .glow-dot {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: var(--accent-purple-bright);
                    border: 2px solid #ffffff;
                    box-shadow: 0 0 12px var(--accent-purple-bright);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 10;
                }
                .glow-dot:hover {
                    transform: scale(1.3);
                    box-shadow: 0 0 18px var(--accent-purple-bright), 0 0 25px #ffffff;
                }
                .timeline-card-mobile {
                    background: rgba(13, 18, 53, 0.4);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(30, 42, 94, 0.7);
                    border-radius: 12px;
                    padding: 16px;
                    transition: all 0.3s ease;
                    margin-bottom: 20px;
                }
                .timeline-card-mobile:hover {
                    border-color: var(--accent-purple-bright);
                    background: rgba(13, 18, 53, 0.7);
                    transform: translateX(4px);
                }
                @media (max-width: 768px) {
                    .highlight-grid {
                        grid-template-columns: 1fr;
                        gap: 12px;
                    }
                    .about-card {
                        padding: 24px;
                    }
                }
            ` }} />

            {/* Wind animation background */}
            <WindCanvas />

            {/* Section Label */}
            <div className="about-tag">
                About Me
            </div>

            {/* About Me Card */}
            <div className="about-card" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                <div style={{
                    display: 'flex',
                    gap: isMobile ? '32px' : '48px',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    flexDirection: isMobile ? 'column' : 'row',
                }}>
                    {/* Photo Container */}
                    <div style={{ flexShrink: 0 }}>
                        <div className="profile-img-wrapper" style={{
                            width: isMobile ? '180px' : '230px',
                            height: isMobile ? '230px' : '290px',
                        }}>
                            <Image
                                src="/profile_about.jpg"
                                alt="Manusha Nuwan"
                                fill
                                sizes="(max-width: 768px) 180px, 230px"
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                    </div>

                    {/* Biography and Info */}
                    <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
                        <h2 style={{
                            fontSize: isMobile ? '26px' : '34px',
                            fontWeight: '800',
                            marginBottom: '16px',
                            color: 'white',
                            lineHeight: 1.2
                        }}>
                            Who am I ?
                        </h2>
                        <p style={{
                            color: 'var(--text-muted)',
                            lineHeight: '1.8',
                            fontSize: isMobile ? '14px' : '15.5px',
                            marginBottom: '24px'
                        }}>
                            My name is <strong>Manusha Nuwan</strong>.<br />
                            I am an IT undergraduate student at the Faculty of Information Technology, University of Moratuwa, and an aspiring Data Scientist. Here, I immerse myself in studying the latest AI algorithms and data methodologies, gathering valuable career insights. Beyond my academic pursuits, I am a passionate IT tutor dedicated to helping students understand complex technology concepts in a simple and practical way. I enjoy mentoring learners in programming, ICT, and problem-solving, empowering them to build confidence and achieve their educational goals.

                        </p>

                        {/* Highlights Grid */}
                        <div className="highlight-grid">
                            {highlights.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="highlight-card">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                        <Icon size={16} color="var(--accent-purple-bright)" />
                                        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            {label}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '13.5px', fontWeight: '500', color: 'white', lineHeight: '1.4' }}>
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Label */}
            <h3 style={{
                fontSize: isMobile ? '20px' : '26px',
                fontWeight: '800',
                marginBottom: isMobile ? '32px' : '48px',
                color: 'white',
                textAlign: 'center',
                zIndex: 10,
                position: 'relative'
            }}>
                Education &amp; Milestones
            </h3>

            {/* Timeline Area */}
            {isMobile ? (
                /* ── Mobile: Vertical Timeline ── */
                <div style={{
                    maxWidth: '450px',
                    width: '100%',
                    position: 'relative',
                    paddingLeft: '32px',
                    zIndex: 10,
                }}>
                    {/* Vertical line */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: '8px',
                        width: '3px',
                        background: 'linear-gradient(180deg, rgba(61,47,196,0.3) 0%, rgba(108,99,255,0.7) 50%, rgba(61,47,196,0.3) 100%)',
                    }} />

                    {timeline.map((item, i) => (
                        <div key={item.year} style={{
                            position: 'relative',
                            paddingLeft: '16px',
                        }}>
                            {/* Dot on the line */}
                            <div className="glow-dot" style={{
                                position: 'absolute',
                                left: '-24px',
                                top: '18px',
                            }} />
                            
                            {/* Milestone Card */}
                            <div className="timeline-card-mobile">
                                <div style={{ color: 'var(--accent-purple-bright)', fontWeight: '800', fontSize: '15px', marginBottom: '6px' }}>
                                    {item.year}
                                </div>
                                <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14.5px', marginBottom: '6px' }}>
                                    {item.title}
                                </h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '12.5px', lineHeight: '1.5' }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* ── Desktop: Horizontal Timeline ── */
                <div style={{
                    maxWidth: '1000px',
                    width: '100%',
                    height: '320px',
                    position: 'relative',
                    zIndex: 10,
                    marginTop: '20px'
                }}>
                    {/* Line */}
                    <div className="timeline-line" />

                    {/* Dynamic flex container for nodes */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', top: '50%', transform: 'translateY(-50%)', padding: '0 20px' }}>
                        {timeline.map((item, index) => {
                            // Even spacing positioning on the horizontal timeline
                            const leftPercent = `${(index / (timeline.length - 1)) * 100}%`;
                            return (
                                <div key={item.year} style={{
                                    position: 'absolute',
                                    left: leftPercent,
                                    transform: 'translateX(-50%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                    {/* Alternating top timeline card */}
                                    {item.position === 'top' && (
                                        <div 
                                            className="timeline-card-desktop timeline-node-top"
                                            style={{ '--hover-translate': '-4px' }}
                                        >
                                            <div style={{ color: 'var(--accent-purple-bright)', fontWeight: '800', fontSize: '14px', marginBottom: '4px' }}>
                                                {item.year}
                                            </div>
                                            <h4 style={{ color: 'white', fontWeight: '700', fontSize: '13px', marginBottom: '4px', lineHeight: '1.3' }}>
                                                {item.title}
                                            </h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '11px', lineHeight: '1.4' }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    )}

                                    {/* Dot Node */}
                                    <div className="glow-dot" />

                                    {/* Alternating bottom timeline card */}
                                    {item.position === 'bottom' && (
                                        <div 
                                            className="timeline-card-desktop timeline-node-bottom"
                                            style={{ '--hover-translate': '4px' }}
                                        >
                                            <div style={{ color: 'var(--accent-purple-bright)', fontWeight: '800', fontSize: '14px', marginBottom: '4px' }}>
                                                {item.year}
                                            </div>
                                            <h4 style={{ color: 'white', fontWeight: '700', fontSize: '13px', marginBottom: '4px', lineHeight: '1.3' }}>
                                                {item.title}
                                            </h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '11px', lineHeight: '1.4' }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}