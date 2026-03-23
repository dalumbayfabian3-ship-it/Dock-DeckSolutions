/**
 * Dock & Deck Solutions - Master Interactive Logic
 * Handles: Navbar transitions, Scroll progress, Mobile Menu, and Reveal Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Selectors
    const nav = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Selects all elements that should "fade in" as the user scrolls
    const revealElements = document.querySelectorAll('.reveal, .scroll-reveal, .service-card');

    /**
     * 2. Core Scroll Handler
     * Updates the UI based on vertical scroll position
     */
    const updateUIOnScroll = () => {
        const scrollY = window.scrollY;

        // --- Navbar State (Transparent to White) ---
        // Fix: If it's a subpage, we keep the scrolled class active
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
        // Loops through elements and adds the 'active' class when they enter the viewport
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 150; // Triggers 150px before bottom of screen

            if (elementTop < triggerPoint) {
                el.classList.add('active');
            }
        });
    };

    /**
     * 3. Mobile Navigation Logic
     */
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            // Toggles the slide-in menu
            navLinks.classList.toggle('active');
            // Toggles the hamburger icon animation (X-shape)
            mobileMenu.classList.toggle('is-active');
        });
    }

    // Auto-close the mobile menu when a navigation link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenu) mobileMenu.classList.remove('is-active');
            }
        });
    });

    /**
     * 4. Back to Top Click Event
     */
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * 5. Initialization
     */
    // Run once on page load to set the correct state immediately
    updateUIOnScroll();

    // Attach the listener to the window's scroll event
    window.addEventListener('scroll', updateUIOnScroll, { passive: true });
});
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    // Toggle Mobile Menu
    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
        
        // Optional: Animate hamburger into an 'X'
        const bars = document.querySelectorAll('.bar');
        if(menu.classList.contains('is-active')) {
            bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
        } else {
            bars[0].style.transform = "none";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "none";
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    }));
});
