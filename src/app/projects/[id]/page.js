'use client'


import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '@/data/projects';
import ScrollReveal from '@/components/ScrollReveal';
import { useIsMobile } from '@/hooks/useMediaQuery';

export default function ProjectDetailPage({ params }) {
    const { id } = use(params);
    const project = projects.find((p) => p.id.toLowerCase() === id?.toLowerCase());
    const isMobile = useIsMobile();

    if (!project) {
        notFound();
    }

    return (
        <main style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            padding: isMobile ? '40px 16px' : '60px 80px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Modern Developer Background Grid */}
            <div className="site-grid-pattern" />

            <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                <ScrollReveal animation="fade-down" delay={60}>
                    {/* Back link */}
                    <Link
                        href="/#projects"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--text-muted)',
                            textDecoration: 'none',
                            marginBottom: '32px',
                            fontSize: '14px',
                        }}
                    >
                        <ArrowLeft size={16} /> Back to Projects
                    </Link>

                    {/* Title */}
                    <h1 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: '800', marginBottom: '24px' }}>
                        {project.title}
                    </h1>
                </ScrollReveal>

                {/* Images */}
                <ScrollReveal animation="fade-up" delay={120}>
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        marginBottom: '32px',
                        flexWrap: 'wrap',
                    }}>
                        {project.images.map((img, i) => (
                            <div
                                key={i}
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '420px',
                                    aspectRatio: '16 / 10',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1px solid var(--border-color)',
                                }}
                            >
                                <Image
                                    src={img}
                                    alt={`${project.title} screenshot ${i + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 420px"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal animation="fade-up" delay={180}>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '16px',
                        lineHeight: '1.8',
                        marginBottom: '32px',
                        whiteSpace: 'pre-line',
                    }}>
                        {project.description}
                    </p>
                </ScrollReveal>

                {/* Technologies */}
                <ScrollReveal animation="fade-up" delay={220}>
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: 'white' }}>
                            Technologies Used
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    style={{
                                        padding: '6px 14px',
                                        background: 'rgba(108, 99, 255, 0.1)',
                                        border: '1px solid rgba(108, 99, 255, 0.3)',
                                        borderRadius: '20px',
                                        fontSize: '13px',
                                        color: 'var(--text-muted)',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* GitHub button */}
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            background: 'var(--accent-purple)',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '14px',
                        }}
                    >
                        <FaGithub size={18} /> View on GitHub
                    </a>
                </ScrollReveal>

            </div>
    </main >
  );
}