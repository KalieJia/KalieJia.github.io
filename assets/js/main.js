// ============================================
// Personal Website - Enhanced Main JavaScript
// Features: Theme Switching, Video Auto-pause, Dynamic Backgrounds
// Works with Router for SPA navigation
// ============================================

// ============================================
// Theme Management System
// ============================================

class ThemeManager {
  constructor() {
    this.currentTheme = CONFIG.getTheme();
    this.init();
  }

  init() {
    // Apply current theme
    this.applyTheme(this.currentTheme);
    
    // Listen for theme changes
    window.addEventListener('themeChange', (e) => {
      this.currentTheme = CONFIG.getTheme();
      this.applyTheme(CONFIG.getTheme());
    });
  }

  applyTheme(theme) {
    const root = document.documentElement;
    
    // Apply color variables
    root.style.setProperty('--primary-color', theme.colors.primary);
    root.style.setProperty('--secondary-color', theme.colors.secondary);
    root.style.setProperty('--accent-color', theme.colors.accent);
    root.style.setProperty('--text-dark', theme.colors.textDark);
    root.style.setProperty('--text-light', theme.colors.textLight);
    root.style.setProperty('--bg-light', theme.colors.bgLight);
    root.style.setProperty('--bg-white', theme.colors.bgWhite);
    root.style.setProperty('--border-color', theme.colors.borderColor);
    root.style.setProperty('--success-color', theme.colors.successColor);
    root.style.setProperty('--warning-color', theme.colors.warningColor);
    
    // Apply fonts
    root.style.setProperty('--font-sans', theme.fonts.sans);
    root.style.setProperty('--font-serif', theme.fonts.serif);
    
    // Apply background images for nav, footer, and body
    root.style.setProperty('--navbar-bg', theme.navbar);
    root.style.setProperty('--footer-bg', theme.footer);
    root.style.setProperty('--body-bg', theme.body);
    
    // Trigger re-render
    document.body.style.transition = `background-color ${CONFIG.settings.animationDuration}ms ease`;
    document.body.style.color = theme.colors.textDark;
    document.body.style.backgroundColor = theme.body;
  }

  switchTheme(themeName) {
    CONFIG.switchTheme(themeName);
  }

  getAvailableThemes() {
    return Object.keys(CONFIG.themes);
  }
}

// ============================================
// Dynamic Background Switcher
// ============================================

class BackgroundSwitcher {
  constructor() {
    this.currentSection = null;
    this.mainElement = document.querySelector('main');
    
    if (!this.mainElement) return;
    
    this.init();
  }

  init() {
    if (CONFIG.settings.enableDynamicBackground) {
      window.addEventListener('scroll', () => this.updateBackground());
      window.addEventListener('themeChange', () => this.updateBackground());
      
      // Initial background
      this.updateBackground();
    }
  }

  updateBackground() {
    const sections = document.querySelectorAll('section');
    let currentSection = null;
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) {
        currentSection = section;
      }
    });
    
    if (currentSection && this.currentSection !== currentSection.id) {
      this.currentSection = currentSection.id;
      this.applyBackground(currentSection.id);
    }
  }

  applyBackground(sectionId) {
    const theme = CONFIG.getTheme();
    const background = theme.backgroundImages[sectionId] || theme.backgroundImages.home;
    
    if (this.mainElement) {
      this.mainElement.style.transition = `background ${CONFIG.settings.animationDuration}ms ease`;
      this.mainElement.style.background = background;
    }
  }
}

// ============================================
// Video Auto-pause on Slideshow Scroll
// ============================================

class SlideShowVideoManager {
  constructor() {
    this.slideshow = document.getElementById('slideshow');
    this.videos = [];
    this.init();
  }

  init() {
    if (!this.slideshow) return;
    
    // Collect videos
    this.collectVideos();
    
    // Monitor slideshow visibility
    if ('IntersectionObserver' in window) {
      this.observeSlideshow();
    } else {
      window.addEventListener('scroll', () => this.checkVisibility());
    }
  }

