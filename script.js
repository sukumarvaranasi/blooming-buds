/* ===================================
   Blooming Buds Home Daycare - JavaScript
   A Place Where Little Minds Grow Big!
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initForms();
    initModal();
    initSlideshow();
});

/* ===================================
   Navbar Functionality
   =================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        }
        
        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/* ===================================
   Mobile Menu
   =================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && mobileMenuBtn) {
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            document.body.style.overflow = 'hidden';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        document.body.style.overflow = '';
    }
}

/* ===================================
   Smooth Scroll
   =================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   Scroll Animations
   =================================== */
function initScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.feature-card, .timeline-item, .activity-item, .info-card');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-target');
        observer.observe(section);
    });
    
    // Add CSS for animations
    addAnimationStyles();
}

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-target {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-target.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card,
        .timeline-item,
        .activity-item,
        .info-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, box-shadow 0.3s ease;
        }
        
        .feature-card.animate-in,
        .timeline-item.animate-in,
        .activity-item.animate-in,
        .info-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

/* ===================================
   Form Handling
   =================================== */
function initForms() {
    const contactForm = document.getElementById('contactForm');
    const enrollmentForm = document.getElementById('enrollmentForm');
    
    // Add loading state on form submit (forms submit to FormSubmit service)
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', handleEnrollmentForm);
    }
}

function handleContactForm(e) {
    // FormSubmit handles the submission - just show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
    }
    // Form will submit normally to FormSubmit
}

function handleEnrollmentForm(e) {
    // FormSubmit handles the submission - just show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
    }
    // Form will submit normally to FormSubmit
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✅' : 'ℹ️'}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.2s;
                line-height: 1;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ===================================
   Modal Functionality
   =================================== */
function initModal() {
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeEnrollModal();
        }
    });
}

