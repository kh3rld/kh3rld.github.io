/**
 * 🔍 SEO Enhancement Suite
 * Advanced SEO optimizations for the portfolio
 */

class SEOOptimizer {
  constructor() {
    this.structuredData = {};
    this.metaTags = {};
    this.init();
  }

  init() {
    this.setupStructuredData();
    this.setupMetaTags();
    this.setupOpenGraph();
    this.setupTwitterCards();
    this.setupSitemap();
    this.setupRobotsTxt();
    this.setupCanonicalUrls();
  }

  /**
   * 📊 Structured Data (JSON-LD)
   */
  setupStructuredData() {
    const baseUrl = window.location.origin;
    const currentPage = this.getCurrentPage();
    
    // Person Schema
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Khalid Hussein",
      "jobTitle": "Senior Software Engineer",
      "description": "Crafting exceptional digital experiences through innovative software solutions. Specialized in full-stack development, AI integration, and scalable architecture design.",
      "url": baseUrl,
      "image": `${baseUrl}/web/static/images/khalid-hussein.jpg`,
      "sameAs": [
        "https://github.com/kh3rld",
        "https://linkedin.com/in/kherldhussein",
        "https://twitter.com/kh3rld"
      ],
      "knowsAbout": [
        "JavaScript", "React", "Node.js", "Go", "Rust", "Python", "AWS", "Docker", "Kubernetes"
      ],
      "alumniOf": "Software Engineering",
      "worksFor": {
        "@type": "Organization",
        "name": "Tech Innovation Corp"
      }
    };

    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Khalid Hussein Portfolio",
      "url": baseUrl,
      "description": "Professional portfolio showcasing software engineering expertise, projects, and technical skills.",
      "author": {
        "@type": "Person",
        "name": "Khalid Hussein"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Khalid Hussein",
      "url": baseUrl,
      "logo": `${baseUrl}/web/static/images/logo.png`,
      "description": "Senior Software Engineer specializing in full-stack development and innovative solutions."
    };

    // Page-specific schemas
    const pageSchemas = this.getPageSpecificSchemas(currentPage, baseUrl);

    // Combine all schemas
    const allSchemas = [personSchema, websiteSchema, organizationSchema, ...pageSchemas];
    
