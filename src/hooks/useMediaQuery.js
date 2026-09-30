'use client';

import { useSyncExternalStore } from 'react';

/**
 * Custom hook to subscribe to CSS media queries using React's useSyncExternalStore.
 * Avoids cascading renders, unnecessary re-renders, and SSR hydration mismatches.
 *
 * @param {string} query - CSS media query (e.g. '(max-width: 768px)')
 * @returns {boolean} Whether the media query currently matches
 */
export function useMediaQuery(query) {
    return useSyncExternalStore(
        (callback) => {
            if (typeof window === 'undefined') return () => {};
            const mediaQuery = window.matchMedia(query);
            mediaQuery.addEventListener('change', callback);
            return () => mediaQuery.removeEventListener('change', callback);
        },
        () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false),
        () => false
    );
}

export function useIsMobile() {
    return useMediaQuery('(max-width: 768px)');
}
