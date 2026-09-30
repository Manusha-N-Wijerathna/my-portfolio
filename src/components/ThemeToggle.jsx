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

  return null;
}
