// Theme System - Shared across all pages

class ThemeManager {
  constructor() {
    this.html = document.documentElement;
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
    
    // Add event listener if toggle exists
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    // Listen for system theme changes
    this.listenForSystemTheme();
  }

  setTheme(theme) {
    this.html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle visual state
    this.updateThemeToggle(theme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
  }

  toggleTheme() {
    const currentTheme = this.html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    
    // Add smooth transition
    this.html.style.transition = 'var(--theme-transition)';
    setTimeout(() => {
      this.html.style.transition = '';
    }, 300);
  }

  updateThemeToggle(theme) {
    if (!this.themeToggle) return;
    
    if (theme === 'light') {
      this.themeToggle.setAttribute('aria-pressed', 'true');
      this.themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      this.themeToggle.setAttribute('aria-pressed', 'false');
      this.themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
  }

  listenForSystemTheme() {
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Only apply system theme if no user preference is saved
      if (!localStorage.getItem('theme')) {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        this.setTheme(systemTheme);
      }
      
      // Listen for changes
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          const systemTheme = e.matches ? 'dark' : 'light';
          this.setTheme(systemTheme);
        }
      });
    }
  }

  getCurrentTheme() {
    return this.html.getAttribute('data-theme') || 'dark';
  }

  isDarkMode() {
    return this.getCurrentTheme() === 'dark';
  }

  isLightMode() {
    return this.getCurrentTheme() === 'light';
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
