/**
 * Portfolio Application - Object-Oriented Structure
 * Manages theme, menu, and application initialization
 */

/**
 * ThemeManager Class
 * Handles theme switching and persistence
 */
class ThemeManager {
  constructor() {
    this.themeKey = 'theme';
    this.defaultTheme = 'light';
    this.htmlElement = document.documentElement;
  }

  getThemeIcon() {
    return document.querySelector('.theme-icon');
  }

  /**
   * Initialize theme from localStorage or default
   */
  init() {
    if (!this.htmlElement) return;
    const savedTheme = localStorage.getItem(this.themeKey) || this.defaultTheme;
    this.setTheme(savedTheme);
    this.updateIcon(savedTheme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggle() {
    if (!this.htmlElement) return;
    const currentTheme = this.htmlElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    this.saveTheme(newTheme);
    this.updateIcon(newTheme);
  }

  /**
   * Set theme on HTML element
   * @param {string} theme - Theme name ('light' or 'dark')
   */
  setTheme(theme) {
    this.htmlElement.setAttribute('data-theme', theme);
  }

  /**
   * Save theme preference to localStorage
   * @param {string} theme - Theme name
   */
  saveTheme(theme) {
    localStorage.setItem(this.themeKey, theme);
  }

  /**
   * Update theme icon based on current theme
   * @param {string} theme - Theme name
   */
  updateIcon(theme) {
    const themeIcon = this.getThemeIcon();
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
}

/**
 * MenuManager Class
 * Handles hamburger menu open/close functionality
 */
class MenuManager {
  constructor() {
    this.body = document.body;
  }

  getOverlay() {
    return document.querySelector('.menu-overlay');
  }

  getIcon() {
    return document.querySelector('.hamburger-icon');
  }

  /**
   * Toggle menu open/close state
   */
  toggle() {
    const overlay = this.getOverlay();
    const icon = this.getIcon();
    
    if (!overlay || !icon) return;

    const isOpen = overlay.classList.contains('open');
    
    if (isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open menu
   */
  open() {
    const overlay = this.getOverlay();
    const icon = this.getIcon();
    
    if (!overlay || !icon) return;
    
    overlay.classList.add('open');
    icon.classList.add('open');
    this.body.style.overflow = 'hidden';
  }

  /**
   * Close menu
   */
  close() {
    const overlay = this.getOverlay();
    const icon = this.getIcon();
    
    if (overlay) overlay.classList.remove('open');
    if (icon) icon.classList.remove('open');
    this.body.style.overflow = '';
  }

  /**
   * Check if menu is currently open
   * @returns {boolean} - True if menu is open
   */
  isOpen() {
    const overlay = this.getOverlay();
    return overlay?.classList.contains('open') || false;
  }
}

/**
 * PortfolioApp Class
 * Main application controller
 */
class PortfolioApp {
  constructor() {
    this.themeManager = new ThemeManager();
    this.menuManager = new MenuManager();
  }

  /**
   * Initialize the application
   */
  init() {
    this.themeManager.init();
    this.attachEventListeners();
  }

  /**
   * Attach event listeners to DOM elements
   */
  attachEventListeners() {
    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.themeManager.toggle());
    }

    // Hamburger menu toggle
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (hamburgerIcon) {
      hamburgerIcon.addEventListener('click', () => this.menuManager.toggle());
    }

    // Close menu when clicking overlay
    const menuOverlay = document.querySelector('.menu-overlay');
    if (menuOverlay) {
      menuOverlay.addEventListener('click', () => this.menuManager.close());
    }

    // Prevent menu close when clicking inside menu links
    const menuLinks = document.querySelector('.menu-links');
    if (menuLinks) {
      menuLinks.addEventListener('click', (e) => e.stopPropagation());
    }
  }
}

// Global functions for backward compatibility with inline onclick handlers
// These need to be available immediately, before DOMContentLoaded
window.toggleTheme = function(e) {
  console.log('toggleTheme called', e);
  
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  // Direct implementation - no need for app initialization
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  console.log('Current theme:', currentTheme, 'New theme:', newTheme);
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    console.log('Theme icon updated');
  } else {
    console.error('Theme icon not found');
  }
  
  return false;
};

window.toggleMenu = function(e) {
  console.log('toggleMenu called', e);
  
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  // Direct implementation - no need for app initialization
  const overlay = document.querySelector('.menu-overlay');
  const icon = document.querySelector('.hamburger-icon');
  
  console.log('Overlay:', overlay, 'Icon:', icon);
  
  if (!overlay || !icon) {
    console.error('Menu elements not found');
    return false;
  }
  
  const isOpen = overlay.classList.contains('open');
  console.log('Menu is currently:', isOpen ? 'open' : 'closed');
  
  if (isOpen) {
    overlay.classList.remove('open');
    icon.classList.remove('open');
    document.body.style.overflow = '';
    console.log('Menu closed');
  } else {
    overlay.classList.add('open');
    icon.classList.add('open');
    document.body.style.overflow = 'hidden';
    console.log('Menu opened');
  }
  
  return false;
};

// Handle menu link clicks - navigate and close menu
window.handleMenuLink = function(e) {
  // Close the menu first
  const overlay = document.querySelector('.menu-overlay');
  const icon = document.querySelector('.hamburger-icon');
  
  if (overlay) overlay.classList.remove('open');
  if (icon) icon.classList.remove('open');
  document.body.style.overflow = '';
  
  // Allow default navigation to happen
  // The href will handle the navigation
};

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const html = document.documentElement;
  html.setAttribute('data-theme', savedTheme);
  
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }
}

// Add direct event listener to theme button as backup
function setupThemeButton() {
  const themeButton = document.getElementById('theme-toggle');
  if (themeButton) {
    // Remove existing listeners and add new one
    const newButton = themeButton.cloneNode(true);
    themeButton.parentNode.replaceChild(newButton, themeButton);
    
    newButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.toggleTheme(e);
      return false;
    });
  }
}

// Add direct event listener to hamburger menu as backup
function setupMenuButton() {
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  if (hamburgerIcon) {
    hamburgerIcon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.toggleMenu(e);
      return false;
    });
  }
  
  const menuOverlay = document.querySelector('.menu-overlay');
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function(e) {
      // Only close if clicking the overlay itself, not the links
      if (e.target === menuOverlay) {
        e.preventDefault();
        e.stopPropagation();
        window.toggleMenu(e);
        return false;
      }
    });
  }
  
  // Close menu when clicking menu links
  const menuLinks = document.querySelectorAll('.menu-links a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Close menu but allow navigation
      window.handleMenuLink(e);
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupThemeButton();
    setupMenuButton();
  });
} else {
  // DOM is already loaded
  initializeTheme();
  setupThemeButton();
  setupMenuButton();
}

// Also initialize the PortfolioApp for event listeners (optional, for redundancy)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.portfolioApp) {
      window.portfolioApp = new PortfolioApp();
      window.portfolioApp.init();
    }
  });
} else {
  if (!window.portfolioApp) {
    window.portfolioApp = new PortfolioApp();
    window.portfolioApp.init();
  }
}
