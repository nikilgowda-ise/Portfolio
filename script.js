/**
 * ==============================================================================
 * PROFESSIONAL PORTFOLIO INTERACTION SCRIPT
 * Author: Nikil Gowda D
 * 
 * Core Features:
 * 1. Dark/Light Theme Switcher with LocalStorage & OS Auto-Detection
 * 2. Responsive Mobile Navigation Drawer & Backdrop
 * 3. Active Nav Link Tracking on Scroll (IntersectionObserver)
 * 4. Contact Form Direct WhatsApp Message to Phone Number (+91 8217760885)
 * 5. Footer Current Year & Smooth Back-to-Top
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. THEME SWITCHER (DARK / LIGHT MODE)
    // =========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootHtml = document.documentElement;
    const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize saved theme or reflect OS setting
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        rootHtml.setAttribute('data-theme', savedTheme);
    } else {
        rootHtml.setAttribute('data-theme', mediaQueryDark.matches ? 'dark' : 'light');
    }

    function toggleTheme() {
        const currentTheme = rootHtml.getAttribute('data-theme') || (mediaQueryDark.matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        rootHtml.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Real-time OS theme preference listener
    mediaQueryDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            rootHtml.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });


    // =========================================================================
    // 2. MOBILE NAVIGATION MENU
    // =========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const siteNav = document.getElementById('site-nav');
    const navBackdrop = document.getElementById('nav-backdrop');

    function toggleMobileMenu() {
        if (siteNav && mobileMenuBtn) {
            const isOpen = siteNav.classList.toggle('open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (navBackdrop) {
                navBackdrop.style.display = isOpen ? 'block' : 'none';
            }
        }
    }

    function closeMobileMenu() {
        if (siteNav && mobileMenuBtn) {
            siteNav.classList.remove('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            if (navBackdrop) navBackdrop.style.display = 'none';
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (navBackdrop) navBackdrop.addEventListener('click', closeMobileMenu);

    const navLinks = document.querySelectorAll('.site-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });


    // =========================================================================
    // 3. ACTIVE NAVIGATION LINK TRACKING ON SCROLL
    // =========================================================================
    const sections = document.querySelectorAll('main section[id]');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));


    // =========================================================================
    // 4. CONTACT FORM HANDLING WITH DIRECT PHONE NOTIFICATION (+91 8217760885)
    // =========================================================================
    const contactForm = document.getElementById('portfolio-contact-form');
    const confirmationBanner = document.getElementById('contact-confirmation');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name')?.value.trim();
            const email = document.getElementById('contact-email')?.value.trim();
            const subject = document.getElementById('contact-subject')?.value.trim();
            const message = document.getElementById('contact-message')?.value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill out all required fields before sending.');
                return;
            }

            // Construct formatted message to Nikil's phone number (+91 8217760885)
            const formattedMessage = `Hello Nikil,%0A%0AI found your portfolio website and would like to connect!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subject:* ${encodeURIComponent(subject)}%0A%0A*Message:*%0A${encodeURIComponent(message)}`;

            // WhatsApp Direct Link to Phone Number +918217760885
            const phoneWhatsappUrl = `https://wa.me/918217760885?text=${formattedMessage}`;

            // Open WhatsApp direct message in a new window/tab
            window.open(phoneWhatsappUrl, '_blank');

            // Show confirmation banner in-page
            if (confirmationBanner) {
                confirmationBanner.removeAttribute('hidden');
                confirmationBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Reset form fields
            contactForm.reset();
        });
    }


    // =========================================================================
    // 5. FOOTER CURRENT YEAR & SMOOTH SCROLLING
    // =========================================================================
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
