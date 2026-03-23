/**
 * Dock & Deck Solutions - Master Interactive Logic
 * Handles: Navbar transitions, Scroll progress, Mobile Menu (with X animation), and Reveal Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Selectors
    const nav = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    const bars = document.querySelectorAll('.bar');
    
    // Selects all elements that should "fade in"
    const revealElements = document.querySelectorAll('.reveal, .scroll-reveal, .service-card');

    /**
     * 2. Core Scroll Handler
     */
    const updateUIOnScroll = () => {
        const scrollY = window.scrollY;

        // --- Navbar State (Transparent to White) ---
        if (document.body.classList.contains('subpage')) {
            nav.classList.add('scrolled');
        } else {
            if (scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        // --- Top Progress Bar ---
        if (progressBar) {
            const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollY / totalDocHeight) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        }

        // --- Back to Top Button Visibility ---
        if (backToTopBtn) {
            if (scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // --- Intersection/Reveal Logic ---
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 150;
            if (elementTop < triggerPoint) {
                el.classList.add('active');
            }
        });
    };

    /**
     * 3. Mobile Navigation Logic (Merged & Fixed)
     */
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            // Toggle Classes for CSS
            mobileMenu.classList.toggle('is-active');
            navLinks.classList.toggle('active');

            // Handle the "X" animation directly in JS for smoothness
            if (mobileMenu.classList.contains('is-active')) {
                bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
                bars[1].style.opacity = "0";
                bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
            } else {
                bars[0].style.transform = "none";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "none";
            }
        });
    }

    // Auto-close the mobile menu when a navigation link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('is-active');
                // Reset bars
                bars[0].style.transform = "none";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "none";
            }
        });
    });

    /**
     * 4. Back to Top Click Event
     */
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * 5. Initialization
     */
    updateUIOnScroll();
    window.addEventListener('scroll', updateUIOnScroll, { passive: true });
});
