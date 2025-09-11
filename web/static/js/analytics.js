/**
 * 📊 Analytics Integration Suite
 * Comprehensive analytics and performance monitoring
 */

class AnalyticsManager {
  constructor() {
    this.config = {
      googleAnalytics: {
        measurementId: 'GA_MEASUREMENT_ID', // Replace with your GA4 ID
        enabled: true
      },
      performance: {
        enabled: true,
        sampleRate: 1.0
      },
      errorTracking: {
        enabled: true,
        sampleRate: 1.0
      },
      userBehavior: {
        enabled: true,
        trackClicks: true,
        trackScrolls: true,
        trackForms: true
      }
    };
    
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.init();
  }

  init() {
    this.setupGoogleAnalytics();
    this.setupPerformanceMonitoring();
    this.setupErrorTracking();
    this.setupUserBehaviorTracking();
    this.setupCustomEvents();
    this.setupHeatmapTracking();
    this.setupConversionTracking();
    this.setupA11yTracking();
  }

  /**
   * 📈 Google Analytics 4 Setup
   */
  setupGoogleAnalytics() {
    if (!this.config.googleAnalytics.enabled) return;

    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalytics.measurementId}`;
    document.head.appendChild(script);

    // Initialize GA4
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', this.config.googleAnalytics.measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'session_id',
        'custom_parameter_2': 'user_type'
      }
    });

    // Set user properties
    gtag('config', this.config.googleAnalytics.measurementId, {
      user_id: this.userId,
      custom_map: {
        'session_id': this.sessionId
      }
    });

    this.gtag = gtag;
  }

  /**
   * ⚡ Performance Monitoring
   */
  setupPerformanceMonitoring() {
    if (!this.config.performance.enabled) return;

    // Core Web Vitals
    this.measureCoreWebVitals();
    
    // Resource timing
    this.measureResourceTiming();
    
    // Navigation timing
    this.measureNavigationTiming();
    
    // Custom performance metrics
    this.measureCustomMetrics();
  }

  /**
   * 📊 Core Web Vitals
   */
  measureCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.trackEvent('performance', 'lcp', {
        value: Math.round(lastEntry.startTime),
        rating: this.getLCPRating(lastEntry.startTime)
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.trackEvent('performance', 'fid', {
          value: Math.round(entry.processingStart - entry.startTime),
          rating: this.getFIDRating(entry.processingStart - entry.startTime)
        });
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.trackEvent('performance', 'cls', {
        value: Math.round(clsValue * 1000) / 1000,
        rating: this.getCLSRating(clsValue)
      });
    }).observe({ entryTypes: ['layout-shift'] });

    // First Contentful Paint (FCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.trackEvent('performance', 'fcp', {
          value: Math.round(entry.startTime),
          rating: this.getFCPRating(entry.startTime)
        });
      });
    }).observe({ entryTypes: ['paint'] });
  }

  /**
   * 📦 Resource Timing
   */
  measureResourceTiming() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.duration > 1000) { // Resources taking more than 1s
          this.trackEvent('performance', 'slow_resource', {
            resource_name: entry.name,
            duration: Math.round(entry.duration),
            resource_type: entry.initiatorType,
            size: entry.transferSize || 0
          });
        }
      });
    });
    observer.observe({ entryTypes: ['resource'] });
  }

  /**
   * 🧭 Navigation Timing
   */
  measureNavigationTiming() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      this.trackEvent('performance', 'page_load', {
        dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
        load_complete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
        total_time: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        dns_lookup: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
        tcp_connection: Math.round(navigation.connectEnd - navigation.connectStart),
        server_response: Math.round(navigation.responseEnd - navigation.requestStart)
      });
    });
  }

  /**
   * 🎯 Custom Performance Metrics
   */
  measureCustomMetrics() {
    // Time to Interactive (TTI) approximation
    let tti = 0;
    const longTasks = [];
    
    new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        longTasks.push(entry);
        tti = Math.max(tti, entry.startTime + entry.duration);
      });
    }).observe({ entryTypes: ['longtask'] });

    window.addEventListener('load', () => {
      setTimeout(() => {
        this.trackEvent('performance', 'tti', {
          value: Math.round(tti),
          long_tasks_count: longTasks.length
        });
      }, 1000);
    });

    // Memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        this.trackEvent('performance', 'memory_usage', {
          used_js_heap_size: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024), // MB
          total_js_heap_size: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024), // MB
          js_heap_size_limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) // MB
        });
      }, 30000); // Every 30 seconds
    }
  }

  /**
   * 🚨 Error Tracking
   */
  setupErrorTracking() {
    if (!this.config.errorTracking.enabled) return;

    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.trackEvent('error', 'javascript_error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        user_agent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent('error', 'unhandled_promise_rejection', {
        reason: event.reason?.toString(),
        stack: event.reason?.stack,
        user_agent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.trackEvent('error', 'resource_error', {
          resource_type: event.target.tagName,
          resource_src: event.target.src || event.target.href,
          error_type: 'loading_error'
        });
      }
    }, true);

    // Network errors
    this.setupNetworkErrorTracking();
  }

  /**
   * 🌐 Network Error Tracking
   */
  setupNetworkErrorTracking() {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok) {
          this.trackEvent('error', 'network_error', {
            url: args[0],
            status: response.status,
            status_text: response.statusText,
            method: args[1]?.method || 'GET'
          });
        }
        return response;
      } catch (error) {
        this.trackEvent('error', 'network_error', {
          url: args[0],
          error_message: error.message,
          method: args[1]?.method || 'GET'
        });
        throw error;
      }
    };
  }

  /**
   * 👤 User Behavior Tracking
   */
  setupUserBehaviorTracking() {
    if (!this.config.userBehavior.enabled) return;

    // Click tracking
    if (this.config.userBehavior.trackClicks) {
      document.addEventListener('click', (event) => {
        this.trackClick(event);
      });
    }

    // Scroll tracking
    if (this.config.userBehavior.trackScrolls) {
      this.setupScrollTracking();
    }

    // Form tracking
    if (this.config.userBehavior.trackForms) {
      this.setupFormTracking();
    }

    // Page visibility tracking
    this.setupVisibilityTracking();
  }

  /**
   * 🖱️ Click Tracking
   */
  trackClick(event) {
    const element = event.target;
    const elementData = this.getElementData(element);
    
    this.trackEvent('user_behavior', 'click', {
      element_type: elementData.type,
      element_text: elementData.text,
      element_id: elementData.id,
      element_class: elementData.class,
      page_url: window.location.href,
      click_x: event.clientX,
      click_y: event.clientY
    });
  }

  /**
   * 📜 Scroll Tracking
   */
  setupScrollTracking() {
    let scrollDepth = 0;
    const scrollMilestones = [25, 50, 75, 90, 100];
    const reachedMilestones = new Set();

    const trackScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const currentDepth = Math.round((scrollTop / docHeight) * 100);
      
      scrollMilestones.forEach(milestone => {
        if (currentDepth >= milestone && !reachedMilestones.has(milestone)) {
          reachedMilestones.add(milestone);
          this.trackEvent('user_behavior', 'scroll_depth', {
            depth_percentage: milestone,
            page_url: window.location.href
          });
        }
      });
    };

    window.addEventListener('scroll', this.throttle(trackScroll, 1000));
  }

  /**
   * 📝 Form Tracking
   */
  setupFormTracking() {
    document.querySelectorAll('form').forEach(form => {
      // Form start
      form.addEventListener('submit', (event) => {
        this.trackEvent('user_behavior', 'form_submit', {
          form_id: form.id || 'unnamed',
          form_action: form.action,
          form_method: form.method,
          field_count: form.querySelectorAll('input, textarea, select').length
        });
      });

      // Field interactions
      form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('focus', () => {
          this.trackEvent('user_behavior', 'form_field_focus', {
            field_name: field.name,
            field_type: field.type,
            form_id: form.id || 'unnamed'
          });
        });

        field.addEventListener('blur', () => {
          this.trackEvent('user_behavior', 'form_field_blur', {
            field_name: field.name,
            field_type: field.type,
            form_id: form.id || 'unnamed',
            field_value_length: field.value?.length || 0
          });
        });
      });
    });
  }

  /**
   * 👁️ Visibility Tracking
   */
  setupVisibilityTracking() {
    let pageStartTime = Date.now();
    let totalVisibleTime = 0;
    let isVisible = true;

    document.addEventListener('visibilitychange', () => {
      const now = Date.now();
      
      if (document.hidden) {
        if (isVisible) {
          totalVisibleTime += now - pageStartTime;
          this.trackEvent('user_behavior', 'page_hidden', {
            visible_time: totalVisibleTime,
            page_url: window.location.href
          });
        }
        isVisible = false;
      } else {
        pageStartTime = now;
        isVisible = true;
        this.trackEvent('user_behavior', 'page_visible', {
          page_url: window.location.href
        });
      }
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      const now = Date.now();
      if (isVisible) {
        totalVisibleTime += now - pageStartTime;
      }
      
      this.trackEvent('user_behavior', 'page_unload', {
        total_visible_time: totalVisibleTime,
        page_url: window.location.href
      });
    });
  }

  /**
   * 🎯 Custom Events
   */
  setupCustomEvents() {
    // Theme toggle
    document.addEventListener('themeChanged', (event) => {
      this.trackEvent('custom', 'theme_toggle', {
        new_theme: event.detail.theme,
        previous_theme: event.detail.previousTheme
      });
    });

    // Navigation
    document.addEventListener('navigation', (event) => {
      this.trackEvent('custom', 'navigation', {
        from_page: event.detail.from,
        to_page: event.detail.to,
        navigation_type: event.detail.type
      });
    });

    // Project interactions
    document.addEventListener('projectView', (event) => {
      this.trackEvent('custom', 'project_view', {
        project_name: event.detail.name,
        project_technology: event.detail.technology,
        view_type: event.detail.viewType
      });
    });

    // Skill interactions
    document.addEventListener('skillClick', (event) => {
      this.trackEvent('custom', 'skill_click', {
        skill_name: event.detail.skill,
        skill_level: event.detail.level
      });
    });
  }

  /**
   * 🔥 Heatmap Tracking
   */
  setupHeatmapTracking() {
    // Track mouse movements for heatmap
    let mouseMovements = [];
    let isTracking = false;

    document.addEventListener('mousemove', (event) => {
      if (!isTracking) return;
      
      mouseMovements.push({
        x: event.clientX,
        y: event.clientY,
        timestamp: Date.now()
      });

      // Send data every 10 seconds
      if (mouseMovements.length >= 100) {
        this.trackEvent('heatmap', 'mouse_movements', {
          movements: mouseMovements,
          page_url: window.location.href
        });
        mouseMovements = [];
      }
    });

    // Start tracking after user interaction
    document.addEventListener('click', () => {
      isTracking = true;
    });
  }

  /**
   * 💰 Conversion Tracking
   */
  setupConversionTracking() {
    // Contact form conversion
    document.addEventListener('formSubmit', (event) => {
      if (event.detail.formType === 'contact') {
        this.trackEvent('conversion', 'contact_form_submit', {
          form_id: event.detail.formId,
          conversion_value: 1
        });
      }
    });

    // Project view conversion
    document.addEventListener('projectView', (event) => {
      this.trackEvent('conversion', 'project_view', {
        project_name: event.detail.name,
        conversion_value: 0.1
      });
    });

    // Download conversion
    document.addEventListener('download', (event) => {
      this.trackEvent('conversion', 'file_download', {
        file_name: event.detail.fileName,
        file_type: event.detail.fileType,
        conversion_value: 0.5
      });
    });
  }

  /**
   * ♿ Accessibility Tracking
   */
  setupA11yTracking() {
    // Track keyboard navigation
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        this.trackEvent('accessibility', 'keyboard_navigation', {
          key: event.key,
          element_type: event.target.tagName,
          element_id: event.target.id
        });
      }
    });

    // Track screen reader usage
    if (window.speechSynthesis) {
      this.trackEvent('accessibility', 'screen_reader_detected', {
        has_speech_synthesis: true
      });
    }

    // Track high contrast mode
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      this.trackEvent('accessibility', 'high_contrast_mode', {
        prefers_high_contrast: true
      });
    }

    // Track reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.trackEvent('accessibility', 'reduced_motion', {
        prefers_reduced_motion: true
      });
    }
  }

  /**
   * 📊 Event Tracking
   */
  trackEvent(category, action, parameters = {}) {
    const event = {
      category,
      action,
      parameters: {
        ...parameters,
        timestamp: Date.now(),
        session_id: this.sessionId,
        user_id: this.userId,
        page_url: window.location.href,
        page_title: document.title,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
      }
    };

    this.events.push(event);

    // Send to Google Analytics
    if (this.gtag) {
      this.gtag('event', action, {
        event_category: category,
        ...parameters
      });
    }

    // Send to custom analytics endpoint
    this.sendToCustomAnalytics(event);

    // Log to console in development
    if (window.location.hostname === 'localhost') {
      console.log('Analytics Event:', event);
    }
  }

  /**
   * 📤 Send to Custom Analytics
   */
  async sendToCustomAnalytics(event) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.warn('Failed to send analytics event:', error);
    }
  }

  /**
   * 🔧 Utility Methods
   */
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getUserId() {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  getElementData(element) {
    return {
      type: element.tagName.toLowerCase(),
      text: element.textContent?.trim().substring(0, 100) || '',
      id: element.id || '',
      class: element.className || ''
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  getLCPRating(lcp) {
    if (lcp <= 2500) return 'good';
    if (lcp <= 4000) return 'needs_improvement';
    return 'poor';
  }

  getFIDRating(fid) {
    if (fid <= 100) return 'good';
    if (fid <= 300) return 'needs_improvement';
    return 'poor';
  }

  getCLSRating(cls) {
    if (cls <= 0.1) return 'good';
    if (cls <= 0.25) return 'needs_improvement';
    return 'poor';
  }

  getFCPRating(fcp) {
    if (fcp <= 1800) return 'good';
    if (fcp <= 3000) return 'needs_improvement';
    return 'poor';
  }

  /**
   * 📈 Get Analytics Data
   */
  getAnalyticsData() {
    return {
      events: this.events,
      sessionId: this.sessionId,
      userId: this.userId,
      config: this.config
    };
  }

  /**
   * 🔄 Reset Analytics
   */
  resetAnalytics() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    localStorage.removeItem('analytics_user_id');
    this.userId = this.getUserId();
  }
}

// Initialize analytics manager
document.addEventListener('DOMContentLoaded', () => {
  window.analyticsManager = new AnalyticsManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnalyticsManager;
}
