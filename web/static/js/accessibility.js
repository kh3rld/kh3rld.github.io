/**
 * ♿ Accessibility Enhancement Suite
 * Comprehensive accessibility improvements for the portfolio
 */

class AccessibilityEnhancer {
  constructor() {
    this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.currentFocusIndex = 0;
    this.focusableElementsList = [];
    this.announcements = [];
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupARIALabels();
    this.setupScreenReaderSupport();
    this.setupFocusManagement();
    this.setupColorContrast();
    this.setupMotionPreferences();
    this.setupSkipLinks();
    this.setupLiveRegions();
    this.setupFormAccessibility();
    this.setupImageAccessibility();
    this.setupVideoAccessibility();
    this.setupAudioAccessibility();
  }

  /**
   * ⌨️ Advanced Keyboard Navigation
   */
  setupKeyboardNavigation() {
    // Tab navigation enhancement
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
      
      // Arrow key navigation for custom components
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        this.handleArrowNavigation(e);
      }
      
      // Escape key handling
      if (e.key === 'Escape') {
        this.handleEscapeKey(e);
      }
      
      // Enter and Space key handling
      if (e.key === 'Enter' || e.key === ' ') {
        this.handleActivation(e);
      }
    });

    // Focus trap for modals and dropdowns
    this.setupFocusTrap();
    
    // Skip to content functionality
    this.setupSkipToContent();
  }

  /**
   * 🎯 Tab Navigation Enhancement
   */
  handleTabNavigation(e) {
    this.updateFocusableElements();
    
    if (e.shiftKey) {
      // Shift + Tab (backward)
      this.currentFocusIndex = this.currentFocusIndex > 0 
        ? this.currentFocusIndex - 1 
        : this.focusableElementsList.length - 1;
    } else {
      // Tab (forward)
      this.currentFocusIndex = this.currentFocusIndex < this.focusableElementsList.length - 1 
        ? this.currentFocusIndex + 1 
        : 0;
    }
    
    this.focusableElementsList[this.currentFocusIndex]?.focus();
    this.announceFocusChange(this.focusableElementsList[this.currentFocusIndex]);
  }

  /**
   * 🎯 Arrow Key Navigation
   */
  handleArrowNavigation(e) {
    const activeElement = document.activeElement;
    const container = activeElement.closest('[role="menu"], [role="tablist"], [role="grid"]');
    
    if (!container) return;
    
    e.preventDefault();
    
    const items = Array.from(container.querySelectorAll('[role="menuitem"], [role="tab"], [role="gridcell"]'));
    const currentIndex = items.indexOf(activeElement);
    
    let nextIndex = currentIndex;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
    }
    
    if (nextIndex !== currentIndex) {
      items[nextIndex]?.focus();
      this.announceFocusChange(items[nextIndex]);
    }
  }

  /**
   * 🚪 Escape Key Handling
   */
  handleEscapeKey(e) {
    const activeElement = document.activeElement;
    
    // Close modals
    const modal = activeElement.closest('.modal, [role="dialog"]');
    if (modal) {
      this.closeModal(modal);
      return;
    }
    
    // Close dropdowns
    const dropdown = activeElement.closest('.dropdown, [role="menu"]');
    if (dropdown) {
      this.closeDropdown(dropdown);
      return;
    }
    
    // Close mobile menu
    const mobileMenu = document.querySelector('.nav-menu.active');
    if (mobileMenu) {
      this.closeMobileMenu();
    }
  }

  /**
   * 🎯 Activation Handling
   */
  handleActivation(e) {
    const activeElement = document.activeElement;
    
    // Prevent default for custom interactive elements
    if (activeElement.hasAttribute('data-custom-action')) {
      e.preventDefault();
      this.activateCustomElement(activeElement);
    }
  }

  /**
   * 🏷️ ARIA Labels Enhancement
   */
  setupARIALabels() {
    // Add ARIA labels to interactive elements
    this.addARIALabels();
    
    // Enhance form labels
    this.enhanceFormLabels();
    
    // Add role attributes
    this.addRoleAttributes();
    
    // Enhance button descriptions
    this.enhanceButtonDescriptions();
  }

  /**
   * 🏷️ Add ARIA Labels
   */
  addARIALabels() {
    // Navigation
    const nav = document.querySelector('nav');
    if (nav && !nav.getAttribute('aria-label')) {
      nav.setAttribute('aria-label', 'Main navigation');
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', 'Toggle dark and light mode');
      themeToggle.setAttribute('aria-pressed', 'false');
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.nav-toggle');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.setAttribute('aria-controls', 'navMenu');
    }

    // Social links
    document.querySelectorAll('.social-link').forEach(link => {
      const platform = link.querySelector('i')?.className.match(/fa-(\w+)/)?.[1];
      if (platform) {
        link.setAttribute('aria-label', `Visit my ${platform} profile`);
      }
    });

    // Project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
      if (!card.getAttribute('aria-label')) {
        const title = card.querySelector('h3')?.textContent || 'Project';
        card.setAttribute('aria-label', `${title} project card`);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
      }
    });

    // Skill orbs
    document.querySelectorAll('.skill-orb').forEach(orb => {
      const skill = orb.dataset.skill;
      if (skill) {
        orb.setAttribute('aria-label', `Learn about ${skill} skills`);
        orb.setAttribute('role', 'button');
        orb.setAttribute('tabindex', '0');
      }
    });
  }

  /**
   * 📝 Form Accessibility Enhancement
   */
  setupFormAccessibility() {
    // Contact form enhancement
    const contactForm = document.querySelector('form');
    if (contactForm) {
      this.enhanceContactForm(contactForm);
    }

    // Search form enhancement
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
      this.enhanceSearchForm(searchForm);
    }
  }

  /**
   * 📝 Contact Form Enhancement
   */
  enhanceContactForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Add required attribute indicators
      if (input.hasAttribute('required')) {
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (label && !label.textContent.includes('*')) {
          label.innerHTML += ' <span class="required" aria-label="required">*</span>';
        }
      }

      // Add error handling
      input.addEventListener('invalid', (e) => {
        this.handleFormError(e.target);
      });

      // Add success feedback
      input.addEventListener('blur', (e) => {
        if (e.target.checkValidity()) {
          this.handleFormSuccess(e.target);
        }
      });
    });

    // Form submission feedback
    form.addEventListener('submit', (e) => {
      this.announceToScreenReader('Form submitted successfully');
    });
  }

  /**
   * 🖼️ Image Accessibility
   */
  setupImageAccessibility() {
    // Add alt text to images without it
    document.querySelectorAll('img:not([alt])').forEach(img => {
      const context = this.getImageContext(img);
      img.setAttribute('alt', context);
    });

    // Decorative images
    document.querySelectorAll('img[data-decorative="true"]').forEach(img => {
      img.setAttribute('alt', '');
      img.setAttribute('aria-hidden', 'true');
    });

    // Complex images with long descriptions
    document.querySelectorAll('img[data-complex="true"]').forEach(img => {
      const longDesc = img.dataset.longDesc;
      if (longDesc) {
        img.setAttribute('aria-describedby', longDesc);
      }
    });
  }

  /**
   * 🎥 Video Accessibility
   */
  setupVideoAccessibility() {
    document.querySelectorAll('video').forEach(video => {
      // Add captions if available
      if (video.querySelector('track[kind="captions"]')) {
        video.setAttribute('aria-label', 'Video with captions available');
      }

      // Add controls description
      video.setAttribute('aria-label', 'Video player with play, pause, and volume controls');
    });
  }

  /**
   * 🔊 Audio Accessibility
   */
  setupAudioAccessibility() {
    document.querySelectorAll('audio').forEach(audio => {
      audio.setAttribute('aria-label', 'Audio player with play, pause, and volume controls');
    });
  }

  /**
   * 🎨 Color Contrast Enhancement
   */
  setupColorContrast() {
    // Check color contrast ratios
    this.checkColorContrast();
    
    // Add high contrast mode toggle
    this.addHighContrastToggle();
    
    // Enhance focus indicators
    this.enhanceFocusIndicators();
  }

  /**
   * 🎨 High Contrast Mode
   */
  addHighContrastToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🔍';
    toggle.setAttribute('aria-label', 'Toggle high contrast mode');
    toggle.setAttribute('title', 'High Contrast Mode');
    toggle.className = 'high-contrast-toggle';
    toggle.style.cssText = `
      position: fixed;
      top: 20px;
      right: 80px;
      z-index: 1000;
      background: var(--bg-secondary);
      border: 2px solid var(--accent-primary);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      font-size: 16px;
    `;

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHighContrast = document.body.classList.contains('high-contrast');
      toggle.setAttribute('aria-pressed', isHighContrast);
      this.announceToScreenReader(
        isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled'
      );
    });

    document.body.appendChild(toggle);
  }

  /**
   * 🎭 Motion Preferences
   */
  setupMotionPreferences() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }

    // Listen for changes in motion preference
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
        this.disableAnimations();
      } else {
        document.body.classList.remove('reduced-motion');
        this.enableAnimations();
      }
    });
  }

  /**
   * 🔗 Skip Links
   */
  setupSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#navigation" class="skip-link">Skip to navigation</a>
      <a href="#footer" class="skip-link">Skip to footer</a>
    `;
    skipLinks.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      z-index: 1000;
    `;

    document.body.insertBefore(skipLinks, document.body.firstChild);

    // Style skip links
    const style = document.createElement('style');
    style.textContent = `
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-primary);
        color: var(--bg-primary);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 600;
        transition: top 0.3s;
      }
      .skip-link:focus {
        top: 6px;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * 📢 Live Regions for Screen Readers
   */
  setupLiveRegions() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);

    // Create live region for alerts
    const alertRegion = document.createElement('div');
    alertRegion.setAttribute('aria-live', 'assertive');
    alertRegion.setAttribute('aria-atomic', 'true');
    alertRegion.className = 'sr-only';
    alertRegion.id = 'alert-region';
    document.body.appendChild(alertRegion);
  }

  /**
   * 📢 Announce to Screen Reader
   */
  announceToScreenReader(message, priority = 'polite') {
    const region = priority === 'assertive' ? 'alert-region' : 'live-region';
    const liveRegion = document.getElementById(region);
    if (liveRegion) {
      liveRegion.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  /**
   * 🎯 Focus Management
   */
  setupFocusManagement() {
    // Focus trap for modals
    this.setupFocusTrap();
    
    // Focus restoration
    this.setupFocusRestoration();
    
    // Focus indicators
    this.enhanceFocusIndicators();
  }

  /**
   * 🎯 Focus Trap
   */
  setupFocusTrap() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('.modal[aria-hidden="false"]');
        if (modal) {
          this.trapFocus(modal, e);
        }
      }
    });
  }

  /**
   * 🎯 Trap Focus in Modal
   */
  trapFocus(modal, e) {
    const focusableElements = modal.querySelectorAll(this.focusableElements);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * 🎯 Focus Restoration
   */
  setupFocusRestoration() {
    let lastFocusedElement = null;

    document.addEventListener('focusin', (e) => {
      lastFocusedElement = e.target;
    });

    // Restore focus when closing modals
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-close') || 
          e.target.classList.contains('modal-backdrop')) {
        if (lastFocusedElement) {
          lastFocusedElement.focus();
        }
      }
    });
  }

  /**
   * 🎯 Enhanced Focus Indicators
   */
  enhanceFocusIndicators() {
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 3px solid var(--accent-primary);
        outline-offset: 2px;
        border-radius: 4px;
      }
      
      .high-contrast *:focus {
        outline: 4px solid #ffffff;
        outline-offset: 3px;
        background: #000000;
        color: #ffffff;
      }
      
      .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * 🔧 Utility Methods
   */
  updateFocusableElements() {
    this.focusableElementsList = Array.from(
      document.querySelectorAll(this.focusableElements)
    ).filter(el => !el.disabled && !el.hidden);
  }

  announceFocusChange(element) {
    if (element) {
      const label = element.getAttribute('aria-label') || 
                   element.textContent?.trim() || 
                   element.getAttribute('title') || 
                   'Focusable element';
      this.announceToScreenReader(`Focused on ${label}`);
    }
  }

  getImageContext(img) {
    // Generate contextual alt text based on surrounding content
    const parent = img.parentElement;
    const heading = parent.querySelector('h1, h2, h3, h4, h5, h6');
    const caption = parent.querySelector('figcaption');
    
    if (caption) return caption.textContent;
    if (heading) return `Image related to ${heading.textContent}`;
    if (img.classList.contains('logo')) return 'Logo';
    if (img.classList.contains('icon')) return 'Icon';
    
    return 'Image';
  }

  closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    this.announceToScreenReader('Modal closed');
  }

  closeDropdown(dropdown) {
    dropdown.setAttribute('aria-expanded', 'false');
    this.announceToScreenReader('Dropdown closed');
  }

  closeMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.nav-toggle');
    
    if (menu && toggle) {
      menu.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      this.announceToScreenReader('Mobile menu closed');
    }
  }

  activateCustomElement(element) {
    const action = element.dataset.customAction;
    if (action) {
      this.announceToScreenReader(`Activated ${action}`);
      // Handle custom actions here
    }
  }

  handleFormError(input) {
    const errorMsg = input.validationMessage;
    this.announceToScreenReader(`Error: ${errorMsg}`, 'assertive');
  }

  handleFormSuccess(input) {
    this.announceToScreenReader(`${input.name || 'Field'} is valid`);
  }

  checkColorContrast() {
    // This would typically use a color contrast checking library
    console.log('Color contrast check would be implemented here');
  }

  disableAnimations() {
    document.body.style.setProperty('--animation-duration', '0.01ms');
    document.body.style.setProperty('--transition-duration', '0.01ms');
  }

  enableAnimations() {
    document.body.style.removeProperty('--animation-duration');
    document.body.style.removeProperty('--transition-duration');
  }
}

// Initialize accessibility enhancer
document.addEventListener('DOMContentLoaded', () => {
  window.accessibilityEnhancer = new AccessibilityEnhancer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccessibilityEnhancer;
}
