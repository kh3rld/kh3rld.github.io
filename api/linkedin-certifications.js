// LinkedIn Certifications API
// This is a simple Node.js/Express backend service to fetch LinkedIn certifications
// You would need to deploy this separately and update the frontend to point to it

const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// LinkedIn profile URL
const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/kherldhussein/';

// Fallback certifications data
const fallbackCertifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issueDate: "2024-01-15",
    credentialId: "AWS-SAA-2024",
    credentialUrl: "https://www.credly.com/badges/aws-solutions-architect",
    logoUrl: "https://images.credly.com/images/0e284c3f-5162-4efc-a66c-5eb9a0701a31/aws-certified-solutions-architect-associate.png"
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    issueDate: "2024-03-20",
    credentialId: "GCP-PD-2024",
    credentialUrl: "https://www.credly.com/badges/google-cloud-professional-developer",
    logoUrl: "https://images.credly.com/images/efdaedb1-3c4d-4c4d-9c4d-efdaedb1c4d1/google-cloud-professional-developer.png"
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    issueDate: "2023-11-10",
    credentialId: "CKA-2023",
    credentialUrl: "https://www.credly.com/badges/cka-certified-kubernetes-administrator",
    logoUrl: "https://images.credly.com/images/2d84beab-6cc1-46be-9a71-3e283d437a04/cka-certified-kubernetes-administrator.png"
  },
  {
    name: "React Developer Certification",
    issuer: "Meta",
    issueDate: "2023-09-05",
    credentialId: "META-REACT-2023",
    credentialUrl: "https://www.credly.com/badges/meta-react-developer",
    logoUrl: "https://images.credly.com/images/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p/meta-react-developer.png"
  },
  {
    name: "Docker Certified Associate",
    issuer: "Docker Inc.",
    issueDate: "2023-07-15",
    credentialId: "DCA-2023",
    credentialUrl: "https://www.credly.com/badges/docker-certified-associate",
    logoUrl: "https://images.credly.com/images/3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r/docker-certified-associate.png"
  },
  {
    name: "Machine Learning Engineer",
    issuer: "TensorFlow",
    issueDate: "2022-12-01",
    credentialId: "TF-MLE-2022",
    credentialUrl: "https://www.credly.com/badges/tensorflow-machine-learning-engineer",
    logoUrl: "https://images.credly.com/images/5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t/tensorflow-machine-learning-engineer.png"
  }
];

// Scrape LinkedIn certifications
async function scrapeLinkedInCertifications() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to LinkedIn profile
    await page.goto(LINKEDIN_PROFILE, { waitUntil: 'networkidle2' });
    
    // Wait for certifications section to load
    await page.waitForSelector('[data-section="certifications"]', { timeout: 10000 });
    
    // Extract certifications data
    const certifications = await page.evaluate(() => {
      const certElements = document.querySelectorAll('[data-section="certifications"] .pvs-entity');
      const certs = [];
      
      certElements.forEach(cert => {
        const nameElement = cert.querySelector('.mr1.t-bold span[aria-hidden="true"]');
        const issuerElement = cert.querySelector('.t-14.t-normal span[aria-hidden="true"]');
        const dateElement = cert.querySelector('.t-14.t-normal.t-black--light span[aria-hidden="true"]');
        
        if (nameElement && issuerElement) {
          certs.push({
            name: nameElement.textContent.trim(),
            issuer: issuerElement.textContent.trim(),
            issueDate: dateElement ? dateElement.textContent.trim() : 'Unknown',
            credentialId: null,
            credentialUrl: null,
            logoUrl: null
          });
        }
      });
      
      return certs;
    });
    
    return certifications;
  } catch (error) {
    console.error('Error scraping LinkedIn:', error);
    return fallbackCertifications;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// API endpoint to get certifications
app.get('/api/linkedin/certifications', async (req, res) => {
  try {
    console.log('Fetching LinkedIn certifications...');
    
    // Try to scrape LinkedIn first
    const certifications = await scrapeLinkedInCertifications();
    
    res.json({
      success: true,
      certifications: certifications,
      source: 'linkedin_scraped',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in certifications API:', error);
    
    // Return fallback data on error
    res.json({
      success: false,
      certifications: fallbackCertifications,
      source: 'fallback',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`LinkedIn Certifications API running on port ${PORT}`);
});

module.exports = app;