function openEnrollModal() {
    const modal = document.getElementById('enrollModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function closeEnrollModal() {
    const modal = document.getElementById('enrollModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ===================================
   Utility Functions
   =================================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add active state to nav links based on scroll position
window.addEventListener('scroll', debounce(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}, 100));

// Parallax effect for hero section
window.addEventListener('scroll', debounce(() => {
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const shapes = hero.querySelectorAll('.shape');
        const icons = hero.querySelectorAll('.floating-icon');
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        icons.forEach((icon, index) => {
            const speed = 0.08 + (index * 0.03);
            icon.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}, 10));

/* ===================================
   Slideshow/Gallery Functionality
   =================================== */
let currentSlide = 0;
let slideInterval = null;
let progressInterval = null;
let isAutoPlaying = true;
const SLIDE_DURATION = 1000; // 1 second per slide

/* ========================================
   📸 EASY MEDIA CONFIGURATION
   ========================================
   To add new images or videos:
   1. Add the file to /images or /videos folder
   2. Add a new entry to the array below
   
   Format: { file: 'filename.jpg', caption: 'Your Caption', icon: '🎨' }
   
   For videos, use the /videos folder path
   ======================================== */
const GALLERY_MEDIA = [
    // Images
    { file: 'images/image1.png', caption: 'Learning & Growing', icon: '📚' },
    { file: 'images/image2.png', caption: 'Creative Play', icon: '🎨' },
    { file: 'images/image3.png', caption: 'Outdoor Fun', icon: '🌿' },
    { file: 'images/image4.png', caption: 'Fun Activities', icon: '🧩' },
    { file: 'images/image5.jpeg', caption: 'Happy Kids', icon: '😊' },
    { file: 'images/image6.jpeg', caption: 'Playtime Fun', icon: '🎈' },
    { file: 'images/image7.jpeg', caption: 'Learning Together', icon: '👫' },
    { file: 'images/image8.jpeg', caption: 'Creative Time', icon: '✏️' },
    { file: 'images/image9.jpeg', caption: 'Exploring & Discovery', icon: '🔍' },
    { file: 'images/image10.jpeg', caption: 'Joyful Moments', icon: '🌟' },
    { file: 'images/image11.jpeg', caption: 'Growing Together', icon: '🌱' },
    { file: 'images/image12.jpeg', caption: 'Happy Days', icon: '☀️' },
    
    // Videos (add more videos here)
    { file: 'videos/video.mp4', caption: 'Our Daycare in Action', icon: '🎬', isVideo: true },
    { file: 'videos/video1.mp4', caption: 'Kids Having Fun', icon: '🎥', isVideo: true },
    
    // ➕ ADD NEW MEDIA HERE - Examples:
    // { file: 'images/new-photo.jpg', caption: 'New Photo', icon: '📷' },
    // { file: 'videos/new-video.mp4', caption: 'New Video', icon: '🎬', isVideo: true },
];

function initSlideshow() {
    const slideshow = document.getElementById('slideshow');
    const indicatorsContainer = document.getElementById('slideIndicators');
    
    if (!slideshow) return;
    
    // Generate slides dynamically from GALLERY_MEDIA array
    generateSlides(slideshow, indicatorsContainer);
    
    const slides = slideshow.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    // Start auto-play
    startAutoPlay();
    
    // Pause on hover
    const container = document.querySelector('.slideshow-container');
    if (container) {
        container.addEventListener('mouseenter', pauseAutoPlay);
        container.addEventListener('mouseleave', () => {
            if (isAutoPlaying) startAutoPlay();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (container) {
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1); // Swipe left - next
            } else {
                changeSlide(-1); // Swipe right - prev
            }
        }
    }
}

// Generate slides dynamically from the GALLERY_MEDIA array
function generateSlides(container, indicatorsContainer) {
    // Clear existing content
    container.innerHTML = '';
    if (indicatorsContainer) indicatorsContainer.innerHTML = '';
    
    GALLERY_MEDIA.forEach((media, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = index === 0 ? 'slide active' : 'slide';
        
        if (media.isVideo) {
            // Video slide
            slide.innerHTML = `
                <video autoplay muted loop playsinline>
                    <source src="${media.file}" type="video/mp4">
                </video>
                <div class="slide-caption">
                    <span class="caption-icon">${media.icon}</span>
                    <span class="caption-text">${media.caption}</span>
                </div>
            `;
        } else {
            // Image slide
            slide.innerHTML = `
                <img src="${media.file}" alt="${media.caption} at Blooming Buds">
                <div class="slide-caption">
                    <span class="caption-icon">${media.icon}</span>
                    <span class="caption-text">${media.caption}</span>
                </div>
            `;
        }
        
        container.appendChild(slide);
        
        // Create indicator
        if (indicatorsContainer) {
            const indicator = document.createElement('button');
            indicator.className = index === 0 ? 'indicator active' : 'indicator';
            indicator.onclick = () => goToSlide(index);
            indicatorsContainer.appendChild(indicator);
        }
    });
}

function showSlide(index) {
    const slideshow = document.getElementById('slideshow');
    if (!slideshow) return;
    
    const slides = slideshow.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.slide-indicators .indicator');
    
    if (slides.length === 0) return;
    
    // Wrap around
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === currentSlide) {
            indicator.classList.add('active');
        }
    });
    
    // Reset progress bar
    resetProgressBar();
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
    
    // Restart auto-play timer
    if (isAutoPlaying) {
        stopAutoPlay();
        startAutoPlay();
    }
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    
    // Restart auto-play timer
    if (isAutoPlaying) {
        stopAutoPlay();
        startAutoPlay();
    }
}

function startAutoPlay() {
    stopAutoPlay(); // Clear any existing intervals
    
    // Progress bar animation
    let progress = 0;
    const progressBar = document.getElementById('progressBar');
    
    progressInterval = setInterval(() => {
        progress += (100 / (SLIDE_DURATION / 50));
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }, 50);
    
    // Slide change
    slideInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, SLIDE_DURATION);
}

function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function pauseAutoPlay() {
    stopAutoPlay();
}

function resetProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
}

function toggleAutoPlay() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const autoPlayStatus = document.getElementById('autoPlayStatus');
    const pauseIcon = playPauseBtn?.querySelector('.pause-icon');
    const playIcon = playPauseBtn?.querySelector('.play-icon');
    
    isAutoPlaying = !isAutoPlaying;
    
    if (isAutoPlaying) {
        startAutoPlay();
        if (pauseIcon) pauseIcon.style.display = 'inline';
        if (playIcon) playIcon.style.display = 'none';
        if (autoPlayStatus) autoPlayStatus.textContent = 'ON';
    } else {
        stopAutoPlay();
        resetProgressBar();
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (playIcon) playIcon.style.display = 'inline';
        if (autoPlayStatus) autoPlayStatus.textContent = 'OFF';
    }
}

// Make functions available globally
window.openEnrollModal = openEnrollModal;
window.closeEnrollModal = closeEnrollModal;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.toggleAutoPlay = toggleAutoPlay;