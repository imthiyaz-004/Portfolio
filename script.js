// Portfolio Website JavaScript
// Author: IMTHIYAZ K

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initNavigation();
    initSkillBars();
    initContactForm();
    initFloatingShapes();
    initCodeAnimation();
    initScrollIndicator();
    initAccoladesToggle();
    initThemeToggle();
    initIronManEffects();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for skill bars
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.experience-card, .project-card, .achievement-item, .platform-card, .hobby-item, .link-item, .skill-progress');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.classList.add('slide-in-left');
        observer.observe(item);
    });
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll - theme aware
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        
        if (window.scrollY > 50) {
            if (currentTheme === 'light') {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(11, 11, 16, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 229, 255, 0.2)';
            }
        } else {
            navbar.style.background = 'rgba(10, 12, 18, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // EmailJS submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            if (!window.emailjs) {
                showNotification('Email service not initialized. Please configure EmailJS.', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }

            const TEMPLATE_PARAMS = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'imthiyazk004@gmail.com'
            };

            // EmailJS configuration
            const SERVICE_ID = 'service_2tyyus6';
            const TEMPLATE_ID = 'template_qjua815';

            emailjs.send(SERVICE_ID, TEMPLATE_ID, TEMPLATE_PARAMS)
                .then(() => {
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch(() => {
                    showNotification('Failed to send message. Please try again later.', 'error');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Floating shapes animation
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500);
    });
}

// Code animation
function initCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        const width = line.style.width || '80%';
        line.style.setProperty('--width', width);
    });
}

// Scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 10) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing effect for hero intro
function initTypingEffect() {
    const heroIntro = document.querySelector('.hero-intro');
    if (!heroIntro) return;
    
    const text = heroIntro.textContent;
    heroIntro.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroIntro.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Initialize typing effect
setTimeout(initTypingEffect, 500);

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.experience-card, .project-card, .platform-card, .hobby-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click effects to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cta-button, .project-link, .platform-link, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-title, .about-info, .education-timeline');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Add mobile menu styles
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-links .nav-link {
            font-size: 1.2rem;
            margin: 20px 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

// Add smooth transitions for all interactive elements
const transitionStyle = document.createElement('style');
transitionStyle.textContent = `
    .experience-card,
    .project-card,
    .platform-card,
    .hobby-item,
    .link-item,
    .achievement-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-link,
    .cta-button,
    .project-link,
    .platform-link,
    .submit-btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .form-group input,
    .form-group textarea {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(transitionStyle);

// Toggle between Achievements and Certifications
function initAccoladesToggle() {
    const buttons = document.querySelectorAll('.toggle-btn');
    const achievementsList = document.querySelector('#achievements-list');
    const certificationsList = document.querySelector('#certifications-list');
    const achievementsCol = document.querySelector('#achievements-column');
    const certificationsCol = document.querySelector('#certifications-column');
    if (!buttons.length || !achievementsList || !certificationsList) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            if (target === '#achievements-list') {
                // show achievements pane
                certificationsCol && certificationsCol.classList.add('hidden');
                achievementsCol && achievementsCol.classList.remove('hidden');
                certificationsList.classList.add('hidden');
                achievementsList.classList.remove('hidden');
            } else {
                // show certifications pane
                achievementsCol && achievementsCol.classList.add('hidden');
                certificationsCol && certificationsCol.classList.remove('hidden');
                certificationsList.classList.remove('hidden');
                achievementsList.classList.add('hidden');
            }
        });
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Resolve initial theme from storage or system preference
    const stored = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = stored || (systemPrefersLight ? 'light' : 'dark');
    body.setAttribute('data-theme', initialTheme);
    themeToggle && themeToggle.setAttribute('aria-checked', String(initialTheme === 'light'));

    // React to system changes only if user hasn't set preference
    if (!stored && window.matchMedia) {
        const media = window.matchMedia('(prefers-color-scheme: light)');
        media.addEventListener('change', (e) => {
            const newTheme = e.matches ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            themeToggle && themeToggle.setAttribute('aria-checked', String(newTheme === 'light'));
            updateIronManEffectsForTheme(newTheme);
            updateNavbarForTheme();
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Enhanced transition
            enhanceThemeTransition();
            body.style.transition = 'all 0.25s ease';
            setTimeout(() => { body.style.transition = ''; }, 250);

            // Update dependent visuals
            updateIronManEffectsForTheme(newTheme);
            updateNavbarForTheme();
            themeToggle.setAttribute('aria-checked', String(newTheme === 'light'));
        });

        // Keyboard accessibility
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeToggle.click();
            }
        });
    }
}

// Iron Man Effects Enhancement
function initIronManEffects() {
    // Enhanced particle movement
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        // Add random movement patterns
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = (Math.random() - 0.5) * 100;
            const currentTransform = particle.style.transform || '';
            particle.style.transform = `${currentTransform} translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 800);
    });
    
    // Arc reactor interaction
    const arcReactor = document.querySelector('.arc-reactor');
    if (arcReactor) {
        arcReactor.addEventListener('mouseenter', () => {
            arcReactor.style.transform = 'scale(1.2)';
            arcReactor.style.filter = 'brightness(1.5)';
        });
        
        arcReactor.addEventListener('mouseleave', () => {
            arcReactor.style.transform = 'scale(1)';
            arcReactor.style.filter = 'brightness(1)';
        });
    }
    
    // Terminal typing effect enhancement
    const codeTexts = document.querySelectorAll('.code-text');
    codeTexts.forEach((text, index) => {
        const originalText = text.textContent;
        text.textContent = '';
        
        setTimeout(() => {
            typeText(text, originalText, 50);
        }, index * 1000);
    });
    
    // HUD corner animations
    const hudCorners = document.querySelectorAll('.hud-corner');
    hudCorners.forEach((corner, index) => {
        setTimeout(() => {
            corner.style.opacity = '1';
            corner.style.transform = 'scale(1)';
        }, index * 200);
    });
}

