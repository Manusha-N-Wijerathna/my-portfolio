'use client';

import { useState, useEffect, useCallback } from 'react';
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

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 300);
    }, []);

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
    }

    // ── Mobile: Circle Toggle + Expanded Menu ──
    return (
        <>
            {/* Scoped CSS animations & classes */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 12px rgba(108, 99, 255, 0.4), 0 0 24px rgba(108, 99, 255, 0.15);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(108, 99, 255, 0.7), 0 0 40px rgba(108, 99, 255, 0.3);
                    }
                }
                @keyframes circle-pop-in {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    60% {
                        transform: scale(1.15);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                @keyframes circle-pop-out {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0);
                        opacity: 0;
                    }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fade-out {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }

                .mobile-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 998;
                    background: rgba(2, 8, 24, 0.75);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }
                .mobile-overlay.opening {
                    animation: fade-in 0.3s ease forwards;
                }
                .mobile-overlay.closing {
                    animation: fade-out 0.3s ease forwards;
                }

                .nav-circle-item {
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-card);
                    border: 2px solid var(--accent-purple-bright);
                    color: var(--accent-purple-bright);
                    text-decoration: none;
                    box-shadow: 0 0 16px rgba(108, 99, 255, 0.3);
                    opacity: 0;
                    transform: scale(0);
                    transition: background 0.2s, color 0.2s;
                }
                .nav-circle-item.opening {
                    animation: circle-pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                .nav-circle-item.closing {
                    animation: circle-pop-out 0.2s ease forwards;
                }

                .nav-circle-label {
                    width: 52px;
                    text-align: center;
                    font-size: 10px;
                    color: var(--text-muted);
                    font-weight: 500;
                    opacity: 0;
                }
                .nav-circle-label.opening {
                    animation: fade-in 0.4s ease forwards;
                }
                .nav-circle-label.closing {
                    animation: fade-out 0.2s ease forwards;
                }
            ` }} />

            {/* Frosted overlay + icon circles at top */}
            {isOpen && (
                <div
                    className={`mobile-overlay ${isClosing ? 'closing' : 'opening'}`}
                    onClick={handleClose}
                >
                    {/* Container for icons & labels */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '80px',
                        width: '100%',
                    }} onClick={(e) => e.stopPropagation()}>
                        
                        {/* Row for icons */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '16px',
                            width: '100%',
                            maxWidth: '400px',
                            padding: '0 20px',
                        }}>
                            {navItems.map(({ icon: Icon, href, label }, index) => (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={(e) => handleNavClick(e, href)}
                                    aria-label={label}
                                    className={`nav-circle-item ${isClosing ? 'closing' : 'opening'}`}
                                    style={{
                                        animationDelay: isClosing
                                            ? `${(navItems.length - 1 - index) * 0.03}s`
                                            : `${index * 0.06}s`,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--accent-purple-bright)';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--bg-card)';
                                        e.currentTarget.style.color = 'var(--accent-purple-bright)';
                                    }}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>

                        {/* Row for labels */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '16px',
                            width: '100%',
                            maxWidth: '400px',
                            padding: '0 20px',
                            marginTop: '8px',
                        }}>
                            {navItems.map(({ label, href }, index) => (
                                <span
                                    key={`label-${href}`}
                                    className={`nav-circle-label ${isClosing ? 'closing' : 'opening'}`}
                                    style={{
                                        animationDelay: isClosing
                                            ? `${(navItems.length - 1 - index) * 0.03}s`
                                            : `${index * 0.06 + 0.15}s`,
                                    }}
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Floating circle toggle button */}
            <button
                onClick={handleToggle}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                style={{
                    position: 'fixed',
                    bottom: '28px',
                    right: '24px',
                    zIndex: 999,
                    width: '52px',
                    height: '52px',
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
                        ? '0 0 20px rgba(108, 99, 255, 0.5)'
                        : '0 0 12px rgba(108, 99, 255, 0.4)',
                }}
            >
                <Plus size={24} strokeWidth={2.5} />
            </button>
        </>
    );
}