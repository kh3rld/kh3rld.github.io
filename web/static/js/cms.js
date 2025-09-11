/**
 * 🎛️ Content Management System
 * Advanced CMS for portfolio content management
 */

class ContentManagementSystem {
  constructor() {
    this.config = {
      api: {
        baseUrl: '/api/cms',
        timeout: 10000
      },
      storage: {
        prefix: 'cms_',
        encryption: true
      },
      ui: {
        theme: 'dark',
        animations: true
      },
      security: {
        requireAuth: true,
        sessionTimeout: 3600000 // 1 hour
      }
    };
    
    this.currentUser = null;
    this.isAuthenticated = false;
    this.contentCache = new Map();
    this.draftChanges = new Map();
    this.autoSaveInterval = null;
    
    this.init();
  }

  init() {
    this.setupUI();
    this.setupEventListeners();
    this.setupAutoSave();
    this.setupKeyboardShortcuts();
    this.setupDragAndDrop();
    this.setupImageUpload();
    this.setupContentValidation();
    this.setupVersionControl();
    this.setupCollaboration();
  }

  /**
   * 🎨 Setup CMS UI
   */
  setupUI() {
    this.createCMSInterface();
    this.createContentEditor();
    this.createMediaLibrary();
    this.createUserManagement();
    this.createAnalyticsDashboard();
    this.createSettingsPanel();
  }

  /**
   * 🖥️ Create CMS Interface
   */
  createCMSInterface() {
    // Main CMS container
    this.cmsContainer = document.createElement('div');
    this.cmsContainer.id = 'cms-container';
    this.cmsContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-primary);
      z-index: 10000;
      display: none;
      font-family: 'Inter', sans-serif;
    `;

    // Header
    const header = document.createElement('header');
    header.style.cssText = `
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;

    const logo = document.createElement('div');
    logo.innerHTML = `
      <h1 style="color: var(--accent-primary); margin: 0; font-size: 1.5rem;">
        🎛️ Portfolio CMS
      </h1>
    `;

    const userMenu = document.createElement('div');
    userMenu.style.cssText = `
      display: flex;
      align-items: center;
      gap: 1rem;
    `;

    const saveButton = document.createElement('button');
    saveButton.innerHTML = '💾 Save All';
    saveButton.className = 'cms-btn cms-btn-primary';
    saveButton.onclick = () => this.saveAllChanges();

    const publishButton = document.createElement('button');
    publishButton.innerHTML = '🚀 Publish';
    publishButton.className = 'cms-btn cms-btn-success';
    publishButton.onclick = () => this.publishChanges();

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '❌ Close';
    closeButton.className = 'cms-btn cms-btn-danger';
    closeButton.onclick = () => this.closeCMS();

    userMenu.appendChild(saveButton);
    userMenu.appendChild(publishButton);
    userMenu.appendChild(closeButton);

    header.appendChild(logo);
    header.appendChild(userMenu);

    // Main content area
    const mainContent = document.createElement('div');
    mainContent.style.cssText = `
      display: flex;
      height: calc(100vh - 80px);
    `;

    // Sidebar
    this.sidebar = document.createElement('aside');
    this.sidebar.style.cssText = `
      width: 300px;
      background: var(--bg-tertiary);
      border-right: 1px solid var(--border-color);
      padding: 1rem;
      overflow-y: auto;
    `;

    this.createSidebarContent();

    // Content area
    this.contentArea = document.createElement('main');
    this.contentArea.style.cssText = `
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
    `;

    mainContent.appendChild(this.sidebar);
    mainContent.appendChild(this.contentArea);

    this.cmsContainer.appendChild(header);
    this.cmsContainer.appendChild(mainContent);

    // Add CSS styles
    this.addCMSStyles();

