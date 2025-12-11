// NavaFit Animation Controller - Ancient Wisdom Meets Modern Motion
(function() {
    'use strict';

    class NavaFitAnimations {
        constructor() {
            this.observers = [];
            this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
            } else {
                this.setupAnimations();
            }
        }

        setupAnimations() {
            this.setupIntersectionObserver();
            this.setupScrollReveal();
            this.setupHoverEffects();
            this.setupParallaxEffects();
            this.setupTextAnimations();
            this.setupLoadingAnimations();
        }

        setupIntersectionObserver() {
            if (this.prefersReducedMotion) return;

            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            // Fade in animations
            const fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        fadeObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Slide animations
            const slideObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        slideObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe elements
            document.querySelectorAll('.fade-in-up').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                fadeObserver.observe(el);
            });

            document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down').forEach(el => {
                el.style.animationPlayState = 'paused';
                slideObserver.observe(el);
            });

            this.observers.push(fadeObserver, slideObserver);
        }

        setupScrollReveal() {
            const revealElements = document.querySelectorAll('.reveal-text');
            
            if (revealElements.length === 0 || this.prefersReducedMotion) return;

            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('revealed');
                        }, index * 100); // Stagger animation
                        
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -20px 0px'
            });

            revealElements.forEach(el => revealObserver.observe(el));
            this.observers.push(revealObserver);
        }

        setupHoverEffects() {
            // Enhanced hover effects for interactive elements
            const hoverElements = document.querySelectorAll('.hover-lift, .hover-glow, .hover-scale');
            
            hoverElements.forEach(element => {
                let rafId = null;

                const handleMouseEnter = (e) => {
                    if (this.prefersReducedMotion) return;

                    if (rafId) cancelAnimationFrame(rafId);
                    
                    rafId = requestAnimationFrame(() => {
                        if (element.classList.contains('hover-lift')) {
                            element.style.transform = 'translateY(-8px)';
                        }
                        
                        if (element.classList.contains('hover-scale')) {
                            element.style.transform = 'scale(1.05)';
                        }

                        if (element.classList.contains('hover-glow')) {
                            element.style.boxShadow = `
                                0 0 30px rgba(0, 227, 140, 0.3),
                                0 0 60px rgba(0, 227, 140, 0.1),
                                0 10px 25px rgba(0, 0, 0, 0.2)
                            `;
                        }
                    });
                };

                const handleMouseLeave = (e) => {
                    if (this.prefersReducedMotion) return;

                    if (rafId) cancelAnimationFrame(rafId);
                    
                    rafId = requestAnimationFrame(() => {
                        element.style.transform = '';
                        element.style.boxShadow = '';
                    });
                };

                element.addEventListener('mouseenter', handleMouseEnter, { passive: true });
                element.addEventListener('mouseleave', handleMouseLeave, { passive: true });
            });
        }

        setupParallaxEffects() {
            if (this.prefersReducedMotion) return;

            const parallaxElements = document.querySelectorAll('.parallax');
            if (parallaxElements.length === 0) return;

            let rafId = null;

            const handleScroll = () => {
                if (rafId) return;

                rafId = requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset;

                    parallaxElements.forEach(element => {
                        const speed = element.dataset.speed || 0.5;
                        const yPos = -(scrollTop * speed);
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    });

                    rafId = null;
                });
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
        }

        setupTextAnimations() {
            // Glitch effect enhancement
            const glitchElements = document.querySelectorAll('.glitch');
            
            glitchElements.forEach(element => {
                if (this.prefersReducedMotion) {
                    element.classList.remove('glitch');
                    return;
                }

                // Add random glitch triggers
                const triggerGlitch = () => {
                    element.classList.add('glitch-active');
                    setTimeout(() => {
                        element.classList.remove('glitch-active');
                    }, 2000);
                };

                // Random glitch every 10-30 seconds
                const randomInterval = () => {
                    const delay = Math.random() * 20000 + 10000; // 10-30 seconds
                    setTimeout(() => {
                        triggerGlitch();
                        randomInterval(); // Schedule next glitch
                    }, delay);
                };

                randomInterval();

                // Trigger on hover
                element.addEventListener('mouseenter', triggerGlitch);
            });

            // Typewriter effect for special text
            const typewriterElements = document.querySelectorAll('.typewriter');
            
            typewriterElements.forEach(element => {
                if (this.prefersReducedMotion) return;

                const text = element.textContent;
                const speed = parseInt(element.dataset.speed) || 50;
                
                element.textContent = '';
                element.style.borderRight = '2px solid var(--neon)';
                
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                    } else {
                        // Blinking cursor effect
                        setTimeout(() => {
                            element.style.borderRight = 'none';
                        }, 1000);
                    }
                };

                typeWriter();
            });
        }

        setupLoadingAnimations() {
            // Page load animations
            window.addEventListener('load', () => {
                if (this.prefersReducedMotion) return;

                // Animate hero elements on page load
                const heroElements = document.querySelectorAll('#home .glass-container > *');
                
                heroElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    }, index * 150);
                });

                // Animate navigation on load
                const nav = document.querySelector('.warrior-nav');
                if (nav) {
                    setTimeout(() => {
                        nav.style.opacity = '1';
                        nav.style.transform = 'translateY(0)';
                    }, 500);
                }
            });

            // Add loading state styles
            const loadingCSS = `
                .warrior-nav {
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                #home .glass-container > * {
                    opacity: 0;
                    transform: translateY(20px);
                }

                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .glitch-active::before,
                .glitch-active::after {
                    animation-duration: 0.5s;
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 1; }
                }

                .pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
            `;

            const styleSheet = document.createElement('style');
            styleSheet.textContent = loadingCSS;
            document.head.appendChild(styleSheet);
        }

        // Utility method to create custom animations
        createCustomAnimation(element, keyframes, options = {}) {
            if (this.prefersReducedMotion) return;

            const defaultOptions = {
                duration: 1000,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards'
            };

            const animationOptions = { ...defaultOptions, ...options };

            return element.animate(keyframes, animationOptions);
        }

        // Cleanup method
        destroy() {
            this.observers.forEach(observer => observer.disconnect());
            this.observers = [];
        }
    }

    // Global animation utilities
    window.NavaFitAnimations = NavaFitAnimations;

    // Initialize animations
    new NavaFitAnimations();

    // Export utility functions
    window.animateElement = function(element, animation = 'fadeInUp', delay = 0) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        setTimeout(() => {
            element.classList.add('animate-in');
            
            switch (animation) {
                case 'fadeInUp':
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                    break;
                case 'scaleIn':
                    element.style.transform = 'scale(1)';
                    element.style.opacity = '1';
                    break;
                case 'slideInLeft':
                    element.style.transform = 'translateX(0)';
                    element.style.opacity = '1';
                    break;
            }
        }, delay);
    };

})();
