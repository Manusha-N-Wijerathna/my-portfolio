'use client';

import { useState, useEffect } from 'react';
import SpaceDustCanvas from './SpaceDustCanvas';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e) => setIsMobile(e.matches);
        setIsMobile(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        let timer;
        const startLoading = () => {
            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    // Organic-feeling progress step scaled to take ~5 seconds
                    let increment = 1;
                    if (prev < 30) {
                        increment = Math.random() * 1.0 + 0.6; // Fast initial start
                    } else if (prev < 65) {
                        increment = Math.random() * 0.5 + 0.25; // Organic slow-down
                    } else if (prev < 88) {
                        increment = Math.random() * 1.1 + 0.45; // Slight sprint/burst
                    } else {
                        increment = Math.random() * 0.3 + 0.15; // Gentle slowdown at the end
                    }
                    const next = prev + increment;
                    return next >= 100 ? 100 : next;
                });
            }, 30);
        };

        startLoading();

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            setIsFadingOut(true);
            const fadeTimeout = setTimeout(() => {
                setIsVisible(false);
                if (onComplete) {
                    onComplete();
                }
            }, 800); // 0.5s fade out transition
            return () => clearTimeout(fadeTimeout);
        }
    }, [progress, onComplete]);

    if (!isVisible) return null;

    const roundedProgress = Math.floor(progress);

    // Wave Y coordinate logic: 200 is empty, 0 is fully filled.
    const y = 200 - (progress / 100) * 200;

    // Gently flatten the wave at 0% and 100% to ensure clean edges and avoid cut-offs.
    const amp = progress === 0 || progress === 100 ? 0 : 8;

    // Double period wave path spanning 1000px horizontally (for seamless looping translation).
    const wavePath = `M 0 ${y} Q 125 ${y - amp} 250 ${y} T 500 ${y} Q 625 ${y - amp} 750 ${y} T 1000 ${y} L 1000 300 L 0 300 Z`;

    return (
        <div
            className="loading-overlay"
            style={{ opacity: isFadingOut ? 0 : 1 }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    height: 100dvh;
                    background: linear-gradient(135deg, #020818 0%, #0a0f2e 50%, #0d1235 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .svg-container {
                    position: relative;
                    width: 90%;
                    max-width: 500px;
                    aspect-ratio: 500 / 200;
                    user-select: none;
                    z-index: 10;
                }
                @keyframes wave-flow {
                    0% {
                        transform: translate3d(0, 0, 0);
                    }
                    100% {
                        transform: translate3d(-500px, 0, 0);
                    }
                }
                .liquid-wave {
                    animation: wave-flow 3.5s linear infinite;
                }
            ` }} />

            {/* Background Space Dust Canvas */}
            <SpaceDustCanvas />

            <div className="svg-container">
                <svg
                    viewBox="0 0 500 200"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <clipPath id="liquid-clip">
                            <path
                                className="liquid-wave"
                                d={wavePath}
                                style={{ transformOrigin: 'center' }}
                            />
                        </clipPath>
                    </defs>

                    {/* Background Text: Transparent with White Border */}
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="140"
                        fontWeight="900"
                        fill="transparent"
                        stroke="linear-gradient(135deg, #020818 0%, #0a0f2e 50%, #0d1235 100%)"
                        strokeWidth={isMobile ? "0.1" : "2"}
                        style={{
                            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                            letterSpacing: '4px'
                        }}
                    >
                        MNW.
                    </text>

                    {/* Foreground Text: Filled White (Clipped by the Wave) */}
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="140"
                        fontWeight="900"
                        fill="#ffffff"
                        stroke="#ffffff"
                        strokeWidth={isMobile ? "0.1" : "2"}
                        clipPath="url(#liquid-clip)"
                        style={{
                            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                            letterSpacing: '4px'
                        }}
                    >
                        MNW.
                    </text>

                    {/* Sub-text: loading percentage in bottom-right corner of text block */}
                    <text
                        x="430"
                        y="155"
                        fill="#ffffff"
                        fontSize="13"
                        fontWeight="500"
                        textAnchor="end"
                        style={{
                            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                            letterSpacing: '1px',
                            opacity: 0.85
                        }}
                    >
                        loading... <tspan fill="#ffffff" fontWeight="700">{roundedProgress}%</tspan>
                    </text>
                </svg>
            </div>
        </div>
    );
}
