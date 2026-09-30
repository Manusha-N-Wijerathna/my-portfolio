'use client';

import { useState, useEffect } from 'react';
import {
    Code, Server, Database, Brain, Wrench, Smartphone, Cpu
} from 'lucide-react';
import SpaceDustCanvas from './SpaceDustCanvas';

const skillCategories = [
    {
        title: 'Frontend Development',
        icon: Code,
        skills: ['Next.js', 'React', 'Tailwind CSS', 'HTML5', 'CSS3', 'ShadcnUI'],
    },
    {
        title: 'Backend Development',
        icon: Server,
        skills: ['Node.js',  'FastAPI'],
    },
    
    {
        title: 'Database Systems',
        icon: Database,
        skills: ['PostgreSQL', 'MySQL', 'Firebase', 'MSSQL'],
    },
    {
        title: 'Programming Languages',
        icon: Code,
        skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++'],
    },
    {
        title: 'DevOps & Tools',
        icon: Wrench,
        skills: ['Git',  'VS Code', 'Vercel'],
    },
    {
        title: 'Mobile Development',
        icon: Smartphone,
        skills: ['Flutter', 'Firebase'],
    },
    {
        title: 'Hardware & IoT',
        icon: Cpu,
        skills: ['Arduino', 'IoT'],
    },
];

export default function SkillsSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e) => setIsMobile(e.matches);
        const t = setTimeout(() => {
            setIsMobile(mq.matches);
        }, 0);
        mq.addEventListener('change', handler);
        return () => {
            clearTimeout(t);
            mq.removeEventListener('change', handler);
        };
    }, []);

    return (
        <section id="skills" style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            padding: isMobile ? '60px 20px' : '80px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Modern Developer Background Grid */}
            <div className="site-grid-pattern" />

            {/* Animated background */}
            <SpaceDustCanvas />

            {/* Label */}
            <div style={{
                background: 'var(--accent-purple)',
                color: 'white',
                padding: '8px 28px',
                borderRadius: '20px',
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: '16px',
                position: 'relative',
                zIndex: 1,
            }}>
                Skills
            </div>

            <h2 style={{
                fontSize: isMobile ? '28px' : '40px',
                fontWeight: '800',
                marginBottom: isMobile ? '36px' : '60px',
                textAlign: 'center',
                color: 'var(--text-primary)',
                position: 'relative',
                zIndex: 1,
            }}>
                Skills &amp; Technologies
            </h2>

            {/* Grid */}
            <div style={{
                maxWidth: '1000px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '16px' : '24px',
                position: 'relative',
                zIndex: 1,
            }}>
                {skillCategories.map((category) => (
                    <div
                        key={category.title}
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '16px',
                            padding: isMobile ? '20px' : '28px',
                            transition: 'border-color 0.2s, transform 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent-purple-bright)';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {/* Card Title */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: isMobile ? '14px' : '20px' }}>
                            <category.icon size={18} color="var(--accent-purple-bright)" />
                            <h3 style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                                {category.title}
                            </h3>
                        </div>

                        {/* Skill Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '8px' : '10px' }}>
                            {category.skills.map((skill) => (
                                <span
                                    key={skill}
                                    style={{
                                        padding: isMobile ? '5px 12px' : '6px 14px',
                                        background: 'rgba(108, 99, 255, 0.1)',
                                        border: '1px solid rgba(108, 99, 255, 0.3)',
                                        borderRadius: '20px',
                                        fontSize: isMobile ? '12px' : '13px',
                                        color: 'var(--text-muted)',
                                        transition: 'all 0.2s',
                                        cursor: 'default',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(108, 99, 255, 0.25)';
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.borderColor = 'var(--accent-purple-bright)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(108, 99, 255, 0.1)';
                                        e.currentTarget.style.color = 'var(--text-muted)';
                                        e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.3)';
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}