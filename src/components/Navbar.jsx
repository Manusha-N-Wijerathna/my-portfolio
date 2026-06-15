'use client';

import { Home, User, Layers, FolderOpen, Send } from 'lucide-react';

const navItems = [
    { icon: Home, href: '#hero' },
    { icon: User, href: '#about' },
    { icon: Layers, href: '#skills' },
    { icon: FolderOpen, href: '#projects' },
    { icon: Send, href: '#contact' },
];

export default function Navbar() {
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
        </nav >
    );
}