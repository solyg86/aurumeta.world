/**
 * Aurumeta.World - PopStoic Landing Page JavaScript
 * Built with PopStoic philosophy - Where Wisdom Meets Innovation
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏛️ Aurumeta.World - PopStoic Platform Initialized');
    
    initializeSmoothScrolling();
    initializeEmailForm();
    initializeScrollAnimations();
    initializeHoverEffects();
});

/**
 * Initialize smooth scrolling for CTA button
 */
function initializeSmoothScrolling() {
    const ctaButton = document.querySelector('.cta-primary[href="#cta"]');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('cta');
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

/**
 * Initialize email form submission handler
 */
function initializeEmailForm() {
    const emailForm = document.querySelector('.email-form');
    const emailInput = document.querySelector('.email-input');
    
    if (emailForm && emailInput) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                handleEmailSubmission(email);
                emailInput.value = '';
                showSuccessMessage();
            } else {
                showErrorMessage('Please enter a valid email address');
            }
        });
    }
}

/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Handle email submission (integrate with your backend)
 * @param {string} email - Validated email address
 */
function handleEmailSubmission(email) {
    // TODO: Replace with your actual API endpoint
    console.log('📧 Email submitted:', email);
    
    // Example: Send to your backend
    // fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email: email })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
}

/**
 * Show success message to user
 */
function showSuccessMessage() {
    // Create and show success notification
    const notification = createNotification(
        'Thank you! You will receive more information about Aurumeta.World soon',
        'success'
    );
    showNotification(notification);
}

/**
 * Show error message to user
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    const notification = createNotification(message, 'error');
    showNotification(notification);
}

/**
 * Create notification element
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success' or 'error')
 * @returns {HTMLElement} - Notification element
 */
function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    return notification;
}

/**
 * Show notification with animation
 * @param {HTMLElement} notification - Notification element to show
 */
function showNotification(notification) {
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/**
 * Initialize scroll animations for sections
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe all sections except hero
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
}

/**
 * Initialize hover effects and interactions
 */
function initializeHoverEffects() {
    // Add ripple effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // Add enhanced hover effects to solution items
    const solutionItems = document.querySelectorAll('.solution-item');
    
    solutionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Create ripple effect on button click
 * @param {Event} e - Click event
 * @param {HTMLElement} button - Button element
 */
function createRippleEffect(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
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
    
    // Add ripple animation keyframes if not exists
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
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

/**
 * Initialize social media tracking (replace with your analytics)
 */
function trackSocialClick(platform) {
    console.log(`🔗 Social click tracked: ${platform}`);
    
    // Example: Google Analytics tracking
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'social_click', {
    //         'social_platform': platform,
    //         'page_title': document.title
    //     });
    // }
}

// Add click tracking to social buttons
document.addEventListener('DOMContentLoaded', function() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const platform = this.classList.contains('discord') ? 'discord' :
                           this.classList.contains('twitter') ? 'twitter' :
                           this.classList.contains('telegram') ? 'telegram' : 'unknown';
            
            trackSocialClick(platform);
        });
    });
});

/**
 * Performance optimization: Lazy load animations
 */
function optimizePerformance() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-animations');
        
        // Add reduced animation styles
        const style = document.createElement('style');
        style.textContent = `
            .reduced-animations * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

/**
 * Error handling and debugging
 */
window.addEventListener('error', function(e) {
    console.error('🚨 Aurumeta.World Error:', e.error);
    
    // You can send errors to your logging service here
    // logErrorToService(e.error);
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        handleEmailSubmission,
        trackSocialClick
    };
}