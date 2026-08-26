'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = (newTheme) => {
    if (newTheme === theme) return;
    
    // Add smooth transition class to document HTML
    const docEl = document.documentElement;
    docEl.classList.add('theme-transition');
    
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    docEl.setAttribute('data-theme', newTheme);

    // Remove transition class after animation finishes
    setTimeout(() => {
      docEl.classList.remove('theme-transition');
    }, 800);
  };

  if (!mounted) return null;

  const isLight = theme === 'light';

  return (
    <div
      className="fixed top-5 right-6 sm:right-10 z-[100] p-1 rounded-full border shadow-xl backdrop-blur-lg transition-all duration-700 ease-out select-none"
      style={{
        background: 'var(--toggle-bg)',
        borderColor: 'var(--toggle-border)',
        boxShadow: isLight
          ? '0 8px 24px -4px rgba(251, 191, 36, 0.25), 0 4px 12px rgba(0, 0, 0, 0.05)'
          : '0 8px 24px -4px rgba(108, 99, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)',
      }}
    >
      <div className="relative flex items-center w-[130px] sm:w-[150px] h-8 sm:h-9">
        {/* Smooth & Slow Sliding Pill Indicator */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/2 rounded-full transition-all duration-750 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-md"
          style={{
            transform: isLight ? 'translateX(0%)' : 'translateX(100%)',
            background: isLight
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              : 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-purple-bright) 100%)',
          }}
        />

        {/* Light Mode Switch Option */}
        <button
          onClick={() => toggleTheme('light')}
          aria-label="Switch to Light Mode"
          className="relative z-10 flex-1 flex items-center justify-center gap-1.5 h-full text-xs font-semibold cursor-pointer transition-colors duration-500 rounded-full focus:outline-none"
          style={{
            color: isLight ? '#ffffff' : 'var(--text-muted)',
          }}
        >
          <Sun
            size={14}
            className={`transition-transform duration-700 ${
              isLight ? 'rotate-90 scale-110 text-white' : 'scale-90 opacity-70'
            }`}
          />
          <span className="tracking-wide">Light</span>
        </button>

        {/* Dark Mode Switch Option */}
        <button
          onClick={() => toggleTheme('dark')}
          aria-label="Switch to Dark Mode"
          className="relative z-10 flex-1 flex items-center justify-center gap-1.5 h-full text-xs font-semibold cursor-pointer transition-colors duration-500 rounded-full focus:outline-none"
          style={{
            color: !isLight ? '#ffffff' : 'var(--text-muted)',
          }}
        >
          <Moon
            size={14}
            className={`transition-transform duration-700 ${
              !isLight ? '-rotate-12 scale-110 text-white' : 'scale-90 opacity-70'
            }`}
          />
          <span className="tracking-wide">Dark</span>
        </button>
      </div>
    </div>
  );
}
