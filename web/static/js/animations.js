/**
 * 🎨 Advanced Animations Suite
 * Creative micro-interactions and scroll-triggered animations
 */

class AnimationController {
  constructor() {
    this.animations = new Map();
    this.scrollTriggers = new Map();
    this.intersectionObserver = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    if (this.isReducedMotion) {
      this.disableAnimations();
      return;
    }

    this.setupScrollAnimations();
    this.setupMicroInteractions();
    this.setupPageTransitions();
    this.setupParallaxEffects();
    this.setupLoadingAnimations();
    this.setupHoverEffects();
    this.setupClickAnimations();
    this.setupTypingAnimations();
    this.setupParticleSystem();
    this.setupMorphingAnimations();
  }

  /**
   * 📜 Scroll-Triggered Animations
   */
  setupScrollAnimations() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerScrollAnimation(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe elements with scroll animations
    document.querySelectorAll('[data-scroll-animation]').forEach(el => {
      this.intersectionObserver.observe(el);
    });

    // Setup scroll progress indicator
    this.setupScrollProgress();
  }

  /**
   * 🎯 Trigger Scroll Animation
   */
  triggerScrollAnimation(element) {
    const animationType = element.dataset.scrollAnimation;
    const delay = parseInt(element.dataset.animationDelay) || 0;
    const duration = parseInt(element.dataset.animationDuration) || 1000;

    setTimeout(() => {
      switch (animationType) {
        case 'fadeInUp':
          this.fadeInUp(element, duration);
          break;
        case 'fadeInLeft':
          this.fadeInLeft(element, duration);
          break;
        case 'fadeInRight':
          this.fadeInRight(element, duration);
          break;
        case 'scaleIn':
          this.scaleIn(element, duration);
          break;
        case 'slideInUp':
          this.slideInUp(element, duration);
          break;
        case 'rotateIn':
          this.rotateIn(element, duration);
          break;
        case 'bounceIn':
          this.bounceIn(element, duration);
          break;
        case 'flipIn':
          this.flipIn(element, duration);
          break;
        case 'zoomIn':
          this.zoomIn(element, duration);
          break;
        case 'slideInLeft':
          this.slideInLeft(element, duration);
          break;
        case 'slideInRight':
          this.slideInRight(element, duration);
          break;
        case 'stagger':
          this.staggerAnimation(element, duration);
          break;
        default:
          this.fadeIn(element, duration);
      }
    }, delay);
  }

  /**
   * 📊 Scroll Progress Indicator
   */
  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #00d4ff, #ff6b6b);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  /**
   * 🎭 Micro-Interactions
   */
  setupMicroInteractions() {
    // Button hover effects
    this.setupButtonAnimations();
    
    // Card hover effects
    this.setupCardAnimations();
    
    // Link hover effects
    this.setupLinkAnimations();
    
    // Form input animations
    this.setupFormAnimations();
    
    // Icon animations
    this.setupIconAnimations();
  }

