/**
 * 🚀 API Optimization Suite
 * Advanced API management with caching, error handling, and rate limiting
 */

class APIOptimizer {
  constructor() {
    this.cache = new Map();
    this.requestQueue = new Map();
    this.rateLimits = new Map();
    this.retryAttempts = new Map();
    this.circuitBreakers = new Map();
    
    this.config = {
      cache: {
        defaultTTL: 300000, // 5 minutes
        maxSize: 100,
        enabled: true
      },
      rateLimit: {
        enabled: true,
        defaultLimit: 100, // requests per window
        windowSize: 60000, // 1 minute
        burstLimit: 10 // burst requests
      },
      retry: {
        maxAttempts: 3,
        baseDelay: 1000,
        maxDelay: 10000,
        backoffMultiplier: 2
      },
      circuitBreaker: {
        failureThreshold: 5,
        recoveryTimeout: 30000,
        monitoringPeriod: 60000
      },
      timeout: {
        default: 10000,
        critical: 5000,
        background: 30000
      }
    };
    
    this.init();
  }

  init() {
    this.setupRequestInterceptors();
    this.setupResponseInterceptors();
    this.setupCacheManagement();
    this.setupRateLimiting();
    this.setupCircuitBreakers();
    this.setupBackgroundSync();
    this.setupOfflineSupport();
  }

  /**
   * 🌐 Request Interceptors
   */
  setupRequestInterceptors() {
    const originalFetch = window.fetch;
    
    window.fetch = async (url, options = {}) => {
      const requestId = this.generateRequestId();
      const requestConfig = this.getRequestConfig(url, options);
      
      // Check cache first
      if (requestConfig.cache && this.cache.has(url)) {
        const cached = this.cache.get(url);
        if (!this.isCacheExpired(cached)) {
          this.log('Cache hit', { url, requestId });
          return this.createResponse(cached.data, cached.headers);
        }
      }
      
      // Check rate limit
      if (this.isRateLimited(url)) {
        return this.handleRateLimit(url, requestId);
      }
      
      // Check circuit breaker
      if (this.isCircuitOpen(url)) {
        return this.handleCircuitOpen(url, requestId);
      }
      
      // Add request to queue
      this.addToQueue(url, requestId);
      
      try {
        const response = await this.executeRequest(url, options, requestConfig, requestId);
        this.handleSuccess(url, response, requestConfig);
        return response;
      } catch (error) {
        return this.handleError(url, error, options, requestConfig, requestId);
      }
    };
  }

  /**
   * 📥 Response Interceptors
   */
  setupResponseInterceptors() {
    // This would typically be handled in the request interceptor
    // but we can add additional response processing here
  }

  /**
   * 💾 Cache Management
   */
  setupCacheManagement() {
    // Clean expired cache entries every minute
    setInterval(() => {
      this.cleanExpiredCache();
    }, 60000);
    
    // Monitor cache size
    setInterval(() => {
      this.monitorCacheSize();
    }, 30000);
  }

  /**
   * ⏱️ Rate Limiting
   */
  setupRateLimiting() {
    if (!this.config.rateLimit.enabled) return;
    
    // Clean rate limit data every minute
    setInterval(() => {
      this.cleanRateLimitData();
    }, 60000);
  }

  /**
   * 🔄 Circuit Breakers
   */
  setupCircuitBreakers() {
    // Monitor circuit breakers every 30 seconds
    setInterval(() => {
      this.monitorCircuitBreakers();
    }, 30000);
  }

