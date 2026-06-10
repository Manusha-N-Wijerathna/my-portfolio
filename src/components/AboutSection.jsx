'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

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
    const timeline = [
        { year: '2015', title: 'Diploma in Hardware Eng.', position: 'top' },
        { year: '2018', title: 'G.C.E O/L - Got 6A ,3B Dambadenya National College', position: 'bottom' },
        { year: '2022', title: 'G.C.E A/L - Got 1A ,2B Dambadenya National College', position: 'top' },
        { year: '2023', title: 'Diploma in IT - E Soft Metro College', position: 'bottom' },
        { year: '2024', title: 'BSc(Hons) IT - (Reading) University of Moratuwa', position: 'top' },
    ];

    return (
        <section id="about" style={{
            minHeight: '100vh',
            background: 'var(--bg-secondary)',
            padding: '80px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* Wind animation background */}
            <WindCanvas />

            {/* Section Label */}
            <div style={{
                background: 'var(--accent-purple)',
                padding: '8px 28px',
                borderRadius: '20px',
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: '60px',
                position: 'relative',
                zIndex: 1,
            }}>
                About me
            </div>

            {/* Content */}
            <div style={{
                maxWidth: '1000px',
                width: '100%',
                display: 'flex',
                gap: '48px',
                alignItems: 'flex-start',
                marginBottom: '80px',
                position: 'relative',
                zIndex: 1,
            }}>
                {/* Photo */}
                <div style={{
                    width: '220px',
                    height: '260px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid var(--border-color)',
                    flexShrink: 0,
                    position: 'relative',
                }}>
                    <Image
                        src="/profile.jpg"
                        alt="Manusha Nuwan"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Text */}
                <div>
                    <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '20px' }}>
                        Who am I ?
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.9', fontSize: '15px' }}>
                        My name is Manusha Nuwan.<br />
                        I am a IT undergraduate student at Faculty of IT University of Moratuwa and an aspiring Data Scientist, where I am learning the
                        latest AI technologies and gathering valuable career advice.
                        When I am not on the computer, you can find me on a hike, in the gym, or in the kitchen trying out a new recipe.
                    </p>
                </div>
            </div>

            {/* Timeline */}
            <div style={{
                maxWidth: '1000px',
                width: '100%',
                position: 'relative',
                padding: '40px 0',
                zIndex: 1,
            }}>
                {/* Line */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'var(--border-color)',
                    transform: 'translateY(-50%)',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    {timeline.map((item) => (
                        <div key={item.year} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                        }}>
                            {item.position === 'top' && (
                                <div style={{ textAlign: 'center', marginBottom: '12px', maxWidth: '120px' }}>
                                    <div style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>{item.year}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '11px', lineHeight: '1.4' }}>{item.title}</div>
                                </div>
                            )}
                            {item.position === 'bottom' && <div style={{ height: '60px' }} />}

                            {/* Dot */}
                            <div style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: 'var(--accent-purple-bright)',
                                border: '2px solid white',
                                position: 'relative',
                                zIndex: 1,
                            }} />

                            {item.position === 'bottom' && (
                                <div style={{ textAlign: 'center', marginTop: '12px', maxWidth: '120px' }}>
                                    <div style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>{item.year}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '11px', lineHeight: '1.4' }}>{item.title}</div>
                                </div>
                            )}
                            {item.position === 'top' && <div style={{ height: '60px' }} />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}