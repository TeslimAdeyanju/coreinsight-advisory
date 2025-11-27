/**
 * CoreInsight Financial Advisory Ltd
 * Main JavaScript
 * Handles mobile menu toggle and minor interactions
 */

(function() {
    'use strict';

    // DOM Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    /**
     * Toggle mobile menu visibility
     */
    function toggleMobileMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Handle keyboard navigation for accessibility
     * @param {KeyboardEvent} event 
     */
    function handleKeyDown(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
            menuToggle.focus();
        }
    }

    /**
     * Handle window resize - close menu if window becomes larger
     */
    function handleResize() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }

    /**
     * Smooth scroll to anchor links (for same-page navigation)
     * @param {Event} event 
     */
    function handleAnchorClick(event) {
        const href = event.currentTarget.getAttribute('href');
        
        // Check if it's an anchor link on the same page
        if (href.startsWith('#') && href.length > 1) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                // Close mobile menu first if open
                closeMobileMenu();
                
                // Scroll to target with offset for fixed header
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Set focus to target for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        }
    }

    /**
     * Initialize all event listeners
     */
    function init() {
        // Mobile menu toggle
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', toggleMobileMenu);
            
            // Close menu when clicking a nav link (for mobile)
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        closeMobileMenu();
                    }
                });
            });
        }

        // Handle anchor links for smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', handleAnchorClick);
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyDown);

        // Window resize handler
        window.addEventListener('resize', handleResize);

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    closeMobileMenu();
                }
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
