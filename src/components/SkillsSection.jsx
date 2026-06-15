'use client';

import {
    Code, Server, Database, Brain, Wrench, Smartphone, Cpu
} from 'lucide-react';

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
    return (
        <section id="skills" style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            padding: '80px 80px',
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
                marginBottom: '16px',
            }}>
                Skills
            </div>

            <h2 style={{
                fontSize: '40px',
                fontWeight: '800',
                marginBottom: '60px',
                textAlign: 'center',
            }}>
                Skills &amp; Technologies
            </h2>

            {/* Grid */}
            <div style={{
                maxWidth: '1000px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
            }}>
                {skillCategories.map((category) => (
                    <div
                        key={category.title}
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '16px',
                            padding: '28px',
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <category.icon size={18} color="var(--accent-purple-bright)" />
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}>
                                {category.title}
                            </h3>
                        </div>

                        {/* Skill Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {category.skills.map((skill) => (
                                <span
                                    key={skill}
                                    style={{
                                        padding: '6px 14px',
                                        background: 'rgba(108, 99, 255, 0.1)',
                                        border: '1px solid rgba(108, 99, 255, 0.3)',
                                        borderRadius: '20px',
                                        fontSize: '13px',
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