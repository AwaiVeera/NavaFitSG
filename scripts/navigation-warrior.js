// Enhanced Warrior Navigation with 3D Tilt Effects
(function() {
    'use strict';

    class WarriorNavigation {
        constructor() {
            this.nav = document.querySelector('.warrior-nav-glass');
            this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
            this.mobileMenu = document.getElementById('mobileMenu');
            this.isDesktop = window.matchMedia('(min-width: 769px)');
            
            this.init();
        }

        init() {
            this.setupMobileMenu();
            this.setupDesktop3D();
            this.setupScrollEffects();
            this.setupLinkInteractions();
            this.handleResize();
        }

        setupMobileMenu() {
            if (!this.mobileMenuBtn || !this.mobileMenu) return;

            this.mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });

            // Close menu when clicking on menu background
            this.mobileMenu.addEventListener('click', (e) => {
                if (e.target === this.mobileMenu) {
                    this.closeMobileMenu();
                }
            });

            // Close menu when pressing Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            });

            // Close menu when clicking on mobile nav links
            const mobileLinks = this.mobileMenu.querySelectorAll('.warrior-mobile-nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }

        toggleMobileMenu() {
            const isOpen = this.mobileMenu.classList.contains('active');
            
            if (isOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }

        openMobileMenu() {
            this.mobileMenu.classList.add('active');
            this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
            this.mobileMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        closeMobileMenu() {
            this.mobileMenu.classList.remove('active');
            this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            this.mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore background scroll
        }

        setupDesktop3D() {
            if (!this.nav) return;

            let rafId = null;

            const handleMouseMove = (e) => {
                if (!this.isDesktop.matches) return;

                const rect = this.nav.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -8; // Inverted for natural feel
                const rotateY = ((x - centerX) / centerX) * 10;
                const translateZ = 15;
                
                // Calculate intensity for dynamic glow
                const intensity = Math.min(Math.abs(rotateX / 8) + Math.abs(rotateY / 10), 1);

                if (rafId) cancelAnimationFrame(rafId);
                
                rafId = requestAnimationFrame(() => {
                    this.nav.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
                    this.nav.style.boxShadow = `
                        0 ${10 + intensity * 20}px ${30 + intensity * 20}px rgba(0, 227, 140, ${0.15 + intensity * 0.1}),
                        inset 0 1px 0 0 rgba(255, 255, 255, ${0.1 + intensity * 0.1}),
                        0 0 ${40 + intensity * 20}px rgba(0, 227, 140, ${0.05 + intensity * 0.05})
                    `;
                });
            };

            const handleMouseLeave = () => {
                if (rafId) cancelAnimationFrame(rafId);
                
                rafId = requestAnimationFrame(() => {
                    this.nav.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                    this.nav.style.boxShadow = `
                        0 8px 32px 0 rgba(0, 227, 140, 0.15),
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
                    `;
                });
            };

            this.nav.addEventListener('mousemove', handleMouseMove, { passive: true });
            this.nav.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        }

        setupScrollEffects() {
            let lastScrollY = 0;
            let rafId = null;

            const handleScroll = () => {
                if (rafId) return;

                rafId = requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
                    
                    // Add/remove scrolled class for styling
                    if (currentScrollY > 50) {
                        this.nav?.classList.add('scrolled');
                    } else {
                        this.nav?.classList.remove('scrolled');
                    }

                    // Hide/show navigation on scroll (optional)
                    if (Math.abs(currentScrollY - lastScrollY) > 10) {
                        if (scrollDirection === 'down' && currentScrollY > 200) {
                            this.nav?.classList.add('nav-hidden');
                        } else if (scrollDirection === 'up') {
                            this.nav?.classList.remove('nav-hidden');
                        }
                    }

                    lastScrollY = currentScrollY;
                    rafId = null;
                });
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
        }

        setupLinkInteractions() {
            // Enhanced navigation link interactions
            const navLinks = document.querySelectorAll('.warrior-nav-link, .warrior-mobile-nav-link');
            
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    link.style.transform = 'translateY(-2px) translateZ(5px)';
                });

                link.addEventListener('mouseleave', () => {
                    link.style.transform = '';
                });

                // Smooth scroll for anchor links
                if (link.getAttribute('href')?.startsWith('#')) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = link.getAttribute('href').substring(1);
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {
                            const offsetTop = targetElement.offsetTop - 100; // Account for fixed nav
                            
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });

                            // Close mobile menu if open
                            this.closeMobileMenu();
                        }
                    });
                }
            });
        }

        handleResize() {
            const handleResize = () => {
                // Close mobile menu on resize to desktop
                if (this.isDesktop.matches) {
                    this.closeMobileMenu();
                }

                // Reset 3D transforms on mobile
                if (!this.isDesktop.matches && this.nav) {
                    this.nav.style.transform = '';
                    this.nav.style.boxShadow = '';
                }
            };

            window.addEventListener('resize', handleResize, { passive: true });
            this.isDesktop.addEventListener('change', handleResize);
        }
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new WarriorNavigation());
    } else {
        new WarriorNavigation();
    }

    // Add CSS for enhanced states
    const additionalCSS = `
        .warrior-nav-glass.scrolled {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
            backdrop-filter: blur(25px) saturate(200%);
        }

        .warrior-nav-glass.nav-hidden {
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }

        .warrior-nav-glass:not(.nav-hidden) {
            transform: translateY(0);
            transition: transform 0.3s ease;
        }

        @media (max-width: 768px) {
            .warrior-nav-glass.nav-hidden,
            .warrior-nav-glass:not(.nav-hidden) {
                transform: none !important;
            }
        }
    `;

    // Inject additional CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalCSS;
    document.head.appendChild(styleSheet);

})();
