// Main Page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.experience-card, .destination-card, .section-header');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Hero section animations
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.classList.add('slide-in-left');
        observer.observe(heroText);
    }
    
    if (heroImage) {
        heroImage.classList.add('slide-in-right');
        observer.observe(heroImage);
    }

    // About section animations
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }
    
    if (aboutImage) {
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutImage);
    }

    // Experience cards hover effects
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
        });
    });

    // Destination cards click handlers
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        const exploreBtn = card.querySelector('.btn-explore');
        const destinationName = card.querySelector('.destination-info h3').textContent;
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                // Add your destination exploration logic here
                console.log(`Exploring ${destinationName}`);
                
                // Visual feedback
                this.textContent = 'Carregando...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = 'Explorar';
                    this.disabled = false;
                }, 1500);
            });
        }
    });

    // Button click animations
    const allButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-explore');
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
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

    // Add ripple animation CSS
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        const aboutImage = document.querySelector('.about-image img');
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
        }
        
        if (aboutImage && scrolled > window.innerHeight) {
            const aboutSection = document.querySelector('.about-section');
            const aboutOffset = aboutSection.getBoundingClientRect().top;
            if (aboutOffset < window.innerHeight && aboutOffset > -aboutSection.offsetHeight) {
                aboutImage.style.transform = `translateY(${(scrolled - window.innerHeight) * 0.1}px)`;
            }
        }
    });

    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            
            if (email) {
                const originalText = button.textContent;
                button.textContent = 'Inscrevendo...';
                button.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    button.textContent = '✓ Inscrito!';
                    button.style.background = '#28a745';
                    this.querySelector('input[type="email"]').value = '';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.background = '';
                    }, 2000);
                }, 1000);
            }
        });
    }

    // Counter animation for about badge
    const badge = document.querySelector('.about-badge span');
    if (badge) {
        const targetNumber = 1000;
        let currentNumber = 0;
        const increment = targetNumber / 100;
        
        const badgeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= targetNumber) {
                            currentNumber = targetNumber;
                            clearInterval(counter);
                            badge.textContent = `+${Math.floor(currentNumber)}`;
                        } else {
                            badge.textContent = `+${Math.floor(currentNumber)}`;
                        }
                    }, 20);
                    badgeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        badgeObserver.observe(badge);
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm.length > 2) {
                // Highlight matching destinations
                const destinationCards = document.querySelectorAll('.destination-card');
                destinationCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.border = '2px solid #667eea';
                        card.style.transform = 'scale(1.02)';
                    } else {
                        card.style.border = '';
                        card.style.transform = '';
                    }
                });
            } else {
                // Reset all cards
                const destinationCards = document.querySelectorAll('.destination-card');
                destinationCards.forEach(card => {
                    card.style.border = '';
                    card.style.transform = '';
                });
            }
        });
    }

    // Mobile menu enhancements (if needed)
    const mobileMenuToggle = document.querySelector('.bi-list');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('show');
                document.body.classList.remove('menu-open');
            });
        });
    }

    console.log('Main page JavaScript initialized successfully!');
});
