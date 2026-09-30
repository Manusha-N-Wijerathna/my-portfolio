'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Smoothly reveals components with modern cubic-bezier animations when scrolling into view.
 *
 * @param {string} animation - 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade'
 * @param {number} delay - transition delay in milliseconds
 * @param {number} duration - transition duration in milliseconds (default 750)
 * @param {number} distance - translate distance in pixels (default 32)
 * @param {number} threshold - intersection threshold 0 to 1 (default 0.1)
 * @param {string} rootMargin - intersection root margin (default '0px 0px -40px 0px')
 * @param {string} className - optional className
 * @param {object} style - optional inline style
 * @param {React.ElementType} as - HTML tag to render (default 'div')
 */
export default function ScrollReveal({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 750,
    distance = 32,
    threshold = 0.1,
    rootMargin = '0px 0px -40px 0px',
    className = '',
    style = {},
    as: Component = 'div',
    ...props
}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // If user prefers reduced motion, show immediately
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin]);

    const getTransform = () => {
        if (isVisible) return 'none';
        switch (animation) {
            case 'fade-up':
                return `translate3d(0, ${distance}px, 0)`;
            case 'fade-down':
                return `translate3d(0, -${distance}px, 0)`;
            case 'fade-left':
                return `translate3d(${distance}px, 0, 0)`;
            case 'fade-right':
                return `translate3d(-${distance}px, 0, 0)`;
            case 'zoom-in':
                return 'scale3d(0.93, 0.93, 1)';
            case 'fade':
                return 'none';
            default:
                return `translate3d(0, ${distance}px, 0)`;
        }
    };

    return (
        <Component
            ref={ref}
            className={className}
            style={{
                ...style,
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                willChange: isVisible ? 'auto' : 'opacity, transform',
            }}
            {...props}
        >
            {children}
        </Component>
    );
}
