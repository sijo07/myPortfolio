import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Prevent browser from recalling scroll position
        if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
        }

        // Force scroll to top on every route change or refresh
        window.scrollTo(0, 0);

        // Also ensure body has no residual scroll settings from modals
        document.body.style.overflow = "auto";
    }, [pathname]);

    return null;
};

export default ScrollToTop;
