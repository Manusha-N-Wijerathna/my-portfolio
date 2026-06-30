'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SpaceDustCanvas from '@/components/SpaceDustCanvas';
import { ictGallery } from '@/data/ictForFuture';

export default function IctForFuturePage() {
    return (
        <main style={{
            minHeight: '100vh',
            background: 'var(--bg-secondary)',
            padding: '60px 80px',
            position: 'relative',
            overflow: 'hidden',
        }}>

            <SpaceDustCanvas />

            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Back link */}
                <Link
                    href="/#about"
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
                    <ArrowLeft size={16} /> Back
                </Link>

                {/* Title */}
                <h1 style={{
                    fontSize: '40px',
                    fontWeight: '800',
                    marginBottom: '8px',
                    textAlign: 'center',
                    color: 'white',
                }}>
                    #ict_for_future
                </h1>
                <p style={{
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    marginBottom: '60px',
                    fontSize: '16px',
                }}>
                    Grade 6 – A/L ICT Classes
                </p>

                {/* Polaroid gallery */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '60px',
                }}>
                    {ictGallery.map((item, i) => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '40px',
                                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                                flexWrap: 'wrap',
                            }}
                        >
                            {/* Tilted image card */}
                            <div
                                style={{
                                    position: 'relative',
                                    width: '320px',
                                    height: '220px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: '4px solid white',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                                    transform: `rotate(${i % 2 === 0 ? '-6deg' : '6deg'})`,
                                    flexShrink: 0,
                                    transition: 'transform 0.3s',
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={`Image ${String(item.id).padStart(2, '0')}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            {/* Description */}
                            <div style={{ flex: 1, minWidth: '260px' }}>
                                <h3 style={{
                                    color: 'white',
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    marginBottom: '12px',
                                }}>
                                    {String(item.id).padStart(2, '0')}
                                </h3>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '15px',
                                    lineHeight: '1.8',
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}