import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollHandler = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there's a hash, find the element and scroll to it
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                // Delay slightly to ensure content is rendered, especially with Suspense/lazy loading
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            // If no hash, scroll to top on every page change
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollHandler;