  collectVideos() {
    const allIframes = document.querySelectorAll('iframe[src*="youtube"]');
    this.videos = Array.from(allIframes);
  }

  observeSlideshow() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.resumeVideos();
        } else {
          this.pauseVideos();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.slideshow);
  }

  checkVisibility() {
    const rect = this.slideshow.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      this.resumeVideos();
    } else {
      this.pauseVideos();
    }
  }

  pauseVideos() {
    this.videos.forEach((video) => {
      video.contentWindow.postMessage(
        { event: 'command', func: 'pauseVideo' },
        '*'
      );
    });
  }

  resumeVideos() {
    // Note: Auto-play may be restricted by browser
  }
}

// ============================================
// Initialize on DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme Manager
  window.themeManager = new ThemeManager();
  
  // Initialize Background Switcher
  window.bgSwitcher = new BackgroundSwitcher();
  
  // Initialize Language Manager
  window.languageManager = new LanguageManager();
  
  // Initialize Lightbox
  window.lightbox = new Lightbox();
  
  // Setup navigation mobile toggle
  setupMobileNavigation();
  
  // Setup contact form if it exists
  initContactForm();
  
  // Initialize video manager for slideshow
  setTimeout(() => {
    new SlideShowVideoManager();
  }, 100);
});

// ============================================
// Theme Selector Setup
// ============================================

function setupThemeSelector() {
  const select = document.getElementById('theme-select');
  if (!select) return;
  
  select.addEventListener('change', (e) => {
    if (window.themeManager) {
      window.themeManager.switchTheme(e.target.value);
    }
  });
  
  // Set current theme in selector
  if (window.themeManager) {
    select.value = CONFIG.activeTheme || 'default';
  }
}

// Make setupThemeSelector globally accessible
window.setupThemeSelector = setupThemeSelector;

// ============================================
// Mobile Navigation Toggle
// ============================================

function setupMobileNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) {
    console.warn('Navigation elements not found');
    return;
  }

  // Remove existing listeners first (in case this is called multiple times)
  const newToggle = navToggle.cloneNode(true);
  navToggle.parentNode.replaceChild(newToggle, navToggle);

  const newToggleBtn = document.querySelector('.nav-toggle');
  newToggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only close if it's a data-section link (SPA navigation)
      if (link.getAttribute('data-section')) {
        navLinks.classList.remove('active');
      }
    });
  });
}

// Make setupMobileNavigation globally accessible
window.setupMobileNavigation = setupMobileNavigation;

// ============================================
// Contact Form Handler
// ============================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value;
    const email = form.querySelector('[name="email"]')?.value;
    const subject = form.querySelector('[name="subject"]')?.value;
    const message = form.querySelector('[name="message"]')?.value;

    // Validate form
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }

    // Create mailto link
    const mailtoLink = `mailto:kangli.jia@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    window.location.href = mailtoLink;
  });
}

// ============================================
// Lightbox for Gallery
// ============================================

class Lightbox {
  constructor() {
    this.observeGallery();
  }

  observeGallery() {
    // Watch for gallery items being added to DOM
    const observer = new MutationObserver(() => {
      const galleryItems = document.querySelectorAll('.gallery-image');
      if (galleryItems.length > 0) {
        this.init();
        observer.disconnect();
      }
    });

    observer.observe(document.getElementById('content-viewport') || document.body, {
      childList: true,
      subtree: true
    });
  }

  init() {
    const galleryItems = document.querySelectorAll('.photo-item');
    if (galleryItems.length === 0) return;

    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => this.openLightbox(e));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeLightbox();
    });
  }

  openLightbox(e) {
    const item = e.currentTarget;
    const img = item.querySelector('img');

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="${img.src}" alt="${img.alt}">
      </div>
    `;

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      lightbox.remove();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.remove();
    });

    document.body.appendChild(lightbox);
  }

  closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) lightbox.remove();
  }
}

