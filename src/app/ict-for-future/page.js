'use client';

import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import SpaceDustCanvas from '@/components/SpaceDustCanvas';
import ScrollReveal from '@/components/ScrollReveal';
import { ictGallery } from '@/data/ictForFuture';

export default function IctForFuturePage() {

  const handleBack = () => {
    // Navigate to home with hash so loading screen is skipped
    window.location.href = '/#about';
  };

  return (
    <main className="min-h-screen bg-[var(--bg-secondary)] px-4 py-12 sm:px-10 md:px-20 md:py-20 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Modern Developer Background Grid */}
      <div className="site-grid-pattern" />
      <SpaceDustCanvas />

      {/* Floating Glassmorphic Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 sm:top-8 sm:left-10 z-50 group flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 border border-[var(--toggle-border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-purple-bright)]/50 hover:shadow-[0_0_25px_rgba(108,99,255,0.35)] backdrop-blur-md bg-[var(--toggle-bg)]"
      >
        <span className="flex items-center justify-center w-10 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 group-hover:bg-[var(--accent-purple-bright)] group-hover:text-white transition-all duration-300 group-hover:-translate-x-0.5">
          <ArrowLeft size={15} />
        </span>
        <span className="sm:block hidden -ml-1">Back</span>
      </button>

      <div className="max-w-[1000px] mx-auto my-auto relative z-10 w-full pt-12 sm:pt-0">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 text-center text-[var(--text-primary)] tracking-tight">
          #ict_for_future
        </h1>
        <p className="text-center text-[var(--text-muted)] mb-8 text-sm sm:text-base">
          Grade 6 – A/L ICT Classes
        </p>

        {/* Spacer to create a big vertical gap */}
        <div className="h-16 sm:h-24 md:h-8" />

        {/* Polaroid gallery */}
        <div className="flex flex-col gap-16 md:gap-24 mb-20">
          {ictGallery.map((item, i) => (
            <ScrollReveal
              key={item.id}
              animation={i % 2 === 0 ? "fade-right" : "fade-left"}
              delay={80}
              duration={800}
              style={{ width: '100%' }}
            >
              <div
                className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full ${
                  i % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Tilted image card */}
                <div
                  className={`relative w-full max-w-[320px] aspect-[320/220] h-auto rounded-lg border-4 border-white shadow-2xl transition-transform duration-300 ${
                    i % 2 === 0
                      ? '-rotate-2 md:-rotate-6 hover:rotate-0'
                      : 'rotate-2 md:rotate-6 hover:rotate-0'
                  } shrink-0`}
                >
                  <Image
                    src={item.image}
                    alt={String(item.id)}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>

                {/* Description */}
                <div className="w-full md:max-w-[480px] text-center md:text-left">
                  <h3 className="text-[var(--text-primary)] text-xl sm:text-2xl font-extrabold mb-3 tracking-tight px-6 md:px-0">
                    {item.id}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed px-10 sm:px-12 md:px-0">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </main>
  );
}