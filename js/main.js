/**
 * SEALBOUND - Landing Page JavaScript
 * Handles animations, interactions, and form submissions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    initScrollAnimations();
    initSealTooltips();
    initNewsletter();
    initSmoothScroll();
});

/**
 * Navigation scroll behavior and mobile toggle
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll detection for nav background
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Floating particle effect in hero section
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random positioning
    particle.style.left = `${Math.random() * 100}%`;

    // Random size
    const size = 2 + Math.random() * 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random animation delay and duration
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${6 + Math.random() * 4}s`;

    // Random color variation
    const colors = [
        'var(--color-primary-light)',
        'var(--color-primary)',
        'var(--color-secondary-light)',
        'var(--color-secondary)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
}

/**
 * Scroll-triggered fade-in animations
 */
function initScrollAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.feature-card, .lore-card, .loop-step, .detail-card, .character-card, ' +
        '.coming-card, .media-placeholder, .section-header, .about-main'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay for sibling elements
                const parent = entry.target.parentElement;
                const siblings = parent.querySelectorAll('.fade-in');
                const index = Array.from(siblings).indexOf(entry.target);

                entry.target.style.transitionDelay = `${index * 0.1}s`;
                entry.target.classList.add('visible');

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Seal pip tooltips in gameplay section
 */
function initSealTooltips() {
    const sealPips = document.querySelectorAll('.seal-pip');

    sealPips.forEach(pip => {
        const sealName = pip.dataset.seal;

        pip.addEventListener('mouseenter', (e) => {
            showTooltip(e.target, sealName);
        });

        pip.addEventListener('mouseleave', () => {
            hideTooltip();
        });

        // Keyboard accessibility
        pip.setAttribute('tabindex', '0');
        pip.setAttribute('role', 'button');
        pip.setAttribute('aria-label', sealName);

        pip.addEventListener('focus', (e) => {
            showTooltip(e.target, sealName);
        });

        pip.addEventListener('blur', () => {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    // Remove existing tooltip
    hideTooltip();

    const tooltip = document.createElement('div');
    tooltip.className = 'seal-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--color-bg-dark);
        color: var(--color-text-primary);
        padding: 0.5rem 1rem;
        border-radius: var(--radius-sm);
        font-size: 0.85rem;
        border: 1px solid var(--color-primary);
        pointer-events: none;
        z-index: 100;
        white-space: nowrap;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity 0.2s ease;
    `;

    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 40 + window.scrollY}px`;

    // Trigger animation
    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
    });
}

function hideTooltip() {
    const existing = document.querySelector('.seal-tooltip');
    if (existing) {
        existing.remove();
    }
}

/**
 * Newsletter form handling
 */
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    const successMessage = document.getElementById('newsletterSuccess');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.innerHTML;

        // Validate email
        if (!isValidEmail(email)) {
            shakeElement(form.querySelector('input'));
            return;
        }

        // Show loading state
        button.innerHTML = '<span>Subscribing...</span>';
        button.disabled = true;

        // Simulate API call (replace with actual API integration)
        try {
            await simulateApiCall(email);

            // Show success
            form.style.display = 'none';
            successMessage.hidden = false;

            // Track conversion (analytics placeholder)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    event_category: 'engagement'
                });
            }
        } catch (error) {
            // Show error
            button.innerHTML = originalText;
            button.disabled = false;
            showFormError(form, 'Something went wrong. Please try again.');
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function simulateApiCall(email) {
    // Replace this with actual API integration
    // Example: fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    element.addEventListener('animationend', () => {
        element.style.animation = '';
    }, { once: true });
}

function showFormError(form, message) {
    const existingError = form.querySelector('.form-error');
    if (existingError) existingError.remove();

    const error = document.createElement('p');
    error.className = 'form-error';
    error.textContent = message;
    error.style.cssText = `
        color: var(--color-accent);
        font-size: 0.85rem;
        margin-top: 0.5rem;
    `;

    form.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 5000);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            const navHeight = document.getElementById('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Utility: Add shake animation keyframes
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

/**
 * Performance: Debounce function for scroll events
 */
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}
