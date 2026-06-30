'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SpaceDustCanvas from '@/components/SpaceDustCanvas';
import { ictGallery } from '@/data/ictForFuture';

export default function IctForFuturePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-secondary)] px-4 py-12 sm:px-10 md:px-20 md:py-20 relative overflow-hidden flex flex-col items-center justify-center">
      <SpaceDustCanvas />

      <div className="max-w-[1000px] mx-auto my-auto relative z-10 w-full">

        {/* Back link */}
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 text-[var(--text-muted)] no-underline mb-8 text-sm hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 text-center text-white tracking-tight">
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
            <div
              key={item.id}
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
                <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-3 tracking-tight px-6 md:px-0">
                  {item.id}
                </h3>
                <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed px-10 sm:px-12 md:px-0">
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