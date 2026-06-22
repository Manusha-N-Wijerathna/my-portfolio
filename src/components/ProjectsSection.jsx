'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';
import SpaceDustCanvas from './SpaceDustCanvas';

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
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Animated background */}
      <SpaceDustCanvas />

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

      {/* Dynamic Project Card Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s, box-shadow 0.3s;
          height: 100%;
        }
        .project-card:hover {
          transform: translateY(-6px);
          border-color: var(--accent-purple-bright);
          box-shadow: 0 12px 24px rgba(108, 99, 255, 0.15);
        }
        .project-image-container {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }
        .project-image {
          transition: transform 0.5s ease;
        }
        .project-card:hover .project-image {
          transform: scale(1.06);
        }
        .project-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .project-title {
          color: white;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        .project-card:hover .project-title {
          color: var(--accent-purple-bright);
        }
        .project-description {
          color: var(--text-muted);
          font-size: 13.5px;
          line-height: 1.6;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-grow: 1;
        }
        .project-tech-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }
        .project-tech-badge {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 12px;
          background: rgba(108, 99, 255, 0.08);
          border: 1px solid rgba(108, 99, 255, 0.2);
          color: var(--text-muted);
        }
        .project-link {
          color: var(--accent-purple-bright);
          font-size: 13px;
          font-weight: 600;
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.2s;
        }
        .project-card:hover .project-link {
          gap: 8px;
        }
      ` }} />

      {/* Grid */}
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: getGridColumns(),
        gap: isMobile ? '16px' : '24px',
      }}>
        {projects.map((project) => {
          const firstImage = project.images && project.images[0] ? project.images[0] : '/projects/portfolio-1.jpg';
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="project-card"
            >
              <div className="project-image-container">
                <Image
                  src={firstImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="project-image"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="project-content">
                <h3 className="project-title">
                  {project.title}
                </h3>
                <p className="project-description">
                  {project.description}
                </p>
                <div className="project-tech-container">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="project-tech-badge">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="project-tech-badge">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="project-link">
                  Learn More <span>→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}