  /**
   * 🔄 Background Sync
   */
  setupBackgroundSync() {
    // Register background sync for failed requests
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        // This would be handled by the service worker
      });
    }
  }

  /**
   * 📱 Offline Support
   */
  setupOfflineSupport() {
    window.addEventListener('online', () => {
      this.handleOnline();
    });
    
    window.addEventListener('offline', () => {
      this.handleOffline();
    });
  }

  /**
   * 🚀 Execute Request
   */
  async executeRequest(url, options, config, requestId) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'X-Request-ID': requestId,
          'X-Client-Version': '1.0.0',
          ...options.headers
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * ✅ Handle Success
   */
  handleSuccess(url, response, config) {
    // Update rate limit
    this.updateRateLimit(url);
    
    // Cache response if enabled
    if (config.cache) {
      this.cacheResponse(url, response, config);
    }
    
    // Reset circuit breaker
    this.resetCircuitBreaker(url);
    
    // Remove from queue
    this.removeFromQueue(url);
    
    this.log('Request successful', { url, status: response.status });
  }

  /**
   * ❌ Handle Error
   */
  async handleError(url, error, options, config, requestId) {
    // Remove from queue
    this.removeFromQueue(url);
    
    // Update circuit breaker
    this.updateCircuitBreaker(url, false);
    
    // Check if we should retry
    if (this.shouldRetry(url, error, options)) {
      return this.retryRequest(url, options, config, requestId);
    }
    
    // Return cached response if available
    if (this.cache.has(url)) {
      const cached = this.cache.get(url);
      this.log('Returning cached response due to error', { url, error: error.message });
      return this.createResponse(cached.data, cached.headers);
    }
    
    // Return offline response
    if (!navigator.onLine) {
      return this.createOfflineResponse(url, error);
    }
    
    this.log('Request failed', { url, error: error.message });
    throw error;
  }

  /**
   * 🔄 Retry Request
   */
  async retryRequest(url, options, config, requestId) {
    const attempts = this.retryAttempts.get(url) || 0;
    const delay = this.calculateRetryDelay(attempts);
    
    this.retryAttempts.set(url, attempts + 1);
    
    this.log('Retrying request', { url, attempt: attempts + 1, delay });
    
    await this.sleep(delay);
    
    return this.executeRequest(url, options, config, requestId);
  }

  /**
   * 💾 Cache Response
   */
  async cacheResponse(url, response, config) {
    try {
      const data = await response.clone().json();
      const headers = Object.fromEntries(response.headers.entries());
      
      const cacheEntry = {
        data,
        headers,
        timestamp: Date.now(),
        ttl: config.cacheTTL || this.config.cache.defaultTTL
      };
      
      this.cache.set(url, cacheEntry);
      this.log('Response cached', { url, ttl: cacheEntry.ttl });
    } catch (error) {
      this.log('Failed to cache response', { url, error: error.message });
    }
  }

  /**
   * 📊 Get Cached Response
   */
  getCachedResponse(url) {
    const cached = this.cache.get(url);
    if (cached && !this.isCacheExpired(cached)) {
      return this.createResponse(cached.data, cached.headers);
    }
    return null;
  }

  /**
   * ⏰ Check Cache Expiry
   */
  isCacheExpired(cached) {
    return Date.now() - cached.timestamp > cached.ttl;
  }

  /**
   * 🧹 Clean Expired Cache
   */
  cleanExpiredCache() {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [url, cached] of this.cache.entries()) {
      if (now - cached.timestamp > cached.ttl) {
        this.cache.delete(url);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      this.log('Cleaned expired cache entries', { count: cleaned });
    }
  }

  /**
   * 📏 Monitor Cache Size
   */
  monitorCacheSize() {
    if (this.cache.size > this.config.cache.maxSize) {
      // Remove oldest entries
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      const toRemove = entries.slice(0, this.cache.size - this.config.cache.maxSize);
      toRemove.forEach(([url]) => this.cache.delete(url));
      
      this.log('Cache size limit reached, cleaned old entries', { 
        removed: toRemove.length,
        currentSize: this.cache.size
      });
    }
  }

  /**
   * ⏱️ Rate Limiting
   */
  isRateLimited(url) {
    if (!this.config.rateLimit.enabled) return false;
    
    const domain = new URL(url).hostname;
    const limit = this.rateLimits.get(domain);
    
    if (!limit) return false;
    
    const now = Date.now();
    const windowStart = now - this.config.rateLimit.windowSize;
    
    // Remove old requests
    limit.requests = limit.requests.filter(time => time > windowStart);
    
    return limit.requests.length >= this.config.rateLimit.defaultLimit;
  }

  /**
   * 📈 Update Rate Limit
   */
  updateRateLimit(url) {
    if (!this.config.rateLimit.enabled) return;
    
    const domain = new URL(url).hostname;
    const now = Date.now();
    
    if (!this.rateLimits.has(domain)) {
      this.rateLimits.set(domain, {
        requests: [],
        lastReset: now
      });
    }
    
    const limit = this.rateLimits.get(domain);
    limit.requests.push(now);
  }

  /**
   * 🧹 Clean Rate Limit Data
   */
  cleanRateLimitData() {
    const now = Date.now();
    const windowStart = now - this.config.rateLimit.windowSize;
    
    for (const [domain, limit] of this.rateLimits.entries()) {
      limit.requests = limit.requests.filter(time => time > windowStart);
      
      if (limit.requests.length === 0) {
        this.rateLimits.delete(domain);
      }
    }
  }

  /**
   * 🔄 Circuit Breaker
   */
  isCircuitOpen(url) {
    const domain = new URL(url).hostname;
    const breaker = this.circuitBreakers.get(domain);
    
    if (!breaker) return false;
    
    if (breaker.state === 'open') {
      if (Date.now() - breaker.lastFailureTime > this.config.circuitBreaker.recoveryTimeout) {
        breaker.state = 'half-open';
        return false;
      }
      return true;
    }
    
    return false;
  }

  /**
   * 🔄 Update Circuit Breaker
   */
  updateCircuitBreaker(url, success) {
    const domain = new URL(url).hostname;
    
    if (!this.circuitBreakers.has(domain)) {
      this.circuitBreakers.set(domain, {
        state: 'closed',
        failureCount: 0,
        lastFailureTime: 0
      });
    }
    
    const breaker = this.circuitBreakers.get(domain);
    
    if (success) {
      breaker.failureCount = 0;
      breaker.state = 'closed';
    } else {
      breaker.failureCount++;
      breaker.lastFailureTime = Date.now();
      
      if (breaker.failureCount >= this.config.circuitBreaker.failureThreshold) {
        breaker.state = 'open';
        this.log('Circuit breaker opened', { domain, failureCount: breaker.failureCount });
      }
    }
  }

  /**
   * 🔄 Reset Circuit Breaker
   */
  resetCircuitBreaker(url) {
    const domain = new URL(url).hostname;
    const breaker = this.circuitBreakers.get(domain);
    
    if (breaker) {
      breaker.failureCount = 0;
      breaker.state = 'closed';
    }
  }

  /**
   * 📊 Monitor Circuit Breakers
   */
  monitorCircuitBreakers() {
    for (const [domain, breaker] of this.circuitBreakers.entries()) {
      if (breaker.state === 'open') {
        const timeSinceFailure = Date.now() - breaker.lastFailureTime;
        if (timeSinceFailure > this.config.circuitBreaker.recoveryTimeout) {
          breaker.state = 'half-open';
          this.log('Circuit breaker moved to half-open', { domain });
        }
      }
    }
  }

  /**
   * 🔄 Should Retry
   */
  shouldRetry(url, error, options) {
    const attempts = this.retryAttempts.get(url) || 0;
    
    if (attempts >= this.config.retry.maxAttempts) {
      return false;
    }
    
    // Don't retry on certain errors
    if (error.name === 'AbortError' || error.message.includes('404')) {
      return false;
    }
    
    // Don't retry on certain HTTP status codes
    if (error.message.includes('400') || error.message.includes('401') || error.message.includes('403')) {
      return false;
    }
    
    return true;
  }

  /**
   * ⏰ Calculate Retry Delay
   */
  calculateRetryDelay(attempts) {
    const delay = this.config.retry.baseDelay * Math.pow(this.config.retry.backoffMultiplier, attempts);
    return Math.min(delay, this.config.retry.maxDelay);
  }

  /**
   * 📱 Handle Online
   */
  handleOnline() {
    this.log('Connection restored');
    
    // Process queued requests
    this.processQueuedRequests();
  }

  /**
   * 📱 Handle Offline
   */
  handleOffline() {
    this.log('Connection lost');
  }

  /**
   * 📋 Process Queued Requests
   */
  async processQueuedRequests() {
    const queuedRequests = Array.from(this.requestQueue.values());
    
    for (const request of queuedRequests) {
      try {
        await this.executeRequest(request.url, request.options, request.config, request.requestId);
      } catch (error) {
        this.log('Failed to process queued request', { url: request.url, error: error.message });
      }
    }
    
    this.requestQueue.clear();
  }

  /**
   * 📋 Add to Queue
   */
  addToQueue(url, requestId) {
    this.requestQueue.set(url, {
      url,
      requestId,
      timestamp: Date.now()
    });
  }

  /**
   * 📋 Remove from Queue
   */
  removeFromQueue(url) {
    this.requestQueue.delete(url);
  }

  /**
   * 🔧 Utility Methods
   */
  generateRequestId() {
    return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getRequestConfig(url, options) {
    const domain = new URL(url).hostname;
    
    return {
      cache: this.shouldCache(url),
      cacheTTL: this.getCacheTTL(url),
      timeout: this.getTimeout(url),
      retry: this.shouldRetry(url, null, options),
      priority: this.getPriority(url)
    };
  }

  shouldCache(url) {
    // Cache GET requests by default
    return url.includes('api.github.com') || url.includes('api.allorigins.win');
  }

  getCacheTTL(url) {
    if (url.includes('github.com')) return 300000; // 5 minutes
    if (url.includes('linkedin.com')) return 600000; // 10 minutes
    return this.config.cache.defaultTTL;
  }

  getTimeout(url) {
    if (url.includes('critical')) return this.config.timeout.critical;
    if (url.includes('background')) return this.config.timeout.background;
    return this.config.timeout.default;
  }

  getPriority(url) {
    if (url.includes('critical')) return 'high';
    if (url.includes('background')) return 'low';
    return 'normal';
  }

  createResponse(data, headers) {
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'OK',
      headers: new Headers(headers)
    });
  }

  createOfflineResponse(url, error) {
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'This request requires an internet connection',
      url,
      timestamp: Date.now()
    }), {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  log(message, data = {}) {
    if (window.location.hostname === 'localhost') {
      console.log(`[API Optimizer] ${message}`, data);
    }
  }

  /**
   * 📊 Get Statistics
   */
  getStatistics() {
    return {
      cacheSize: this.cache.size,
      queuedRequests: this.requestQueue.size,
      rateLimits: Object.fromEntries(this.rateLimits),
      circuitBreakers: Object.fromEntries(this.circuitBreakers),
      retryAttempts: Object.fromEntries(this.retryAttempts)
    };
  }

  /**
   * 🧹 Clear Cache
   */
  clearCache() {
    this.cache.clear();
    this.log('Cache cleared');
  }

  /**
   * 🔄 Reset All
   */
  reset() {
    this.cache.clear();
    this.requestQueue.clear();
    this.rateLimits.clear();
    this.retryAttempts.clear();
    this.circuitBreakers.clear();
    this.log('API Optimizer reset');
  }
}

// Initialize API optimizer
document.addEventListener('DOMContentLoaded', () => {
  window.apiOptimizer = new APIOptimizer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APIOptimizer;
}
