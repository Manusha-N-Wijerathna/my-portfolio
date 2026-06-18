"use client";

import { useState, useEffect } from 'react';

const projects = [
    { id: 1, title: 'Project Name', image: null },
    { id: 2, title: 'Project Name', image: null },
    { id: 3, title: 'Project Name', image: null },
    { id: 4, title: 'Project Name', image: null },
    { id: 5, title: 'Project Name', image: null },
    { id: 6, title: 'Project Name', image: null },
];

export default function ProjectsSection() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const mqMobile = window.matchMedia('(max-width: 480px)');
        const mqTablet = window.matchMedia('(min-width: 481px) and (max-width: 768px)');
        const handler = () => {
            setIsMobile(mqMobile.matches);
            setIsTablet(mqTablet.matches);
        };
        handler();
        mqMobile.addEventListener('change', handler);
        mqTablet.addEventListener('change', handler);
        return () => {
            mqMobile.removeEventListener('change', handler);
            mqTablet.removeEventListener('change', handler);
        };
    }, []);

    const getGridColumns = () => {
        if (isMobile) return '1fr';
        if (isTablet) return 'repeat(2, 1fr)';
        return 'repeat(3, 1fr)';
    };

    return (
        <section id="projects" style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            padding: isMobile ? '60px 20px' : isTablet ? '60px 24px' : '80px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>

            {/* Label */}
            <div style={{
                background: 'var(--accent-purple)',
                padding: '8px 28px',
                borderRadius: '20px',
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: isMobile ? '36px' : '60px',
            }}>
                Projects
            </div>

            {/* Grid */}
            <div style={{
                maxWidth: '1000px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: getGridColumns(),
                gap: isMobile ? '16px' : '24px',
            }}>
                {projects.map((project) => (
                    <div
                        key={project.id}
                        style={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-card)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, border-color 0.2s',
                            position: 'relative',
                            height: isMobile ? '150px' : '180px',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.borderColor = 'var(--accent-purple-bright)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                        }}
                    >
                        {/* Thumbnail placeholder */}
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, #0d1235, #1a237e)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: '16px',
                        }}>
                            <span style={{ fontWeight: '700', fontSize: isMobile ? '14px' : '15px', color: 'white' }}>
                                {project.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}