  /**
   * 🔘 Button Animations
   */
  setupButtonAnimations() {
    document.querySelectorAll('button, .btn').forEach(button => {
      // Ripple effect
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });

      // Magnetic effect
      button.addEventListener('mousemove', (e) => {
        this.magneticEffect(e, button);
      });

      // Hover scale
      button.addEventListener('mouseenter', () => {
        this.scaleElement(button, 1.05, 200);
      });

      button.addEventListener('mouseleave', () => {
        this.scaleElement(button, 1, 200);
      });
    });
  }

  /**
   * 💳 Card Animations
   */
  setupCardAnimations() {
    document.querySelectorAll('.card, .project-card, .skill-card').forEach(card => {
      // 3D tilt effect
      card.addEventListener('mousemove', (e) => {
        this.tiltCard(e, card);
      });

      card.addEventListener('mouseleave', () => {
        this.resetTilt(card);
      });

      // Hover lift effect
      card.addEventListener('mouseenter', () => {
        this.liftCard(card);
      });

      card.addEventListener('mouseleave', () => {
        this.dropCard(card);
      });
    });
  }

  /**
   * 🔗 Link Animations
   */
  setupLinkAnimations() {
    document.querySelectorAll('a:not(.btn)').forEach(link => {
      // Underline animation
      link.addEventListener('mouseenter', () => {
        this.animateUnderline(link, 'in');
      });

      link.addEventListener('mouseleave', () => {
        this.animateUnderline(link, 'out');
      });
    });
  }

  /**
   * 📝 Form Animations
   */
  setupFormAnimations() {
    document.querySelectorAll('input, textarea, select').forEach(input => {
      // Floating label animation
      this.setupFloatingLabel(input);
      
      // Focus glow effect
      input.addEventListener('focus', () => {
        this.focusGlow(input, true);
      });

      input.addEventListener('blur', () => {
        this.focusGlow(input, false);
      });
    });
  }

  /**
   * 🎯 Icon Animations
   */
  setupIconAnimations() {
    document.querySelectorAll('.icon, i[class*="fa-"]').forEach(icon => {
      // Spin on hover
      icon.addEventListener('mouseenter', () => {
        this.spinIcon(icon);
      });

      // Bounce on click
      icon.addEventListener('click', () => {
        this.bounceIcon(icon);
      });
    });
  }

  /**
   * 🔄 Page Transitions
   */
  setupPageTransitions() {
    // Smooth page transitions
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.transitionToPage(link.href);
      });
    });
  }

  /**
   * 🌊 Parallax Effects
   */
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        element.style.transform = `translateY(${rate * speed}px)`;
      });
    });
  }

  /**
   * ⏳ Loading Animations
   */
  setupLoadingAnimations() {
    // Skeleton loading
    this.setupSkeletonLoading();
    
    // Progress bars
    this.setupProgressBars();
    
    // Spinner animations
    this.setupSpinners();
  }

  /**
   * 💀 Skeleton Loading
   */
  setupSkeletonLoading() {
    const skeletonElements = document.querySelectorAll('[data-skeleton]');
    
    skeletonElements.forEach(element => {
      element.classList.add('skeleton');
      
      // Remove skeleton when content loads
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && element.children.length > 0) {
            element.classList.remove('skeleton');
            observer.disconnect();
          }
        });
      });
      
      observer.observe(element, { childList: true });
    });
  }

  /**
   * 🎯 Hover Effects
   */
  setupHoverEffects() {
    // Glow effects
    this.setupGlowEffects();
    
    // Shake effects
    this.setupShakeEffects();
    
    // Pulse effects
    this.setupPulseEffects();
  }

  /**
   * ✨ Glow Effects
   */
  setupGlowEffects() {
    document.querySelectorAll('[data-glow]').forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.addGlow(element);
      });

      element.addEventListener('mouseleave', () => {
        this.removeGlow(element);
      });
    });
  }

  /**
   * 📱 Click Animations
   */
  setupClickAnimations() {
    // Tap animations for mobile
    document.addEventListener('touchstart', (e) => {
      this.tapAnimation(e.target);
    });

    // Click animations for desktop
    document.addEventListener('click', (e) => {
      this.clickAnimation(e.target);
    });
  }

  /**
   * ⌨️ Typing Animations
   */
  setupTypingAnimations() {
    document.querySelectorAll('[data-typing]').forEach(element => {
      const text = element.textContent;
      const speed = parseInt(element.dataset.typingSpeed) || 100;
      
      element.textContent = '';
      this.typeText(element, text, speed);
    });
  }

  /**
   * ✨ Particle System
   */
  setupParticleSystem() {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;

    for (let i = 0; i < 50; i++) {
      this.createParticle(particleContainer);
    }
  }

  /**
   * 🔄 Morphing Animations
   */
  setupMorphingAnimations() {
    document.querySelectorAll('[data-morph]').forEach(element => {
      const shapes = element.dataset.morph.split(',');
      let currentShape = 0;

      setInterval(() => {
        this.morphShape(element, shapes[currentShape]);
        currentShape = (currentShape + 1) % shapes.length;
      }, 3000);
    });
  }

  /**
   * 🎨 Animation Methods
   */
  fadeIn(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  fadeInUp(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  fadeInLeft(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(-30px)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  fadeInRight(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(30px)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  scaleIn(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }

  slideInUp(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(100%)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  rotateIn(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'rotate(-180deg) scale(0.5)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'rotate(0deg) scale(1)';
    });
  }

  bounceIn(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.3)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }

  flipIn(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'rotateY(-90deg)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'rotateY(0deg)';
    });
  }

  zoomIn(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.5)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }

  slideInLeft(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(-100%)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  slideInRight(element, duration = 1000) {
    element.style.opacity = '0';
    element.style.transform = 'translateX(100%)';
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  staggerAnimation(element, duration = 1000) {
    const children = element.children;
    Array.from(children).forEach((child, index) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(20px)';
      child.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      
      setTimeout(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  /**
   * 🎭 Micro-Interaction Methods
   */
  createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
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
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  magneticEffect(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  }

  scaleElement(element, scale, duration) {
    element.style.transition = `transform ${duration}ms ease`;
    element.style.transform = `scale(${scale})`;
  }

  tiltCard(event, card) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  resetTilt(card) {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }

  liftCard(card) {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
  }

  dropCard(card) {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  }

  animateUnderline(link, direction) {
    const underline = link.querySelector('.underline') || this.createUnderline(link);
    
    if (direction === 'in') {
      underline.style.transform = 'scaleX(1)';
    } else {
      underline.style.transform = 'scaleX(0)';
    }
  }

  createUnderline(link) {
    const underline = document.createElement('span');
    underline.className = 'underline';
    underline.style.cssText = `
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--accent-primary);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    `;
    
    link.style.position = 'relative';
    link.appendChild(underline);
    return underline;
  }

  setupFloatingLabel(input) {
    const label = input.previousElementSibling;
    if (!label || !label.classList.contains('floating-label')) return;
    
    input.addEventListener('focus', () => {
      label.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        label.classList.remove('active');
      }
    });
  }

  focusGlow(input, isFocused) {
    if (isFocused) {
      input.style.boxShadow = '0 0 0 3px rgba(0, 212, 255, 0.3)';
    } else {
      input.style.boxShadow = 'none';
    }
  }

  spinIcon(icon) {
    icon.style.transition = 'transform 0.3s ease';
    icon.style.transform = 'rotate(360deg)';
    
    setTimeout(() => {
      icon.style.transform = 'rotate(0deg)';
    }, 300);
  }

  bounceIcon(icon) {
    icon.style.transition = 'transform 0.2s ease';
    icon.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
      icon.style.transform = 'scale(1)';
    }, 200);
  }

  transitionToPage(url) {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-primary);
      z-index: 9999;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.5s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Animate overlay
    requestAnimationFrame(() => {
      overlay.style.transform = 'scaleX(1)';
    });
    
    // Navigate after animation
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  }

  setupProgressBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
      const progress = bar.dataset.progress || 0;
      const duration = parseInt(bar.dataset.duration) || 2000;
      
      setTimeout(() => {
        bar.style.width = progress + '%';
      }, 100);
    });
  }

  setupSpinners() {
    document.querySelectorAll('.spinner').forEach(spinner => {
      spinner.style.animation = 'spin 1s linear infinite';
    });
  }

  setupShakeEffects() {
    document.querySelectorAll('[data-shake]').forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.animation = 'shake 0.5s ease-in-out';
      });
    });
  }

  setupPulseEffects() {
    document.querySelectorAll('[data-pulse]').forEach(element => {
      element.style.animation = 'pulse 2s infinite';
    });
  }

  addGlow(element) {
    element.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
  }

  removeGlow(element) {
    element.style.boxShadow = 'none';
  }

  tapAnimation(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 100);
  }

  clickAnimation(element) {
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 100);
  }

  typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, speed);
  }

  createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--accent-primary);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
    `;
    
    container.appendChild(particle);
  }

  morphShape(element, shape) {
    element.style.borderRadius = shape;
  }

  disableAnimations() {
    document.body.classList.add('reduced-motion');
  }
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
`;
document.head.appendChild(animationStyles);

// Initialize animation controller
document.addEventListener('DOMContentLoaded', () => {
  window.animationController = new AnimationController();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationController;
}
