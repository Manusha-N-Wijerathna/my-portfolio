'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Home, User, Layers, FolderOpen, Send, Plus } from 'lucide-react';

const navItems = [
    { icon: Home, href: '#hero', label: 'Home' },
    { icon: User, href: '#about', label: 'About' },
    { icon: Layers, href: '#skills', label: 'Skills' },
    { icon: FolderOpen, href: '#projects', label: 'Projects' },
    { icon: Send, href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [radius, setRadius] = useState(120);

    const containerRef = useRef(null);
    const toggleRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e) => {
            setIsMobile(e.matches);
            if (!e.matches) {
                setIsOpen(false);
                setIsClosing(false);
            }
        };
        setIsMobile(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // Adjust radius based on screen width for mobile responsiveness
    useEffect(() => {
        if (!isMobile) return;
        const handleResize = () => {
            if (window.innerWidth < 360) {
                setRadius(85);
            } else if (window.innerWidth < 400) {
                setRadius(95);
            } else {
                setRadius(110);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 300);
    }, []);

    // Handle clicks outside the radial menu to close it
    useEffect(() => {
        if (!isOpen) return;

        const handleOutsideClick = (e) => {
            if (
                (containerRef.current && containerRef.current.contains(e.target)) ||
                (toggleRef.current && toggleRef.current.contains(e.target))
            ) {
                return;
            }
            handleClose();
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        const timer = setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleEscape);
        }, 0);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, handleClose]);

    const handleToggle = useCallback(() => {
        if (isOpen) {
            handleClose();
        } else {
            setIsOpen(true);
            setIsClosing(false);
        }
    }, [isOpen, handleClose]);

    const handleNavClick = useCallback((e, href) => {
        e.preventDefault();
        handleClose();
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    }, [handleClose]);

    // Calculate (x, y) coordinates for fanning items from 0 deg (up) to 90 deg (left)
    const getRadialCoords = (index, total) => {
        const startAngle = 0; // Directly up
        const endAngle = 90;  // Directly left
        const angle = total > 1
            ? startAngle + ((endAngle - startAngle) / (total - 1)) * index
            : startAngle;

        const angleRad = (angle * Math.PI) / 180;
        const x = -radius * Math.sin(angleRad);
        const y = -radius * Math.cos(angleRad);

        return { x: Math.round(x), y: Math.round(y) };
    };

    // ── Desktop Sidebar ──
    if (!isMobile) {
        return (
            <nav
                style={{
                    position: 'fixed',
                    left: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '16px 10px',
                    background: 'rgba(13, 18, 53, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '0 12px 12px 0',
                    border: '1px solid var(--border-color)',
                    borderLeft: 'none',
                }}
            >
                {navItems.map(({ icon: Icon, href }) => (
                    <a
                        key={href}
                        href={href}
                        style={{
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            color: 'var(--text-muted)',
                            transition: 'all 0.2s',
                            textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.background = 'var(--accent-purple)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <Icon size={18} />
                    </a>
                ))}
            </nav>
        );
    }    // ── Mobile: Radial Floating Menu ──
    return (
        <>
            {/* Scoped CSS animations & classes */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 10px rgba(108, 99, 255, 0.4), 0 0 20px rgba(108, 99, 255, 0.15);
                    }
                    50% {
                        box-shadow: 0 0 18px rgba(108, 99, 255, 0.7), 0 0 35px rgba(108, 99, 255, 0.3);
                    }
                }

                .nav-radial-container {
                    position: fixed;
                    bottom: 28px;
                    right: 24px;
                    width: 44px;
                    height: 44px;
                    z-index: 998;
                    pointer-events: none;
                }

                .nav-radial-item-wrapper {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    width: 38px;
                    height: 38px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    opacity: 0;
                    transform: translate(0, 0) scale(0);
                    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
                }

                .nav-radial-item-wrapper.open {
                    opacity: 1;
                    transform: translate(var(--x), var(--y)) scale(1);
                    pointer-events: auto;
                }

                .nav-radial-button {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(13, 18, 53, 0.95);
                    border: 2px solid var(--accent-purple-bright);
                    color: var(--accent-purple-bright);
                    text-decoration: none;
                    box-shadow: 0 0 10px rgba(108, 99, 255, 0.25);
                    transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
                    cursor: pointer;
                }

                .nav-radial-button:hover,
                .nav-radial-button:focus {
                    background: var(--accent-purple-bright);
                    color: white;
                    border-color: white;
                    box-shadow: 0 0 18px rgba(108, 99, 255, 0.7);
                    transform: scale(1.08);
                    outline: none;
                }
            ` }} />

            {/* Radial Menu Items */}
            <div
                ref={containerRef}
                className="nav-radial-container"
            >
                {navItems.map(({ icon: Icon, href, label }, index) => {
                    const { x, y } = getRadialCoords(index, navItems.length);
                    const isItemOpen = isOpen && !isClosing;

                    return (
                        <div
                            key={href}
                            className={`nav-radial-item-wrapper ${isItemOpen ? 'open' : ''}`}
                            style={{
                                '--x': `${x}px`,
                                '--y': `${y}px`,
                                transitionDelay: isItemOpen
                                    ? `${index * 0.05}s`
                                    : `${(navItems.length - 1 - index) * 0.03}s`,
                            }}
                        >
                            <a
                                href={href}
                                onClick={(e) => handleNavClick(e, href)}
                                className="nav-radial-button"
                                aria-label={label}
                            >
                                <Icon size={16} />
                            </a>
                        </div>
                    );
                })}
            </div>

            {/* Floating toggle button */}
            <button
                ref={toggleRef}
                onClick={handleToggle}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                suppressHydrationWarning
                style={{
                    position: 'fixed',
                    bottom: '28px',
                    right: '24px',
                    zIndex: 999,
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '2px solid var(--accent-purple-bright)',
                    background: isOpen
                        ? 'var(--accent-purple)'
                        : 'linear-gradient(135deg, var(--accent-purple), var(--accent-purple-bright))',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    animation: isOpen ? 'none' : 'pulse-glow 2.5s ease-in-out infinite',
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s',
                    transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)',
                    boxShadow: isOpen
                        ? '0 0 16px rgba(108, 99, 255, 0.5)'
                        : '0 0 10px rgba(108, 99, 255, 0.4)',
                }}
            >
                <Plus size={20} strokeWidth={2.5} />
            </button>
        </>
    );
}