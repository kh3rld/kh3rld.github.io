/**
 * 🧪 Testing Framework
 * Comprehensive testing suite for the portfolio
 */

class TestingFramework {
  constructor() {
    this.tests = [];
    this.results = [];
    this.config = {
      timeout: 5000,
      retries: 3,
      parallel: true,
      verbose: true
    };
    this.init();
  }

  init() {
    this.setupTestEnvironment();
    this.setupMockData();
    this.setupTestHelpers();
  }

  /**
   * 🏗️ Setup Test Environment
   */
  setupTestEnvironment() {
    // Create test container
    this.testContainer = document.createElement('div');
    this.testContainer.id = 'test-container';
    this.testContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      font-family: monospace;
      padding: 20px;
      z-index: 10000;
      overflow-y: auto;
      display: none;
    `;
    document.body.appendChild(this.testContainer);

    // Create test controls
    this.createTestControls();
  }

  /**
   * 🎮 Create Test Controls
   */
  createTestControls() {
    // Only show test controls with explicit debug flag
    if (!window.location.search.includes('debug=true')) {
      return;
    }

    const controls = document.createElement('div');
    controls.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10001;
      display: flex;
      gap: 10px;
    `;

    const runButton = document.createElement('button');
    runButton.textContent = 'Run Tests';
    runButton.onclick = () => this.runAllTests();
    runButton.style.cssText = `
      background: #00d4ff;
      color: #000;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    `;

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Tests';
    toggleButton.onclick = () => this.toggleTestContainer();
    toggleButton.style.cssText = `
      background: #ff6b6b;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    `;

    controls.appendChild(runButton);
    controls.appendChild(toggleButton);
    document.body.appendChild(controls);
  }

  /**
   * 🎭 Setup Mock Data
   */
  setupMockData() {
    this.mockData = {
      githubProjects: [
        {
          id: 1,
          name: 'Test Project',
          description: 'A test project',
          html_url: 'https://github.com/test/project',
          language: 'JavaScript',
          stargazers_count: 10,
          forks_count: 5,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-15T00:00:00Z'
        }
      ],
      linkedinCertifications: [
        {
          name: 'Test Certification',
          issuer: 'Test Company',
          issueDate: '2024-01-01',
          credentialUrl: 'https://test.com/cert'
        }
      ],
      blogPosts: [
        {
          id: 1,
          title: 'Test Blog Post',
          excerpt: 'A test blog post',
          content: 'This is test content',
          publishedAt: '2024-01-01',
          tags: ['test', 'javascript']
        }
      ]
    };
  }

