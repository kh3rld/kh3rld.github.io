/**
 * 🚀 Performance Optimization Suite
 * Advanced performance enhancements for the portfolio
 */

class PerformanceOptimizer {
  constructor() {
    this.observers = new Map();
    this.cache = new Map();
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupCodeSplitting();
    this.setupResourceHints();
    this.setupPerformanceMonitoring();
    this.setupCriticalCSS();
  }

  /**
   * 🖼️ Advanced Lazy Loading with Intersection Observer
   */
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });

      // Observe components for lazy loading
      const componentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadComponent(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('[data-lazy-component]').forEach(component => {
        componentObserver.observe(component);
      });
    }
  }

  /**
   * 🖼️ Smart Image Loading with WebP Support
   */
  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    // Check WebP support
    const supportsWebP = this.checkWebPSupport();
    const optimizedSrc = this.optimizeImageSrc(src, supportsWebP);

    // Create a new image to preload
    const newImg = new Image();
    newImg.onload = () => {
      img.src = optimizedSrc;
      img.classList.add('loaded');
      img.removeAttribute('data-src');
    };
    newImg.onerror = () => {
      // Fallback to original
      img.src = src;
      img.classList.add('loaded');
      img.removeAttribute('data-src');
    };
    newImg.src = optimizedSrc;
  }

  /**
   * 🎨 Image Optimization with Smart Resizing
   */
  optimizeImageSrc(src, supportsWebP = false) {
    // If it's already optimized, return as is
    if (src.includes('w_') || src.includes('q_')) return src;

    // Get viewport dimensions
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Determine optimal image size
    const optimalWidth = Math.min(viewport.width * 2, 1920); // 2x for retina
    const quality = viewport.width > 768 ? 85 : 75;

    // Build optimized URL (assuming you're using a service like Cloudinary or similar)
    const baseUrl = src.split('?')[0];
    const params = new URLSearchParams();
    params.set('w', optimalWidth);
    params.set('q', quality);
    params.set('f', supportsWebP ? 'webp' : 'auto');
    params.set('c_fill', 'true');

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * 🔍 WebP Support Detection
   */
  checkWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * 🧩 Component Lazy Loading
   */
  loadComponent(component) {
    const componentType = component.dataset.lazyComponent;
    
    switch (componentType) {
      case 'github-projects':
        this.loadGitHubProjects(component);
        break;
      case 'linkedin-certifications':
        this.loadLinkedInCertifications(component);
        break;
      case 'blog-posts':
        this.loadBlogPosts(component);
        break;
      default:
        console.warn(`Unknown lazy component: ${componentType}`);
    }
  }

  /**
   * 📦 Code Splitting for Dynamic Imports
   */
  setupCodeSplitting() {
    // Lazy load heavy libraries only when needed
    this.lazyLoadLibrary('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js');
    this.lazyLoadLibrary('chartjs', 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js');
  }

  lazyLoadLibrary(name, url) {
    if (window[name]) return Promise.resolve(window[name]);
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve(window[name]);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * 🔗 Resource Hints for Better Performance
   */
  setupResourceHints() {
    const hints = [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'preconnect', href: 'https://api.github.com' },
      { rel: 'preconnect', href: 'https://api.allorigins.win' },
      { rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com' },
      { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' }
    ];

    hints.forEach(hint => {
      const link = document.createElement('link');
      Object.assign(link, hint);
      document.head.appendChild(link);
    });
  }

  /**
   * 📊 Performance Monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    this.measureCoreWebVitals();
    
    // Monitor resource loading
    this.monitorResourceLoading();
    
    // Monitor user interactions
    this.monitorUserInteractions();
  }

  measureCoreWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  monitorResourceLoading() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.duration > 1000) { // Resources taking more than 1s
          console.warn('Slow resource:', entry.name, entry.duration);
        }
      });
    });
    observer.observe({ entryTypes: ['resource'] });
  }

  monitorUserInteractions() {
    let interactionCount = 0;
    const interactions = ['click', 'scroll', 'keydown', 'touchstart'];
    
    interactions.forEach(event => {
      document.addEventListener(event, () => {
        interactionCount++;
        if (interactionCount === 1) {
          console.log('First user interaction detected');
        }
      }, { once: true });
    });
  }

  /**
   * 🎨 Critical CSS Inlining
   */
  setupCriticalCSS() {
    // Inline critical CSS for above-the-fold content
    const criticalCSS = `
      .hero { opacity: 1; }
      .nav-container { transform: translateY(0); }
      .hero-title { opacity: 1; transform: translateY(0); }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  }

  /**
   * 💾 Smart Caching
   */
  cache(key, value, ttl = 300000) { // 5 minutes default TTL
    const item = {
      value,
      timestamp: Date.now(),
      ttl
    };
    this.cache.set(key, item);
  }

  getCached(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  /**
   * 🚀 Preload Critical Resources
   */
  preloadCriticalResources() {
    const criticalResources = [
      { href: './web/static/css/theme.css', as: 'style' },
      { href: './web/static/js/theme.js', as: 'script' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&display=swap', as: 'style' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  }
}

// Initialize performance optimizer
document.addEventListener('DOMContentLoaded', () => {
  window.performanceOptimizer = new PerformanceOptimizer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceOptimizer;
}
