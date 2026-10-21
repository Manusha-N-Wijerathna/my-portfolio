'use client'


import { use, useEffect, useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '@/data/projects';
import ScrollReveal from '@/components/ScrollReveal';
import { useIsMobile } from '@/hooks/useMediaQuery';

export default function ProjectDetailPage({ params }) {
    const { id } = use(params);
    const project = projects.find((p) => p.id.toLowerCase() === id?.toLowerCase());
    const isMobile = useIsMobile();
    const galleryRef = useRef(null);
    const [activeImage, setActiveImage] = useState(0);

    if (!project) {
        notFound();
    }

    const scrollToImage = (index) => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        gallery.scrollTo({ left: index * gallery.clientWidth });
        setActiveImage(index);
    };

    const handleGalleryScroll = () => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        setActiveImage(Math.round(gallery.scrollLeft / gallery.clientWidth));
    };

    useEffect(() => {
        if (project.images.length < 2) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const interval = window.setInterval(() => {
            scrollToImage((activeImage + 1) % project.images.length);
        }, 4000);

        return () => window.clearInterval(interval);
    }, [activeImage, project.images.length]);

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
                        onClick={(event) => {
                            if (
                                event.button !== 0 ||
                                event.metaKey ||
                                event.ctrlKey ||
                                event.shiftKey ||
                                event.altKey
                            ) {
                                return;
                            }

                            sessionStorage.setItem('skip-home-loading', 'true');
                            document.documentElement.classList.add('skip-home-loading');
                        }}
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

                {/* Image carousel */}
                <ScrollReveal animation="fade-up" delay={120}>
                    <section
                        className="project-gallery"
                        aria-label={`${project.title} image gallery`}
                        aria-roledescription="carousel"
                    >
                        <h2 className="project-gallery-title">Gallery</h2>
                        <div
                            className="project-gallery-track"
                            ref={galleryRef}
                            onScroll={handleGalleryScroll}
                        >
                            {project.images.map((img, i) => (
                                <div
                                    className="project-gallery-slide"
                                    key={img}
                                    role="group"
                                    aria-roledescription="slide"
                                    aria-label={`${i + 1} of ${project.images.length}`}
                                >
                                    <div className="project-gallery-image">
                                        <Image
                                            src={img}
                                            alt={`${project.title} screenshot ${i + 1}`}
                                            fill
                                            sizes="(max-width: 768px) calc(100vw - 32px), 900px"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {project.images.length > 1 && (
                            <div className="project-gallery-controls">
                                <button
                                    type="button"
                                    className="project-gallery-arrow"
                                    onClick={() => scrollToImage(Math.max(0, activeImage - 1))}
                                    disabled={activeImage === 0}
                                    aria-label="Show previous image"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <div className="project-gallery-indicators" aria-label="Choose an image">
                                    {project.images.map((img, i) => (
                                        <button
                                            key={img}
                                            type="button"
                                            className={`project-gallery-indicator${activeImage === i ? ' is-active' : ''}`}
                                            onClick={() => scrollToImage(i)}
                                            aria-label={`Show image ${i + 1}`}
                                            aria-current={activeImage === i ? 'true' : undefined}
                                        />
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="project-gallery-arrow"
                                    onClick={() => scrollToImage(Math.min(project.images.length - 1, activeImage + 1))}
                                    disabled={activeImage === project.images.length - 1}
                                    aria-label="Show next image"
                                >
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        )}
                    </section>
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