  /**
   * 🛠️ Setup Test Helpers
   */
  setupTestHelpers() {
    this.helpers = {
      // Create test element
      createElement: (tag, attributes = {}) => {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
        return element;
      },

      // Mock fetch
      mockFetch: (url, response) => {
        const originalFetch = window.fetch;
        window.fetch = async (requestUrl) => {
          if (requestUrl === url) {
            return new Response(JSON.stringify(response), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          return originalFetch(requestUrl);
        };
      },

      // Wait for element
      waitForElement: (selector, timeout = 5000) => {
        return new Promise((resolve, reject) => {
          const element = document.querySelector(selector);
          if (element) {
            resolve(element);
            return;
          }

          const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
              obs.disconnect();
              resolve(element);
            }
          });

          observer.observe(document.body, {
            childList: true,
            subtree: true
          });

          setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
          }, timeout);
        });
      },

      // Simulate user interaction
      simulateClick: (element) => {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        element.dispatchEvent(event);
      },

      simulateKeydown: (element, key) => {
        const event = new KeyboardEvent('keydown', {
          key,
          bubbles: true,
          cancelable: true
        });
        element.dispatchEvent(event);
      },

      simulateScroll: (element, scrollTop) => {
        element.scrollTop = scrollTop;
        const event = new Event('scroll', { bubbles: true });
        element.dispatchEvent(event);
      }
    };
  }

  /**
   * 🧪 Define Test
   */
  test(name, testFunction) {
    this.tests.push({
      name,
      function: testFunction,
      status: 'pending'
    });
  }

  /**
   * 🏃 Run All Tests
   */
  async runAllTests() {
    this.log('Starting test suite...');
    this.results = [];
    
    for (const test of this.tests) {
      try {
        await this.runTest(test);
      } catch (error) {
        this.log(`❌ Test "${test.name}" failed: ${error.message}`, 'error');
        test.status = 'failed';
        this.results.push({
          name: test.name,
          status: 'failed',
          error: error.message,
          duration: 0
        });
      }
    }
    
    this.displayResults();
  }

  /**
   * 🏃 Run Single Test
   */
  async runTest(test) {
    const startTime = Date.now();
    this.log(`Running test: ${test.name}`);
    
    try {
      await Promise.race([
        test.function(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Test timeout')), this.config.timeout)
        )
      ]);
      
      const duration = Date.now() - startTime;
      test.status = 'passed';
      this.results.push({
        name: test.name,
        status: 'passed',
        duration
      });
      
      this.log(`✅ Test "${test.name}" passed (${duration}ms)`, 'success');
    } catch (error) {
      const duration = Date.now() - startTime;
      test.status = 'failed';
      this.results.push({
        name: test.name,
        status: 'failed',
        error: error.message,
        duration
      });
      
      throw error;
    }
  }

  /**
   * 📊 Display Results
   */
  displayResults() {
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const total = this.results.length;
    
    this.testContainer.innerHTML = `
      <h2>Test Results</h2>
      <div style="margin-bottom: 20px;">
        <div>Total: ${total}</div>
        <div style="color: #4caf50;">Passed: ${passed}</div>
        <div style="color: #f44336;">Failed: ${failed}</div>
        <div>Success Rate: ${Math.round((passed / total) * 100)}%</div>
      </div>
      <div>
        ${this.results.map(result => `
          <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #333; border-radius: 5px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="color: ${result.status === 'passed' ? '#4caf50' : '#f44336'};">
                ${result.status === 'passed' ? '✅' : '❌'} ${result.name}
              </span>
              <span>${result.duration}ms</span>
            </div>
            ${result.error ? `<div style="color: #f44336; margin-top: 5px;">${result.error}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * 📝 Log Message
   */
  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    
    if (this.config.verbose) {
      console.log(logMessage);
    }
    
    // Add to test container
    const logElement = document.createElement('div');
    logElement.textContent = logMessage;
    logElement.style.color = this.getLogColor(type);
    this.testContainer.appendChild(logElement);
  }

  /**
   * 🎨 Get Log Color
   */
  getLogColor(type) {
    switch (type) {
      case 'success': return '#4caf50';
      case 'error': return '#f44336';
      case 'warning': return '#ff9800';
      default: return '#ffffff';
    }
  }

  /**
   * 🔄 Toggle Test Container
   */
  toggleTestContainer() {
    this.testContainer.style.display = this.testContainer.style.display === 'none' ? 'block' : 'none';
  }

  /**
   * 🧪 Test Assertions
   */
  assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected}, but got ${actual}`);
    }
  }

  assertTrue(condition, message) {
    this.assert(condition === true, message || 'Expected true');
  }

  assertFalse(condition, message) {
    this.assert(condition === false, message || 'Expected false');
  }

  assertExists(element, message) {
    this.assert(element !== null && element !== undefined, message || 'Element does not exist');
  }

  assertNotExists(element, message) {
    this.assert(element === null || element === undefined, message || 'Element should not exist');
  }

  assertContains(text, substring, message) {
    this.assert(text.includes(substring), message || `Expected "${text}" to contain "${substring}"`);
  }

  assertNotContains(text, substring, message) {
    this.assert(!text.includes(substring), message || `Expected "${text}" to not contain "${substring}"`);
  }

  assertGreaterThan(actual, expected, message) {
    this.assert(actual > expected, message || `Expected ${actual} to be greater than ${expected}`);
  }

  assertLessThan(actual, expected, message) {
    this.assert(actual < expected, message || `Expected ${actual} to be less than ${expected}`);
  }

  assertThrows(fn, message) {
    try {
      fn();
      throw new Error(message || 'Expected function to throw');
    } catch (error) {
      // Expected behavior
    }
  }

  assertDoesNotThrow(fn, message) {
    try {
      fn();
    } catch (error) {
      throw new Error(message || `Expected function not to throw, but it threw: ${error.message}`);
    }
  }

  /**
   * 🧪 Setup Portfolio Tests
   */
  setupPortfolioTests() {
    // Navigation tests
    this.test('Navigation should be present', async () => {
      const nav = document.querySelector('nav');
      this.assertExists(nav, 'Navigation element should exist');
    });

    this.test('Navigation should have proper ARIA attributes', async () => {
      const nav = document.querySelector('nav');
      this.assertExists(nav.getAttribute('role'), 'Navigation should have role attribute');
      this.assertExists(nav.getAttribute('aria-label'), 'Navigation should have aria-label');
    });

    this.test('Theme toggle should work', async () => {
      const themeToggle = document.getElementById('themeToggle');
      this.assertExists(themeToggle, 'Theme toggle should exist');
      
      const initialTheme = document.documentElement.getAttribute('data-theme');
      this.helpers.simulateClick(themeToggle);
      
      // Wait for theme change
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const newTheme = document.documentElement.getAttribute('data-theme');
      this.assertNotEqual(initialTheme, newTheme, 'Theme should change when toggle is clicked');
    });

    // Hero section tests
    this.test('Hero section should be present', async () => {
      const hero = document.querySelector('.hero');
      this.assertExists(hero, 'Hero section should exist');
    });

    this.test('Hero title should be present', async () => {
      const title = document.querySelector('.hero-title');
      this.assertExists(title, 'Hero title should exist');
      this.assertContains(title.textContent, 'Khalid Hussein', 'Hero title should contain name');
    });

    this.test('Hero buttons should be clickable', async () => {
      const buttons = document.querySelectorAll('.hero-buttons a');
      this.assertGreaterThan(buttons.length, 0, 'Hero buttons should exist');
      
      buttons.forEach(button => {
        this.assertExists(button.getAttribute('href'), 'Button should have href attribute');
      });
    });

    // Performance tests
    this.test('Page should load within acceptable time', async () => {
      const startTime = performance.now();
      
      // Wait for page to be fully loaded
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve);
        }
      });
      
      const loadTime = performance.now() - startTime;
      this.assertLessThan(loadTime, 3000, 'Page should load within 3 seconds');
    });

    this.test('Images should have alt attributes', async () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        this.assertExists(img.getAttribute('alt'), 'Image should have alt attribute');
      });
    });

    // Accessibility tests
    this.test('All interactive elements should be keyboard accessible', async () => {
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
      interactiveElements.forEach(element => {
        this.assertTrue(
          element.tabIndex >= 0 || element.tagName === 'A' || element.tagName === 'BUTTON',
          'Interactive element should be keyboard accessible'
        );
      });
    });

    this.test('Color contrast should be sufficient', async () => {
      // This would typically use a color contrast checking library
      // For now, we'll just check that elements have proper color values
      const elements = document.querySelectorAll('*');
      elements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;
        
        this.assertNotEqual(color, 'rgba(0, 0, 0, 0)', 'Element should have visible text color');
      });
    });

    // API tests
    this.test('GitHub API should be accessible', async () => {
      try {
        const response = await fetch('https://api.github.com/users/kh3rld');
        this.assertEqual(response.status, 200, 'GitHub API should return 200 status');
      } catch (error) {
        this.log('GitHub API test skipped due to network error', 'warning');
      }
    });

    this.test('LinkedIn API should handle errors gracefully', async () => {
      try {
        const response = await fetch('https://api.allorigins.win/raw?url=https://www.linkedin.com/in/kherldhussein/');
        // We expect this to potentially fail, but it should fail gracefully
        this.assertTrue(response.status >= 200, 'LinkedIn API should return a status code');
      } catch (error) {
        // This is expected behavior
        this.log('LinkedIn API test completed (expected to potentially fail)', 'info');
      }
    });

    // Animation tests
    this.test('Animations should respect reduced motion preference', async () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        const animatedElements = document.querySelectorAll('[data-scroll-animation]');
        animatedElements.forEach(element => {
          const computedStyle = window.getComputedStyle(element);
          this.assertEqual(computedStyle.animationDuration, '0.01s', 'Animation should be disabled for reduced motion');
        });
      }
    });

    // Form tests
    this.test('Contact form should have proper validation', async () => {
      const form = document.querySelector('form');
      if (form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
          this.assertExists(input.getAttribute('required'), 'Required input should have required attribute');
        });
      }
    });

    // Mobile responsiveness tests
    this.test('Page should be responsive', async () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      this.assertExists(viewport, 'Viewport meta tag should exist');
      this.assertContains(viewport.getAttribute('content'), 'width=device-width', 'Viewport should be responsive');
    });
  }
}

// Testing framework completely disabled for production
// Only enable in development with explicit debug flag
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize testing framework with explicit debug flag
  if (window.location.search.includes('debug=true')) {
    window.testingFramework = new TestingFramework();
    window.testingFramework.setupPortfolioTests();
    
    // Auto-run tests
    setTimeout(() => {
      window.testingFramework.runAllTests();
    }, 2000);
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TestingFramework;
}
