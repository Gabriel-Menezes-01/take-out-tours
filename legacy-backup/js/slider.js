// Enhanced Slider functionality
class AdvancedSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide-box');
        this.btnNavs = document.querySelectorAll('.btn-nav');
        this.btnAnterior = document.getElementById('anterior');
        this.btnProxima = document.getElementById('proxima');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.isTransitioning = false;
        this.autoPlayDelay = 6000;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Initialize events
        this.btnAnterior?.addEventListener('click', () => this.previousSlide());
        this.btnProxima?.addEventListener('click', () => this.nextSlide());
        
        // Add events to navigation buttons
        this.btnNavs.forEach((btn, index) => {
            btn.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const slider = document.querySelector('.slider');
        slider?.addEventListener('mouseenter', () => this.stopAutoPlay());
        slider?.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/Swipe support
        this.addTouchSupport();
        
        // Progress bar
        this.createProgressBar();
        
        // Preload images
        this.preloadImages();
    }
    
    addTouchSupport() {
        const slider = document.querySelector('.slider');
        let startX = 0;
        let endX = 0;
        
        slider?.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        slider?.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }
    
    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'slider-progress';
        progressBar.innerHTML = '<div class="slider-progress-bar"></div>';
        
        const slider = document.querySelector('.slider');
        slider?.appendChild(progressBar);
        
        this.progressBar = progressBar.querySelector('.slider-progress-bar');
        this.updateProgressBar();
    }
    
    updateProgressBar() {
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
            this.progressBar.style.transition = 'none';
            
            setTimeout(() => {
                this.progressBar.style.transition = `width ${this.autoPlayDelay}ms linear`;
                this.progressBar.style.width = '100%';
            }, 100);
        }
    }
    
    preloadImages() {
        this.slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img && img.src) {
                const preloadImg = new Image();
                preloadImg.src = img.src;
            }
        });
    }
    
    updateSlider() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        // Remove active class from all slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('ativo');
            slide.style.transform = index < this.currentSlide ? 'translateX(-100%)' : 
                                   index > this.currentSlide ? 'translateX(100%)' : 'translateX(0)';
        });
        
        this.btnNavs.forEach(btn => btn.classList.remove('ativo'));
        
        // Add active class to current slide
        this.slides[this.currentSlide].classList.add('ativo');
        this.btnNavs[this.currentSlide]?.classList.add('ativo');
        
        // Update progress bar
        this.updateProgressBar();
        
        // Reset transition lock
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
    }
    
    previousSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        this.currentSlide = index;
        this.updateSlider();
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedSlider();
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});