    document.body.appendChild(this.cmsContainer);
  }

  /**
   * 🎨 Add CMS Styles
   */
  addCMSStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .cms-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        margin-left: 0.5rem;
      }

      .cms-btn-primary {
        background: var(--accent-primary);
        color: var(--bg-primary);
      }

      .cms-btn-success {
        background: #4caf50;
        color: white;
      }

      .cms-btn-danger {
        background: #f44336;
        color: white;
      }

      .cms-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      .cms-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
      }

      .cms-card:hover {
        border-color: var(--accent-primary);
        box-shadow: 0 4px 12px rgba(0, 212, 255, 0.1);
      }

      .cms-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 1rem;
        margin-bottom: 1rem;
      }

      .cms-textarea {
        width: 100%;
        min-height: 120px;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 1rem;
        resize: vertical;
        font-family: inherit;
      }

      .cms-select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 1rem;
        margin-bottom: 1rem;
      }

      .cms-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .cms-tabs {
        display: flex;
        border-bottom: 1px solid var(--border-color);
        margin-bottom: 1rem;
      }

      .cms-tab {
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: all 0.3s ease;
      }

      .cms-tab.active {
        border-bottom-color: var(--accent-primary);
        color: var(--accent-primary);
      }

      .cms-tab:hover {
        background: var(--bg-tertiary);
      }

      .cms-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .cms-status {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .cms-status-published {
        background: #e8f5e8;
        color: #2e7d32;
      }

      .cms-status-draft {
        background: #fff3e0;
        color: #f57c00;
      }

      .cms-status-pending {
        background: #e3f2fd;
        color: #1976d2;
      }

      .cms-media-item {
        position: relative;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .cms-media-item:hover {
        border-color: var(--accent-primary);
        transform: scale(1.02);
      }

      .cms-media-item img {
        width: 100%;
        height: 150px;
        object-fit: cover;
      }

      .cms-media-info {
        padding: 0.75rem;
        background: var(--bg-secondary);
      }

      .cms-media-name {
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--text-primary);
      }

      .cms-media-size {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }

      .cms-drag-over {
        border: 2px dashed var(--accent-primary);
        background: rgba(0, 212, 255, 0.1);
      }

      .cms-progress {
        width: 100%;
        height: 4px;
        background: var(--bg-tertiary);
        border-radius: 2px;
        overflow: hidden;
        margin: 1rem 0;
      }

      .cms-progress-bar {
        height: 100%;
        background: var(--accent-primary);
        transition: width 0.3s ease;
      }

      .cms-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
      }

      .cms-notification.show {
        transform: translateX(0);
      }

      .cms-notification-success {
        background: #4caf50;
      }

      .cms-notification-error {
        background: #f44336;
      }

      .cms-notification-warning {
        background: #ff9800;
      }

      .cms-notification-info {
        background: #2196f3;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * 📋 Create Sidebar Content
   */
  createSidebarContent() {
    // Navigation tabs
    const tabs = document.createElement('div');
    tabs.className = 'cms-tabs';
    tabs.innerHTML = `
      <div class="cms-tab active" data-tab="content">📝 Content</div>
      <div class="cms-tab" data-tab="media">🖼️ Media</div>
      <div class="cms-tab" data-tab="analytics">📊 Analytics</div>
      <div class="cms-tab" data-tab="settings">⚙️ Settings</div>
    `;

    // Content sections
    const contentSections = document.createElement('div');
    contentSections.id = 'cms-content-sections';

    // Content section
    const contentSection = document.createElement('div');
    contentSection.className = 'cms-section active';
    contentSection.id = 'cms-content';
    contentSection.innerHTML = `
      <h3>📝 Content Management</h3>
      <div class="cms-card">
        <h4>🏠 Homepage</h4>
        <button class="cms-btn cms-btn-primary" onclick="cms.editContent('homepage')">
          Edit Homepage
        </button>
      </div>
      <div class="cms-card">
        <h4>👤 About Page</h4>
        <button class="cms-btn cms-btn-primary" onclick="cms.editContent('about')">
          Edit About
        </button>
      </div>
      <div class="cms-card">
        <h4>💼 Projects</h4>
        <button class="cms-btn cms-btn-primary" onclick="cms.editContent('projects')">
          Edit Projects
        </button>
      </div>
      <div class="cms-card">
        <h4>📝 Blog</h4>
        <button class="cms-btn cms-btn-primary" onclick="cms.editContent('blog')">
          Edit Blog
        </button>
      </div>
      <div class="cms-card">
        <h4>📞 Contact</h4>
        <button class="cms-btn cms-btn-primary" onclick="cms.editContent('contact')">
          Edit Contact
        </button>
      </div>
    `;

    // Media section
    const mediaSection = document.createElement('div');
    mediaSection.className = 'cms-section';
    mediaSection.id = 'cms-media';
    mediaSection.innerHTML = `
      <h3>🖼️ Media Library</h3>
      <div class="cms-card">
        <h4>Upload Media</h4>
        <div id="cms-upload-area" class="cms-upload-area">
          <p>📁 Drag & drop files here or click to upload</p>
          <input type="file" id="cms-file-input" multiple accept="image/*,video/*" style="display: none;">
        </div>
      </div>
      <div class="cms-card">
        <h4>Recent Media</h4>
        <div id="cms-media-grid" class="cms-grid">
          <!-- Media items will be loaded here -->
        </div>
      </div>
    `;

    // Analytics section
    const analyticsSection = document.createElement('div');
    analyticsSection.className = 'cms-section';
    analyticsSection.id = 'cms-analytics';
    analyticsSection.innerHTML = `
      <h3>📊 Analytics Dashboard</h3>
      <div class="cms-card">
        <h4>📈 Page Views</h4>
        <div id="cms-page-views">Loading...</div>
      </div>
      <div class="cms-card">
        <h4>👥 User Engagement</h4>
        <div id="cms-user-engagement">Loading...</div>
      </div>
      <div class="cms-card">
        <h4>⚡ Performance</h4>
        <div id="cms-performance">Loading...</div>
      </div>
    `;

    // Settings section
    const settingsSection = document.createElement('div');
    settingsSection.className = 'cms-section';
    settingsSection.id = 'cms-settings';
    settingsSection.innerHTML = `
      <h3>⚙️ Settings</h3>
      <div class="cms-card">
        <h4>🎨 Theme Settings</h4>
        <label class="cms-label">Default Theme</label>
        <select class="cms-select" id="cms-default-theme">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="auto">Auto</option>
        </select>
      </div>
      <div class="cms-card">
        <h4>💾 Auto-save</h4>
        <label class="cms-label">
          <input type="checkbox" id="cms-auto-save" checked> Enable auto-save
        </label>
      </div>
      <div class="cms-card">
        <h4>🔒 Security</h4>
        <button class="cms-btn cms-btn-danger" onclick="cms.logout()">
          Logout
        </button>
      </div>
    `;

    contentSections.appendChild(contentSection);
    contentSections.appendChild(mediaSection);
    contentSections.appendChild(analyticsSection);
    contentSections.appendChild(settingsSection);

    this.sidebar.appendChild(tabs);
    this.sidebar.appendChild(contentSections);

    // Tab switching
    tabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('cms-tab')) {
        const tabName = e.target.dataset.tab;
        this.switchTab(tabName);
      }
    });
  }

  /**
   * 🔄 Switch Tab
   */
  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.cms-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update sections
    document.querySelectorAll('.cms-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(`cms-${tabName}`).classList.add('active');

    // Load tab-specific content
    this.loadTabContent(tabName);
  }

  /**
   * 📄 Load Tab Content
   */
  loadTabContent(tabName) {
    switch (tabName) {
      case 'content':
        this.loadContentManagement();
        break;
      case 'media':
        this.loadMediaLibrary();
        break;
      case 'analytics':
        this.loadAnalyticsDashboard();
        break;
      case 'settings':
        this.loadSettings();
        break;
    }
  }

  /**
   * 📝 Load Content Management
   */
  loadContentManagement() {
    this.contentArea.innerHTML = `
      <div class="cms-card">
        <h2>📝 Content Editor</h2>
        <div id="cms-editor-container">
          <p>Select a content section to edit from the sidebar.</p>
        </div>
      </div>
    `;
  }

  /**
   * 🖼️ Load Media Library
   */
  loadMediaLibrary() {
    this.contentArea.innerHTML = `
      <div class="cms-card">
        <h2>🖼️ Media Library</h2>
        <div class="cms-grid" id="cms-media-grid">
          <!-- Media items will be loaded here -->
        </div>
      </div>
    `;
    this.loadMediaItems();
  }

  /**
   * 📊 Load Analytics Dashboard
   */
  loadAnalyticsDashboard() {
    this.contentArea.innerHTML = `
      <div class="cms-card">
        <h2>📊 Analytics Dashboard</h2>
        <div class="cms-grid">
          <div class="cms-card">
            <h3>📈 Page Views (Last 30 Days)</h3>
            <div id="cms-page-views-chart">Loading...</div>
          </div>
          <div class="cms-card">
            <h3>👥 User Engagement</h3>
            <div id="cms-engagement-chart">Loading...</div>
          </div>
          <div class="cms-card">
            <h3>⚡ Performance Metrics</h3>
            <div id="cms-performance-chart">Loading...</div>
          </div>
          <div class="cms-card">
            <h3>🔍 SEO Status</h3>
            <div id="cms-seo-status">Loading...</div>
          </div>
        </div>
      </div>
    `;
    this.loadAnalyticsData();
  }

  /**
   * ⚙️ Load Settings
   */
  loadSettings() {
    this.contentArea.innerHTML = `
      <div class="cms-card">
        <h2>⚙️ Settings</h2>
        <form id="cms-settings-form">
          <div class="cms-card">
            <h3>🎨 Appearance</h3>
            <label class="cms-label">Default Theme</label>
            <select class="cms-select" id="cms-theme-select">
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
            
            <label class="cms-label">Animation Speed</label>
            <select class="cms-select" id="cms-animation-speed">
              <option value="slow">Slow</option>
              <option value="normal" selected>Normal</option>
              <option value="fast">Fast</option>
            </select>
          </div>
          
          <div class="cms-card">
            <h3>💾 Content Management</h3>
            <label class="cms-label">
              <input type="checkbox" id="cms-auto-save-enabled" checked> Enable auto-save
            </label>
            
            <label class="cms-label">Auto-save Interval (minutes)</label>
            <input type="number" class="cms-input" id="cms-auto-save-interval" value="5" min="1" max="60">
            
            <label class="cms-label">
              <input type="checkbox" id="cms-backup-enabled" checked> Enable automatic backups
            </label>
          </div>
          
          <div class="cms-card">
            <h3>🔒 Security</h3>
            <label class="cms-label">Session Timeout (minutes)</label>
            <input type="number" class="cms-input" id="cms-session-timeout" value="60" min="15" max="480">
            
            <label class="cms-label">
              <input type="checkbox" id="cms-2fa-enabled"> Enable two-factor authentication
            </label>
          </div>
          
          <button type="submit" class="cms-btn cms-btn-primary">💾 Save Settings</button>
        </form>
      </div>
    `;
    
    this.loadSettingsForm();
  }

  /**
   * ✏️ Edit Content
   */
  editContent(contentType) {
    this.contentArea.innerHTML = `
      <div class="cms-card">
        <h2>✏️ Edit ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}</h2>
        <div id="cms-content-editor">
          <div class="cms-card">
            <h3>📝 Content</h3>
            <label class="cms-label">Title</label>
            <input type="text" class="cms-input" id="cms-content-title" placeholder="Enter title...">
            
            <label class="cms-label">Description</label>
            <textarea class="cms-textarea" id="cms-content-description" placeholder="Enter description..."></textarea>
            
            <label class="cms-label">Content</label>
            <textarea class="cms-textarea" id="cms-content-body" placeholder="Enter content..." style="min-height: 300px;"></textarea>
          </div>
          
          <div class="cms-card">
            <h3>🔍 SEO</h3>
            <label class="cms-label">Meta Title</label>
            <input type="text" class="cms-input" id="cms-meta-title" placeholder="Enter meta title...">
            
            <label class="cms-label">Meta Description</label>
            <textarea class="cms-textarea" id="cms-meta-description" placeholder="Enter meta description..."></textarea>
            
            <label class="cms-label">Keywords</label>
            <input type="text" class="cms-input" id="cms-keywords" placeholder="Enter keywords (comma-separated)...">
          </div>
          
          <div class="cms-card">
            <h3>🎨 Appearance</h3>
            <label class="cms-label">Featured Image</label>
            <input type="file" class="cms-input" id="cms-featured-image" accept="image/*">
            
            <label class="cms-label">Status</label>
            <select class="cms-select" id="cms-content-status">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <button class="cms-btn cms-btn-primary" onclick="cms.saveContent('${contentType}')">
              💾 Save
            </button>
            <button class="cms-btn cms-btn-success" onclick="cms.publishContent('${contentType}')">
              🚀 Publish
            </button>
            <button class="cms-btn cms-btn-danger" onclick="cms.discardChanges()">
              ❌ Discard
            </button>
          </div>
        </div>
      </div>
    `;
    
    this.loadContentData(contentType);
  }

  /**
   * 💾 Save Content
   */
  async saveContent(contentType) {
    const contentData = {
      title: document.getElementById('cms-content-title').value,
      description: document.getElementById('cms-content-description').value,
      body: document.getElementById('cms-content-body').value,
      metaTitle: document.getElementById('cms-meta-title').value,
      metaDescription: document.getElementById('cms-meta-description').value,
      keywords: document.getElementById('cms-keywords').value,
      status: document.getElementById('cms-content-status').value,
      lastModified: new Date().toISOString()
    };

    try {
      // Save to local storage as draft
      localStorage.setItem(`cms_draft_${contentType}`, JSON.stringify(contentData));
      
      // Save to content cache
      this.contentCache.set(contentType, contentData);
      
      this.showNotification('Content saved successfully!', 'success');
      
      // Update draft changes
      this.draftChanges.set(contentType, contentData);
      
    } catch (error) {
      this.showNotification('Failed to save content: ' + error.message, 'error');
    }
  }

  /**
   * 🚀 Publish Content
   */
  async publishContent(contentType) {
    try {
      // Save content first
      await this.saveContent(contentType);
      
      // Publish to live site
      const contentData = this.contentCache.get(contentType);
      contentData.status = 'published';
      contentData.publishedAt = new Date().toISOString();
      
      // Here you would typically send to your backend API
      // For now, we'll simulate the API call
      await this.simulateAPICall('POST', `/api/content/${contentType}`, contentData);
      
      this.showNotification('Content published successfully!', 'success');
      
    } catch (error) {
      this.showNotification('Failed to publish content: ' + error.message, 'error');
    }
  }

  /**
   * 📄 Load Content Data
   */
  loadContentData(contentType) {
    // Load from cache or local storage
    const contentData = this.contentCache.get(contentType) || 
                       JSON.parse(localStorage.getItem(`cms_draft_${contentType}`) || '{}');
    
    if (contentData.title) {
      document.getElementById('cms-content-title').value = contentData.title;
    }
    if (contentData.description) {
      document.getElementById('cms-content-description').value = contentData.description;
    }
    if (contentData.body) {
      document.getElementById('cms-content-body').value = contentData.body;
    }
    if (contentData.metaTitle) {
      document.getElementById('cms-meta-title').value = contentData.metaTitle;
    }
    if (contentData.metaDescription) {
      document.getElementById('cms-meta-description').value = contentData.metaDescription;
    }
    if (contentData.keywords) {
      document.getElementById('cms-keywords').value = contentData.keywords;
    }
    if (contentData.status) {
      document.getElementById('cms-content-status').value = contentData.status;
    }
  }

  /**
   * 🖼️ Load Media Items
   */
  loadMediaItems() {
    const mediaGrid = document.getElementById('cms-media-grid');
    if (!mediaGrid) return;

    // Load from local storage or simulate API call
    const mediaItems = JSON.parse(localStorage.getItem('cms_media_items') || '[]');
    
    if (mediaItems.length === 0) {
      mediaGrid.innerHTML = '<p>No media items found. Upload some files to get started!</p>';
      return;
    }

    mediaGrid.innerHTML = mediaItems.map(item => `
      <div class="cms-media-item" onclick="cms.selectMediaItem('${item.id}')">
        <img src="${item.url}" alt="${item.name}">
        <div class="cms-media-info">
          <div class="cms-media-name">${item.name}</div>
          <div class="cms-media-size">${item.size}</div>
        </div>
      </div>
    `).join('');
  }

  /**
   * 📊 Load Analytics Data
   */
  loadAnalyticsData() {
    // Simulate loading analytics data
    setTimeout(() => {
      document.getElementById('cms-page-views-chart').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <h4>📈 Page Views</h4>
          <div style="font-size: 2rem; color: var(--accent-primary);">12,345</div>
          <div style="color: var(--text-secondary);">+15% from last month</div>
        </div>
      `;
      
      document.getElementById('cms-engagement-chart').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <h4>👥 User Engagement</h4>
          <div style="font-size: 2rem; color: var(--accent-primary);">3.2m</div>
          <div style="color: var(--text-secondary);">Average session duration</div>
        </div>
      `;
      
      document.getElementById('cms-performance-chart').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <h4>⚡ Performance</h4>
          <div style="font-size: 2rem; color: var(--accent-primary);">95</div>
          <div style="color: var(--text-secondary);">Lighthouse score</div>
        </div>
      `;
      
      document.getElementById('cms-seo-status').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <h4>🔍 SEO Status</h4>
          <div style="font-size: 2rem; color: var(--accent-primary);">A+</div>
          <div style="color: var(--text-secondary);">SEO grade</div>
        </div>
      `;
    }, 1000);
  }

  /**
   * ⚙️ Load Settings Form
   */
  loadSettingsForm() {
    const form = document.getElementById('cms-settings-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveSettings();
    });

    // Load current settings
    const settings = JSON.parse(localStorage.getItem('cms_settings') || '{}');
    
    if (settings.defaultTheme) {
      document.getElementById('cms-theme-select').value = settings.defaultTheme;
    }
    if (settings.animationSpeed) {
      document.getElementById('cms-animation-speed').value = settings.animationSpeed;
    }
    if (settings.autoSave !== undefined) {
      document.getElementById('cms-auto-save-enabled').checked = settings.autoSave;
    }
    if (settings.autoSaveInterval) {
      document.getElementById('cms-auto-save-interval').value = settings.autoSaveInterval;
    }
    if (settings.backup !== undefined) {
      document.getElementById('cms-backup-enabled').checked = settings.backup;
    }
    if (settings.sessionTimeout) {
      document.getElementById('cms-session-timeout').value = settings.sessionTimeout;
    }
    if (settings.twoFactor !== undefined) {
      document.getElementById('cms-2fa-enabled').checked = settings.twoFactor;
    }
  }

  /**
   * 💾 Save Settings
   */
  saveSettings() {
    const settings = {
      defaultTheme: document.getElementById('cms-theme-select').value,
      animationSpeed: document.getElementById('cms-animation-speed').value,
      autoSave: document.getElementById('cms-auto-save-enabled').checked,
      autoSaveInterval: parseInt(document.getElementById('cms-auto-save-interval').value),
      backup: document.getElementById('cms-backup-enabled').checked,
      sessionTimeout: parseInt(document.getElementById('cms-session-timeout').value),
      twoFactor: document.getElementById('cms-2fa-enabled').checked,
      lastModified: new Date().toISOString()
    };

    localStorage.setItem('cms_settings', JSON.stringify(settings));
    this.showNotification('Settings saved successfully!', 'success');
  }

  /**
   * 🔄 Setup Auto-save
   */
  setupAutoSave() {
    this.autoSaveInterval = setInterval(() => {
      if (this.draftChanges.size > 0) {
        this.saveAllChanges();
      }
    }, 300000); // Auto-save every 5 minutes
  }

  /**
   * ⌨️ Setup Keyboard Shortcuts
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (!this.cmsContainer.style.display !== 'none') return;

      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            this.saveAllChanges();
            break;
          case 'p':
            e.preventDefault();
            this.publishChanges();
            break;
          case 'e':
            e.preventDefault();
            this.toggleCMS();
            break;
        }
      }
    });
  }

  /**
   * 🖱️ Setup Drag and Drop
   */
  setupDragAndDrop() {
    const uploadArea = document.getElementById('cms-upload-area');
    if (!uploadArea) return;

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('cms-drag-over');
    });

    uploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('cms-drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('cms-drag-over');
      
      const files = Array.from(e.dataTransfer.files);
      this.handleFileUpload(files);
    });

    uploadArea.addEventListener('click', () => {
      document.getElementById('cms-file-input').click();
    });
  }

  /**
   * 📁 Setup Image Upload
   */
  setupImageUpload() {
    const fileInput = document.getElementById('cms-file-input');
    if (!fileInput) return;

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      this.handleFileUpload(files);
    });
  }

  /**
   * 📤 Handle File Upload
   */
  async handleFileUpload(files) {
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        // Simulate upload progress
        this.showUploadProgress(file.name, 0);

        // Simulate API call
        const response = await this.simulateAPICall('POST', '/api/upload', formData);
        
        // Add to media library
        const mediaItem = {
          id: Date.now().toString(),
          name: file.name,
          url: URL.createObjectURL(file),
          size: this.formatFileSize(file.size),
          type: file.type,
          uploadedAt: new Date().toISOString()
        };

        // Save to local storage
        const mediaItems = JSON.parse(localStorage.getItem('cms_media_items') || '[]');
        mediaItems.push(mediaItem);
        localStorage.setItem('cms_media_items', JSON.stringify(mediaItems));

        this.showUploadProgress(file.name, 100);
        this.showNotification(`File "${file.name}" uploaded successfully!`, 'success');

      } catch (error) {
        this.showNotification(`Failed to upload "${file.name}": ${error.message}`, 'error');
      }
    }

    // Refresh media library
    this.loadMediaItems();
  }

  /**
   * 📊 Show Upload Progress
   */
  showUploadProgress(fileName, progress) {
    const progressId = `upload-progress-${fileName}`;
    let progressElement = document.getElementById(progressId);
    
    if (!progressElement) {
      progressElement = document.createElement('div');
      progressElement.id = progressId;
      progressElement.className = 'cms-progress';
      progressElement.innerHTML = `
        <div class="cms-progress-bar" style="width: 0%"></div>
        <div style="text-align: center; margin-top: 0.5rem;">${fileName}</div>
      `;
      document.getElementById('cms-upload-area').appendChild(progressElement);
    }

    const progressBar = progressElement.querySelector('.cms-progress-bar');
    progressBar.style.width = `${progress}%`;

    if (progress === 100) {
      setTimeout(() => {
        progressElement.remove();
      }, 2000);
    }
  }

  /**
   * 📏 Format File Size
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * ✅ Setup Content Validation
   */
  setupContentValidation() {
    // Add validation rules for different content types
    this.validationRules = {
      homepage: {
        title: { required: true, minLength: 5, maxLength: 100 },
        description: { required: true, minLength: 20, maxLength: 500 },
        body: { required: true, minLength: 100 }
      },
      about: {
        title: { required: true, minLength: 5, maxLength: 100 },
        description: { required: true, minLength: 50, maxLength: 1000 },
        body: { required: true, minLength: 200 }
      },
      projects: {
        title: { required: true, minLength: 5, maxLength: 100 },
        description: { required: true, minLength: 20, maxLength: 500 }
      },
      blog: {
        title: { required: true, minLength: 5, maxLength: 100 },
        description: { required: true, minLength: 20, maxLength: 500 },
        body: { required: true, minLength: 100 }
      },
      contact: {
        title: { required: true, minLength: 5, maxLength: 100 },
        description: { required: true, minLength: 20, maxLength: 500 }
      }
    };
  }

  /**
   * 🔄 Setup Version Control
   */
  setupVersionControl() {
    // Simple version control using local storage
    this.versionHistory = new Map();
  }

  /**
   * 👥 Setup Collaboration
   */
  setupCollaboration() {
    // Simple collaboration using localStorage events
    window.addEventListener('storage', (e) => {
      if (e.key.startsWith('cms_')) {
        this.handleCollaborationUpdate(e.key, e.newValue);
      }
    });
  }

  /**
   * 🔄 Handle Collaboration Update
   */
  handleCollaborationUpdate(key, newValue) {
    if (key.startsWith('cms_draft_')) {
      const contentType = key.replace('cms_draft_', '');
      const contentData = JSON.parse(newValue);
      this.contentCache.set(contentType, contentData);
      this.showNotification(`Content updated by another user: ${contentType}`, 'info');
    }
  }

  /**
   * 💾 Save All Changes
   */
  async saveAllChanges() {
    try {
      for (const [contentType, contentData] of this.draftChanges) {
        await this.saveContent(contentType);
      }
      this.draftChanges.clear();
      this.showNotification('All changes saved successfully!', 'success');
    } catch (error) {
      this.showNotification('Failed to save some changes: ' + error.message, 'error');
    }
  }

  /**
   * 🚀 Publish Changes
   */
  async publishChanges() {
    try {
      for (const [contentType, contentData] of this.draftChanges) {
        await this.publishContent(contentType);
      }
      this.draftChanges.clear();
      this.showNotification('All changes published successfully!', 'success');
    } catch (error) {
      this.showNotification('Failed to publish some changes: ' + error.message, 'error');
    }
  }

  /**
   * ❌ Discard Changes
   */
  discardChanges() {
    if (confirm('Are you sure you want to discard all unsaved changes?')) {
      this.draftChanges.clear();
      this.showNotification('Changes discarded', 'warning');
    }
  }

  /**
   * 🔄 Toggle CMS
   */
  toggleCMS() {
    if (this.cmsContainer.style.display === 'none') {
      this.openCMS();
    } else {
      this.closeCMS();
    }
  }

  /**
   * 🚪 Open CMS
   */
  openCMS() {
    this.cmsContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';
    this.loadContentManagement();
  }

  /**
   * 🚪 Close CMS
   */
  closeCMS() {
    this.cmsContainer.style.display = 'none';
    document.body.style.overflow = '';
  }

  /**
   * 🔐 Logout
   */
  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.isAuthenticated = false;
      this.currentUser = null;
      this.closeCMS();
      this.showNotification('Logged out successfully', 'info');
    }
  }

  /**
   * 📢 Show Notification
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `cms-notification cms-notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Hide notification
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  /**
   * 🌐 Simulate API Call
   */
  async simulateAPICall(method, url, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true, data });
        } else {
          reject(new Error('Simulated API error'));
        }
      }, 1000);
    });
  }

  /**
   * 🔧 Setup Event Listeners
   */
  setupEventListeners() {
    // Global keyboard shortcut to open CMS
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        this.toggleCMS();
      }
    });
  }
}

// Initialize CMS
document.addEventListener('DOMContentLoaded', () => {
  window.cms = new ContentManagementSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentManagementSystem;
}
