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
    const bars = document.querySelectorAll('.bar');
    
    // Selects all elements that should "fade in"
    const revealElements = document.querySelectorAll('.reveal, .scroll-reveal, .service-card');

    /**
     * 2. Core Scroll Handler
     */
    const updateUIOnScroll = () => {
        const scrollY = window.scrollY;

        // --- Navbar State (Transparent to White) ---
        if (nav) {
            if (document.body.classList.contains('subpage')) {
                nav.classList.add('scrolled');
            } else {
                if (scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
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
     * 3. Mobile Navigation Logic
     */
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navLinks.classList.toggle('active');

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
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('is-active');
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

/**
 * 6. Contact Form Logic (Web3Forms)
 * Wrapped in an 'if' block to prevent errors on pages without a form
 */
const form = document.getElementById('form');
const result = document.getElementById('result');

if (form && result) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const subject = `${name} sent a message from website`;
        
        formData.append('subject', subject);
        
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        result.style.display = "block";
        result.innerHTML = "Please wait...";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
                result.innerHTML = res.message;
            } else {
                result.innerHTML = res.message;
            }
        })
        .catch(error => {
            console.error(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
    });
}

/**
 * 7. Image Popup Logic
 */
function openPopup(src) {
    const popup = document.getElementById('imagePopup');
    const popupImg = document.getElementById('popupImg');
    
    if (popup && popupImg) {
        popupImg.src = src;
        popup.style.display = 'flex';
        
        setTimeout(() => {
            popup.classList.add('active');
        }, 10);

        document.body.style.overflow = 'hidden';
    }
}

function closePopup() {
    const popup = document.getElementById('imagePopup');
    
    if (popup) {
        popup.classList.remove('active');
        
        setTimeout(() => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}
