// Config file for color schemes and theming
// Change the active theme here or programmatically via JavaScript

const CONFIG = {
  // Active theme - change this to switch schemes
  activeTheme: 'tropical', // options: 'default', 'cyberpunk', 'tropical', 'musicGirl', 'scienceGirl'

  // Theme definitions
  themes: {
    default: {
      name: 'Professional Blue',
      description: 'Clean, modern, professional blue theme',
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#0ea5e9',
        textDark: '#1f2937',
        textLight: '#6b7280',
        bgLight: '#f9fafb',
        bgWhite: '#ffffff',
        borderColor: '#e5e7eb',
        successColor: '#10b981',
        warningColor: '#f59e0b',
      },
      fonts: {
        sans: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        serif: "'Georgia', serif",
      },
      backgroundImages: {
        home: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%)',
        accomplishments: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(255, 255, 255, 1) 100%)',
        coursework: 'linear-gradient(135deg, rgba(147, 51, 234, 0.03) 0%, rgba(255, 255, 255, 1) 100%)',
        videos: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(255, 255, 255, 1) 100%)',
        writing: 'linear-gradient(135deg, rgba(168, 85, 247, 0.03) 0%, rgba(255, 255, 255, 1) 100%)',
        music: 'linear-gradient(135deg, rgba(219, 39, 119, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        resume: 'linear-gradient(135deg, rgba(249, 115, 22, 0.03) 0%, rgba(255, 255, 255, 1) 100%)',
        photos: 'linear-gradient(135deg, rgba(236, 72, 153, 0.03) 0%, rgba(255, 255, 255, 1) 100%)',
        travels: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        community: 'linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        contact: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(255, 255, 255, 1) 100%)',
      },
      navbar: 'linear-gradient(90deg, rgba(37, 99, 235, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%), #ffffff',
      footer: 'linear-gradient(90deg, rgba(37, 99, 235, 0.06) 0%, rgba(31, 41, 55, 1) 100%)',
      body: '#f9fafb'
    },
    
    cyberpunk: {
      name: 'Cyberpunk Neon',
      description: 'Dark, neon cyberpunk theme with electric colors',
      colors: {
        primary: '#00ffff',
        secondary: '#ff006e',
        accent: '#00ff41',
        textDark: '#e0e0e0',
        textLight: '#a0a0a0',
        bgLight: '#0a0e27',
        bgWhite: '#1a1f3a',
        borderColor: '#00ffff',
        successColor: '#00ff41',
        warningColor: '#ff006e',
      },
      fonts: {
        sans: "'Courier New', 'Courier', monospace",
        serif: "'Courier New', 'Courier', monospace",
      },
      backgroundImages: {
        home: 'linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 0, 110, 0.15) 100%), #0a0e27',
        accomplishments: 'linear-gradient(135deg, rgba(0, 255, 65, 0.1) 0%, rgba(26, 31, 58, 1) 100%)',
        coursework: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1) 0%, rgba(26, 31, 58, 1) 100%)',
        videos: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(26, 31, 58, 1) 100%)',
        writing: 'linear-gradient(135deg, rgba(0, 255, 65, 0.1) 0%, rgba(26, 31, 58, 1) 100%)',
        music: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1) 0%, rgba(26, 31, 58, 1) 100%)',
        resume: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(26, 31, 58, 1) 100%)',
        photos: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1) 0%, rgba(26, 31, 58, 1) 100%)',
        travels: 'linear-gradient(135deg, rgba(0, 255, 65, 0.1) 0%, rgba(26, 31, 58, 1) 100%)',
        community: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1) 0%, rgba(26, 31, 58, 1) 100%)',
        contact: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(26, 31, 58, 1) 100%)',
      },
      navbar: 'linear-gradient(90deg, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 110, 0.2) 100%), #0a0e27',
      footer: 'linear-gradient(90deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 0, 110, 0.15) 100%), #050812',
      body: '#0a0e27'
    },
    
    tropical: {
      name: 'Tropical Paradise',
      description: 'Vibrant tropical theme with warm, island colors',
      colors: {
        primary: '#ff6b35',
        secondary: '#f7931e',
        accent: '#fdb833',
        textDark: '#2d3436',
        textLight: '#636e72',
        bgLight: '#fff3e0',
        bgWhite: '#ffffff',
        borderColor: '#ffcc80',
        successColor: '#4caf50',
        warningColor: '#ff6b35',
      },
      fonts: {
        sans: "'Trebuchet MS', 'Lucida Grande', sans-serif",
        serif: "'Georgia', serif",
      },
      backgroundImages: {
        home: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(253, 184, 51, 0.1) 100%)',
        accomplishments: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        coursework: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        videos: 'linear-gradient(135deg, rgba(253, 184, 51, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        writing: 'linear-gradient(135deg, rgba(255, 195, 0, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        music: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        resume: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        photos: 'linear-gradient(135deg, rgba(253, 184, 51, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        travels: 'linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(255, 255, 255, 1) 100%)',
        community: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
        contact: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
      },
      navbar: 'linear-gradient(90deg, rgba(255, 107, 53, 0.1) 0%, rgba(253, 184, 51, 0.12) 100%), #ffffff',
      footer: 'linear-gradient(90deg, rgba(255, 107, 53, 0.08) 0%, rgba(76, 175, 80, 0.08) 100%), #faf3e0',
      body: '#fff9f0'
    },

    musicGirl: {
      name: 'Music Girl',
      description: 'Artistic and creative theme expressing a passion for music',
      colors: {
        primary: '#d946ef',
        secondary: '#ec4899',
        accent: '#f43f5e',
        textDark: '#3e0e39',
        textLight: '#9f1239',
        bgLight: '#fce7f3',
        bgWhite: '#fdf2f8',
        borderColor: '#fbcfe8',
        successColor: '#a855f7',
        warningColor: '#ec4899',
      },
      fonts: {
        sans: "'Georgia', serif",
        serif: "'Georgia', serif",
      },
      backgroundImages: {
        home: 'linear-gradient(135deg, rgba(217, 70, 239, 0.12) 0%, rgba(244, 63, 94, 0.12) 100%)',
        accomplishments: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(253, 242, 248, 1) 100%)',
        coursework: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(253, 242, 248, 1) 100%)',
        videos: 'linear-gradient(135deg, rgba(217, 70, 239, 0.08) 0%, rgba(253, 242, 248, 1) 100%)',
        writing: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(253, 242, 248, 1) 100%)',
        music: 'linear-gradient(135deg, rgba(217, 70, 239, 0.08) 0%, rgba(253, 242, 248, 1) 100%)',
        resume: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(253, 242, 248, 1) 100%)',
        photos: 'linear-gradient(135deg, rgba(217, 70, 239, 0.08) 0%, rgba(253, 242, 248, 1) 100%)',
        travels: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(253, 242, 248, 1) 100%)',
        community: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(253, 242, 248, 1) 100%)',
        contact: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(253, 242, 248, 1) 100%)',
      },
      navbar: 'linear-gradient(90deg, rgba(217, 70, 239, 0.12) 0%, rgba(244, 63, 94, 0.12) 100%), #ffffff',
      footer: 'linear-gradient(90deg, rgba(217, 70, 239, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%), #fce7f3',
      body: '#fdf2f8'
    },

    scienceGirl: {
      name: 'Science Girl',
      description: 'Professional STEM theme expressing a passion for science and technology',
      colors: {
        primary: '#0891b2',
        secondary: '#06b6d4',
        accent: '#0d9488',
        textDark: '#164e63',
        textLight: '#155e75',
        bgLight: '#ecf0f1',
        bgWhite: '#f0f9fa',
        borderColor: '#a5f3fc',
        successColor: '#10b981',
        warningColor: '#0ea5e9',
      },
      fonts: {
        sans: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        serif: "'Georgia', serif",
      },
      backgroundImages: {
        home: 'linear-gradient(135deg, rgba(8, 145, 178, 0.1) 0%, rgba(13, 148, 136, 0.1) 100%)',
        accomplishments: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(240, 249, 250, 1) 100%)',
        coursework: 'linear-gradient(135deg, rgba(8, 145, 178, 0.06) 0%, rgba(240, 249, 250, 1) 100%)',
        videos: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(240, 249, 250, 1) 100%)',
        writing: 'linear-gradient(135deg, rgba(13, 148, 136, 0.06) 0%, rgba(240, 249, 250, 1) 100%)',
        music: 'linear-gradient(135deg, rgba(8, 145, 178, 0.06) 0%, rgba(240, 249, 250, 1) 100%)',
        resume: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(240, 249, 250, 1) 100%)',
        photos: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(240, 249, 250, 1) 100%)',
        travels: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(240, 249, 250, 1) 100%)',
        community: 'linear-gradient(135deg, rgba(8, 145, 178, 0.06) 0%, rgba(240, 249, 250, 1) 100%)',
        contact: 'linear-gradient(135deg, rgba(8, 145, 178, 0.06) 0%, rgba(240, 249, 250, 1) 100%)',
      },
      navbar: 'linear-gradient(90deg, rgba(8, 145, 178, 0.1) 0%, rgba(13, 148, 136, 0.1) 100%), #ffffff',
      footer: 'linear-gradient(90deg, rgba(8, 145, 178, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%), #ecf0f1',
      body: '#f0f9fa'
    },
  },

  // Settings for dynamic behavior
  settings: {
    autoPlaySlideshow: true,
    autoPlayInterval: 5000, // milliseconds
    enableDynamicBackground: true,
    enableVideoAutoPause: true,
    animationDuration: 300, // milliseconds
  },

  // Navigation structure
  sections: [
    { id: 'home', title: 'Home', path: '/', icon: '🏠' },
    { id: 'about', title: 'About', path: '/about/', icon: '👤' },
    { id: 'accomplishments', title: 'Accomplishments', path: '/accomplishments/', icon: '🏆' },
    { id: 'classes', title: 'Classes', path: '/classes/', icon: '📚' },
    { id: 'videos', title: 'Videos', path: '/videos/', icon: '▶️' },
    { id: 'essays', title: 'Essays', path: '/essays/', icon: '📝' },
    { id: 'activities', title: 'Activities', path: '/activities/', icon: '🎯' },
    { id: 'resume', title: 'Resume', path: '/resume/', icon: '📄' },
    { id: 'photos', title: 'Photos', path: '/photos/', icon: '📷' },
    { id: 'puzzles', title: 'Puzzles', path: '/puzzles/', icon: '🧩' },
    { id: 'contact', title: 'Contact', path: '/contact/', icon: '✉️' },
  ],

  // Get current theme
  getTheme() {
    return this.themes[this.activeTheme] || this.themes.default;
  },

  // Switch theme
  switchTheme(themeName) {
    if (this.themes[themeName]) {
      this.activeTheme = themeName;
      // Store in localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('selectedTheme', themeName);
      }
      // Trigger theme change event
      window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: themeName } }));
      return true;
    }
    return false;
  },

  // Load saved theme from localStorage
  loadSavedTheme() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('selectedTheme');
      if (saved && this.themes[saved]) {
        this.activeTheme = saved;
      }
    }
  },
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CONFIG.loadSavedTheme());
} else {
  CONFIG.loadSavedTheme();
}