// ============================================
// Language Management System
// ============================================

class LanguageManager {
  constructor() {
    // Map language codes to subfolder names within personalWebsite01
    this.languageMap = {
      'en': '',        // Root (no subfolder)
      'zh-CN': 'cn_s', // Chinese Simplified
      'zh-TW': 'cn_t', // Chinese Traditional
      'ja': 'jp',      // Japanese
      'es': 'sp'       // Spanish
    };
    // Reverse map for detecting current language from path
    this.folderToLanguage = {
      '': 'en',
      'cn_s': 'zh-CN',
      'cn_t': 'zh-TW',
      'jp': 'ja',
      'sp': 'es'
    };
    this.currentLanguage = this.detectCurrentLanguage();
    this.retryCount = 0;
    this.maxRetries = 50;
    this.init();
  }

  detectCurrentLanguage() {
    const pathname = window.location.pathname;
    // Check which language subfolder is in the path
    if (pathname.includes('/cn_s/') || pathname.includes('/cn_s')) return 'zh-CN';
    if (pathname.includes('/cn_t/') || pathname.includes('/cn_t')) return 'zh-TW';
    if (pathname.includes('/jp/') || pathname.includes('/jp')) return 'ja';
    if (pathname.includes('/sp/') || pathname.includes('/sp')) return 'es';
    return 'en'; // Default to English
  }

  init() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      console.log('Language select found, setting up listener');
      languageSelect.value = this.currentLanguage;
      languageSelect.addEventListener('change', (e) => {
        console.log('Language changed to:', e.target.value);
        this.switchLanguage(e.target.value);
      });
      // Save detected language to localStorage
      localStorage.setItem('website-language', this.currentLanguage);
    } else {
      // Retry after a short delay if element not found
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        setTimeout(() => this.init(), 100);
      } else {
        console.warn('Language select element not found after retries');
      }
    }
  }

  getStoredLanguage() {
    return localStorage.getItem('website-language');
  }

  switchLanguage(language) {
    if (language === this.currentLanguage) return;
    
    console.log('Switching language from', this.currentLanguage, 'to', language);
    localStorage.setItem('website-language', language);
    this.currentLanguage = language;
    
    const targetFolder = this.languageMap[language] || '';
    const currentPath = window.location.pathname;
    const hash = window.location.hash || '';
    
    console.log('Current path:', currentPath);
    console.log('Target folder:', targetFolder);
    console.log('Hash:', hash);
    
    // Find the position of personalWebsite01 in the path
    const baseIndex = currentPath.indexOf('personalWebsite01');
    if (baseIndex === -1) {
      console.error('Could not find personalWebsite01 in path:', currentPath);
      return;
    }
    
    // Get everything before personalWebsite01
    const beforeBase = currentPath.substring(0, baseIndex);
    
    // Get everything after personalWebsite01/, excluding any existing language subfolder
    const afterBase = currentPath.substring(baseIndex + 'personalWebsite01'.length);
    let pathWithoutLang = afterBase.replace(/^\/(cn_s|cn_t|jp|sp)/, '');
    
    // Ensure path starts with /
    if (!pathWithoutLang.startsWith('/')) {
      pathWithoutLang = '/' + pathWithoutLang;
    }
    
    // Build new path
    let newPath = beforeBase + 'personalWebsite01';
    if (targetFolder) {
      newPath += '/' + targetFolder + pathWithoutLang;
    } else {
      newPath += pathWithoutLang;
    }
    
    // Ensure proper slashing
    newPath = newPath.replace(/\/+/g, '/');
    
    console.log('New path:', newPath + hash);
    window.location.href = newPath + hash;
  }
}

// Initialize language manager
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new LanguageManager());
} else {
  new LanguageManager();
}