// Update Iron Man effects based on theme
function updateIronManEffectsForTheme(theme) {
    const ironManEffects = document.querySelector('.iron-man-effects');
    const arcReactor = document.querySelector('.arc-reactor');
    const particles = document.querySelectorAll('.particle');
    const beams = document.querySelectorAll('.beam');
    
    if (theme === 'light') {
        // Adjust effects for light theme
        if (ironManEffects) ironManEffects.style.opacity = '0.4';
        if (arcReactor) arcReactor.style.filter = 'brightness(0.8)';
        particles.forEach(particle => {
            particle.style.opacity = '0.6';
        });
        beams.forEach(beam => {
            beam.style.opacity = '0.3';
        });
    } else {
        // Reset to dark theme effects
        if (ironManEffects) ironManEffects.style.opacity = '1';
        if (arcReactor) arcReactor.style.filter = 'brightness(1)';
        particles.forEach(particle => {
            particle.style.opacity = '1';
        });
        beams.forEach(beam => {
            beam.style.opacity = '1';
        });
    }
}

// Typing effect for terminal
function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Enhanced floating shapes with Iron Man style
function enhanceFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Add pulsing glow effect
        shape.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.5)';
        
        // Add random color variations
        const colors = ['#00e5ff', '#f59e0b', '#e11d2e'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        setInterval(() => {
            shape.style.background = `radial-gradient(circle, ${randomColor}40, ${randomColor}10)`;
        }, 2000 + index * 500);
    });
}

// Enhanced global animations
function initGlobalAnimations() {
    // Add interactive effects to arc reactors
    const arcReactors = document.querySelectorAll('.arc-reactor');
    arcReactors.forEach((reactor, index) => {
        reactor.addEventListener('mouseenter', () => {
            reactor.style.transform = 'scale(1.1)';
            reactor.style.filter = 'brightness(1.3)';
        });
        
        reactor.addEventListener('mouseleave', () => {
            reactor.style.transform = 'scale(1)';
            reactor.style.filter = 'brightness(1)';
        });
    });
    
    // Add scroll-based animation intensity
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const scrollSpeed = Math.abs(scrollY - lastScrollY);
        const globalEffects = document.querySelector('.global-iron-man-effects');
        
        if (globalEffects) {
            // Increase animation intensity based on scroll speed
            const intensity = Math.min(scrollSpeed / 10, 2);
            globalEffects.style.filter = `brightness(${1 + intensity * 0.2}) saturate(${1 + intensity * 0.3})`;
            
            // Reset after a delay
            setTimeout(() => {
                globalEffects.style.filter = 'brightness(1) saturate(1)';
            }, 200);
        }
        
        lastScrollY = scrollY;
    });
}

// Update navbar for theme changes
function updateNavbarForTheme() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    
    if (window.scrollY > 50) {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(11, 11, 16, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 229, 255, 0.2)';
        }
    } else {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.6)';
        } else {
            navbar.style.background = 'rgba(10, 12, 18, 0.6)';
        }
        navbar.style.boxShadow = 'none';
    }
}

