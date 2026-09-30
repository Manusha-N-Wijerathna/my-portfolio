'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Home, User, Layers, FolderOpen, Send, Plus, Sun, Moon } from 'lucide-react';

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
    const [theme, setTheme] = useState('dark');
    const [activeSection, setActiveSection] = useState('hero');

    const containerRef = useRef(null);
    const toggleRef = useRef(null);

    // Track active theme to match ThemeToggle colors
    useEffect(() => {
        const updateTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 
                                 localStorage.getItem('portfolio-theme') || 
                                 'dark';
            setTheme(currentTheme);
        };

        updateTheme();

        const observer = new MutationObserver(() => {
            updateTheme();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    // Toggle theme with smooth transition
    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        const docEl = document.documentElement;
        docEl.classList.add('theme-transition');
        setTheme(nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);
        docEl.setAttribute('data-theme', nextTheme);

        setTimeout(() => {
            docEl.classList.remove('theme-transition');
        }, 800);
    };

    // Track scroll position to update sliding indicator on desktop navbar
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
            const scrollPos = window.scrollY + 220;

            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.offsetTop <= scrollPos) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e) => {
            setIsMobile(e.matches);
            if (!e.matches) {
                setIsOpen(false);
                setIsClosing(false);
            }
        };
        const t = setTimeout(() => {
            setIsMobile(mq.matches);
        }, 0);
        mq.addEventListener('change', handler);
        return () => {
            clearTimeout(t);
            mq.removeEventListener('change', handler);
        };
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
        const targetId = href.replace('#', '');
        setActiveSection(targetId);
        handleClose();
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 50);
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

    // ── Desktop Navigation: Centered at the top of the hero section, text-only tabs matching ThemeToggle design ──
    if (!isMobile) {
        const isLight = theme === 'light';
        const activeIndex = Math.max(0, navItems.findIndex((item) => item.href === `#${activeSection}`));
        const tabWidth = 112; // Increased width per text tab (total width ~570px)

        return (
            <nav
                aria-label="Desktop Navigation"
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 90,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px 6px',
                    background: 'var(--toggle-bg)',
                    borderColor: 'var(--toggle-border)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderRadius: '9999px',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: isLight
                        ? '0 8px 24px -4px rgba(251, 191, 36, 0.25), 0 4px 12px rgba(0, 0, 0, 0.05)'
                        : '0 8px 24px -4px rgba(108, 99, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.6s ease',
                    userSelect: 'none',
                }}
            >
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    {/* Smooth Sliding Pill Indicator (Matching ThemeToggle pill) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            width: `${tabWidth}px`,
                            borderRadius: '9999px',
                            transform: `translateX(${activeIndex * tabWidth}px)`,
                            transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
                            background: isLight
                                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                                : 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-purple-bright) 100%)',
                            boxShadow: isLight
                                ? '0 4px 12px rgba(245, 158, 11, 0.35)'
                                : '0 4px 14px rgba(108, 99, 255, 0.45)',
                            pointerEvents: 'none',
                            zIndex: 0,
                        }}
                    />

                    {/* Nav Items: Text Only */}
                    {navItems.map(({ href, label }, idx) => {
                        const isActive = activeIndex === idx;

                        return (
                            <a
                                key={href}
                                href={href}
                                onClick={(e) => handleNavClick(e, href)}
                                aria-label={label}
                                style={{
                                    position: 'relative',
                                    zIndex: 1,
                                    width: `${tabWidth}px`,
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '9999px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    letterSpacing: '0.4px',
                                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                                    transition: 'color 0.3s ease',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = 'var(--text-muted)';
                                    }
                                }}
                            >
                                {label}
                            </a>
                        );
                    })}

                    {/* Subtle Vertical Divider */}
                    <div
                        style={{
                            width: '1px',
                            height: '20px',
                            background: 'var(--toggle-border)',
                            margin: '0 8px 0 6px',
                            opacity: 0.8,
                        }}
                    />

                    {/* Integrated Theme Toggle Button */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            width: '38px',
                            height: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '9999px',
                            color: isLight ? '#f59e0b' : '#a78bfa',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            padding: 0,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.15)';
                            e.currentTarget.style.background = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        {isLight ? (
                            <Sun size={18} className="transition-transform duration-500 rotate-90 text-amber-500" />
                        ) : (
                            <Moon size={18} className="transition-transform duration-500 -rotate-12 text-purple-400" />
                        )}
                    </button>
                </div>
            </nav>
        );
    }    // ── Mobile: Radial Floating Menu ──
    return (
        <>
            {/* Scoped CSS animations & classes */}
            <style dangerouslySetInnerHTML={{
                __html: `
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