    // Inject structured data
    this.injectStructuredData(allSchemas);
  }

  /**
   * 📄 Page-specific Schema Generation
   */
  getPageSpecificSchemas(page, baseUrl) {
    const schemas = [];

    switch (page) {
      case 'about':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Khalid Hussein",
          "description": "Learn about Khalid Hussein's background, experience, and passion for software engineering.",
          "url": `${baseUrl}/web/templates/about.page.html`,
          "mainEntity": {
            "@type": "Person",
            "name": "Khalid Hussein"
          }
        });
        break;

      case 'projects':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Projects Portfolio",
          "description": "A collection of software projects and applications developed by Khalid Hussein.",
          "url": `${baseUrl}/web/templates/projects.page.html`,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": this.getProjectSchemas()
          }
        });
        break;

      case 'skills':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Technical Skills",
          "description": "Comprehensive overview of technical skills and certifications in software development.",
          "url": `${baseUrl}/web/templates/skills.page.html`
        });
        break;

      case 'blog':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Khalid's Tech Blog",
          "description": "Technical articles, tutorials, and insights about software development.",
          "url": `${baseUrl}/web/templates/blog.page.html`,
          "author": {
            "@type": "Person",
            "name": "Khalid Hussein"
          }
        });
        break;

      case 'contact':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Khalid Hussein",
          "description": "Get in touch with Khalid Hussein for collaboration opportunities and inquiries.",
          "url": `${baseUrl}/web/templates/contact.page.html`
        });
        break;
    }

    return schemas;
  }

  /**
   * 🚀 Project Schema Generation
   */
  getProjectSchemas() {
    // This would typically fetch from your GitHub API
    return [
      {
        "@type": "SoftwareApplication",
        "name": "Portfolio Website",
        "description": "Modern, responsive portfolio website East Africa's Silicon Savannahbuilt with HTML5, CSS3, and JavaScript.",
        "url": "https://github.com/kh3rld/kh3rld.github.io",
        "applicationCategory": "WebApplication",
        "operatingSystem": "Web Browser",
        "programmingLanguage": ["JavaScript", "HTML", "CSS"]
      }
      // Add more projects as needed
    ];
  }

  /**
   * 🏷️ Meta Tags Optimization
   */
  setupMetaTags() {
    const currentPage = this.getCurrentPage();
    const pageData = this.getPageData(currentPage);
    
    // Update title
    document.title = pageData.title;
    
    // Update meta description
    this.updateMetaTag('description', pageData.description);
    
    // Update keywords
    this.updateMetaTag('keywords', pageData.keywords);
    
    // Update author
    this.updateMetaTag('author', 'Khalid Hussein');
    
    // Update viewport
    this.updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Update charset
    this.updateMetaTag('charset', 'UTF-8');
    
    // Update robots
    this.updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // Update language
    this.updateMetaTag('language', 'English');
    
    // Update theme-color
    this.updateMetaTag('theme-color', '#00d4ff');
    
    // Update color-scheme
    this.updateMetaTag('color-scheme', 'dark light');
  }

  /**
   * 📱 Open Graph Tags
   */
  setupOpenGraph() {
    const currentPage = this.getCurrentPage();
    const pageData = this.getPageData(currentPage);
    const baseUrl = window.location.origin;
    
    const ogTags = {
      'og:title': pageData.title,
      'og:description': pageData.description,
      'og:type': 'website',
      'og:url': window.location.href,
      'og:site_name': 'Khalid Hussein Portfolio',
      'og:image': `${baseUrl}/web/static/images/og-image.jpg`,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'Khalid Hussein - Senior Software Engineer',
      'og:locale': 'en_US'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      this.updateMetaTag(property, content, 'property');
    });
  }

  /**
   * 🐦 Twitter Cards
   */
  setupTwitterCards() {
    const currentPage = this.getCurrentPage();
    const pageData = this.getPageData(currentPage);
    const baseUrl = window.location.origin;
    
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:site': '@kh3rld',
      'twitter:creator': '@kh3rld',
      'twitter:title': pageData.title,
      'twitter:description': pageData.description,
      'twitter:image': `${baseUrl}/web/static/images/twitter-card.jpg`,
      'twitter:image:alt': 'Khalid Hussein - Senior Software Engineer'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      this.updateMetaTag(name, content);
    });
  }

  /**
   * 🗺️ Sitemap Generation
   */
  setupSitemap() {
    const baseUrl = window.location.origin;
    const sitemap = {
      "@context": "https://www.sitemaps.org/schemas/sitemap/0.9",
      "urlset": [
        {
          "url": {
            "loc": baseUrl,
            "lastmod": new Date().toISOString().split('T')[0],
            "changefreq": "weekly",
            "priority": "1.0"
          }
        },
        {
          "url": {
            "loc": `${baseUrl}/web/templates/about.page.html`,
            "lastmod": new Date().toISOString().split('T')[0],
            "changefreq": "monthly",
            "priority": "0.8"
          }
        },
        {
          "url": {
            "loc": `${baseUrl}/web/templates/projects.page.html`,
            "lastmod": new Date().toISOString().split('T')[0],
            "changefreq": "weekly",
            "priority": "0.9"
          }
        },
        {
          "url": {
            "loc": `${baseUrl}/web/templates/skills.page.html`,
            "lastmod": new Date().toISOString().split('T')[0],
            "changefreq": "monthly",
            "priority": "0.7"
          }
        },
        {
          "url": {
            "loc": `${baseUrl}/web/templates/blog.page.html`,
            "lastmod": new Date().toISOString().split('T')[0],
            "changefreq": "weekly",
            "priority": "0.8"
          }
        },
        {
          "url": {
            "loc": `${baseUrl}/web/templates/contact.page.html`,
            "lastmod": new Date().toISOString().split('T')[0],
            "changefreq": "monthly",
            "priority": "0.6"
          }
        }
      ]
    };

    // Store sitemap for potential XML generation
    this.sitemap = sitemap;
  }

  /**
   * 🤖 Robots.txt
   */
  setupRobotsTxt() {
    const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${window.location.origin}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Allow all other content
Allow: /web/
Allow: /static/`;

    // Store for potential file generation
    this.robotsTxt = robotsContent;
  }

  /**
   * 🔗 Canonical URLs
   */
  setupCanonicalUrls() {
    const canonicalUrl = window.location.href.split('?')[0]; // Remove query params
    this.updateMetaTag('canonical', canonicalUrl, 'rel');
  }

  /**
   * 📄 Page Data Configuration
   */
  getPageData(page) {
    const baseData = {
      title: 'Khalid Hussein | Senior Software Engineer',
      description: 'Professional portfolio showcasing software engineering expertise, innovative projects, and technical skills in full-stack development.',
      keywords: 'software engineer, full-stack developer, JavaScript, React, Node.js, Go, Rust, portfolio, web development'
    };

    const pageConfigs = {
      'index': {
        title: 'Khalid Hussein | Senior Software Engineer',
        description: 'Crafting exceptional digital experiences through innovative software solutions. Specialized in full-stack development, AI integration, and scalable architecture design.',
        keywords: 'software engineer, full-stack developer, JavaScript, React, Node.js, portfolio, web development, AI integration'
      },
      'about': {
        title: 'About Khalid Hussein | Senior Software Engineer',
        description: 'Learn about Khalid Hussein\'s background, experience, and passion for software engineering. Discover the journey of a dedicated developer.',
        keywords: 'about, software engineer, experience, background, journey, developer story'
      },
      'projects': {
        title: 'Projects | Khalid Hussein Portfolio',
        description: 'Explore innovative software projects and applications developed by Khalid Hussein. From web applications to mobile apps and AI solutions.',
        keywords: 'projects, portfolio, software applications, web development, mobile apps, AI solutions, GitHub'
      },
      'skills': {
        title: 'Skills & Certifications | Khalid Hussein',
        description: 'Comprehensive overview of technical skills, programming languages, frameworks, and professional certifications in software development.',
        keywords: 'skills, certifications, programming languages, frameworks, technical expertise, LinkedIn'
      },
      'blog': {
        title: 'Tech Blog | Khalid Hussein',
        description: 'Technical articles, tutorials, and insights about software development, programming, and technology trends.',
        keywords: 'blog, tech articles, programming tutorials, software development, technology insights'
      },
      'contact': {
        title: 'Contact Khalid Hussein | Get In Touch',
        description: 'Get in touch with Khalid Hussein for collaboration opportunities, project inquiries, and professional networking.',
        keywords: 'contact, collaboration, project inquiry, professional networking, get in touch'
      }
    };

    return pageConfigs[page] || baseData;
  }

  /**
   * 🔍 Get Current Page
   */
  getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'index';
    if (path.includes('about')) return 'about';
    if (path.includes('projects')) return 'projects';
    if (path.includes('skills')) return 'skills';
    if (path.includes('blog')) return 'blog';
    if (path.includes('contact')) return 'contact';
    return 'index';
  }

  /**
   * 🏷️ Update Meta Tag
   */
  updateMetaTag(name, content, attribute = 'name') {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  }

  /**
   * 📊 Inject Structured Data
   */
  injectStructuredData(schemas) {
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }

  /**
   * 📈 Analytics Integration
   */
  setupAnalytics() {
    // Google Analytics 4
    const gtag = document.createElement('script');
    gtag.async = true;
    gtag.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(gtag);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  }

  /**
   * 🔍 Search Console Verification
   */
  setupSearchConsole() {
    // Add Google Search Console verification meta tag
    this.updateMetaTag('google-site-verification', 'YOUR_VERIFICATION_CODE');
  }
}

// Initialize SEO optimizer
document.addEventListener('DOMContentLoaded', () => {
  window.seoOptimizer = new SEOOptimizer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SEOOptimizer;
}