// Initialize enhanced effects
setTimeout(enhanceFloatingShapes, 1000);
initGlobalAnimations();

// Enhanced Iron Man/JARVIS cursor with better performance
function initJarvisCursor() {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');

    // Inner layers
    const ring = document.createElement('div');
    ring.className = 'jarvis-cursor-ring';
    const dashed = document.createElement('div');
    dashed.className = 'jarvis-cursor-dashed';
    const crosshair = document.createElement('div');
    crosshair.className = 'jarvis-cursor-crosshair';

    cursor.className = 'jarvis-cursor';
    cursorDot.className = 'jarvis-cursor-dot';

    cursor.appendChild(ring);
    cursor.appendChild(dashed);
    cursor.appendChild(crosshair);

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    let prevX = 0, prevY = 0;

    // Smaller trail pool and faster fade for responsiveness
    const trailPoolSize = 8;
    const trails = [];
    for (let i = 0; i < trailPoolSize; i++) {
        const t = document.createElement('div');
        t.className = 'jarvis-trail';
        document.body.appendChild(t);
        trails.push({ el: t, life: 0 });
    }
    let trailIndex = 0;

    // Track mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    // Magnetic hover
    const interactiveElements = document.querySelectorAll(`
        a, button, input, textarea, select,
        .project-card, .experience-card, .platform-card, .hobby-item, .link-item,
        .theme-toggle, .nav-link, .cta-button, .project-link, .platform-link,
        .submit-btn, .award-card, .certification-card, .toggle-btn,
        .profile-image, .arc-reactor, .code-animation
    `);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
        el.addEventListener('mousedown', () => {
            cursor.classList.add('click', 'burst');
            cursorDot.classList.add('click');
            setTimeout(() => cursor.classList.remove('burst'), 300);
        });
        el.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
            cursorDot.classList.remove('click');
        });
    });

    // RAF loop with velocity-based stretch
    function animateCursor() {
        const vx = mouseX - prevX;
        const vy = mouseY - prevY;
        const velocity = Math.hypot(vx, vy);

        // Even faster following
        cursorX += (mouseX - cursorX) * 0.35;
        cursorY += (mouseY - cursorY) * 0.35;
        dotX += (mouseX - dotX) * 0.75;
        dotY += (mouseY - dotY) * 0.75;

        // Transform
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

        // Stretch ring based on velocity
        const maxStretch = 0.2;
        const stretch = Math.min(velocity / 700, maxStretch);
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        ring.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch})`;
        dashed.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        crosshair.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

        // Trail rendering (prompt appearance, quick fade)
        if (velocity > 0.4) {
            const t = trails[trailIndex];
            t.life = 1;
            t.el.style.opacity = '0.85';
            t.el.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            trailIndex = (trailIndex + 1) % trailPoolSize;
        }
        for (let i = 0; i < trailPoolSize; i++) {
            const t = trails[i];
            if (t.life > 0) {
                t.life *= 0.8; // quicker fade
                t.el.style.opacity = String(0.6 * t.life);
            }
        }

        prevX = mouseX;
        prevY = mouseY;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Window enter/leave visibility
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
        trails.forEach(t => t.el.style.opacity = '0');
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// Initialize JARVIS cursor only on desktop and if device supports it
if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    // Check if device has good performance
    const isHighPerformance = window.devicePixelRatio <= 2 && navigator.hardwareConcurrency >= 4;
    
    if (isHighPerformance) {
        initJarvisCursor();
    } else {
        // Fallback: show a simpler cursor for lower-end devices
        document.body.style.cursor = 'crosshair';
    }
}

// Add JARVIS sound effects (optional - can be enabled later)
function addJarvisSounds() {
    // Placeholder for future sound effects
    // Can add hover sounds, click sounds, etc.
}

// Enhanced theme transition with JARVIS effect
function enhanceThemeTransition() {
    const body = document.body;
    const originalTransition = body.style.transition;
    
    // Add scanning effect during theme change
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
        z-index: 10001;
        animation: themeScan 0.5s ease-out;
    `;
    
    document.body.appendChild(scanLine);
    
    setTimeout(() => {
        scanLine.remove();
    }, 500);
}

// Add CSS for theme scan animation
const themeScanStyle = document.createElement('style');
themeScanStyle.textContent = `
    @keyframes themeScan {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
`;
document.head.appendChild(themeScanStyle);
