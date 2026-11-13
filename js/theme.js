/**
 * GrowGlobal – Theme Management Module (Dark / Light Mode)
 * Academic Course: 25CS208 – Web Technology
 * Implements smooth theme switching and LocalStorage persistence.
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'growglobal_theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  /**
   * Get the preferred or saved theme.
   * Defaults to light theme or system preference.
   */
  function getPreferredTheme() {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        return savedTheme;
      }
    } catch (e) {
      console.warn('LocalStorage unavailable for theme storage:', e);
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEME_DARK;
    }
    return THEME_LIGHT;
  }

  /**
   * Apply theme to <html> element and update toggle button states.
   * @param {string} theme - 'dark' or 'light'
   */
  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === THEME_DARK) {
      root.setAttribute('data-theme', THEME_DARK);
    } else {
      root.removeAttribute('data-theme');
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme in LocalStorage:', e);
    }

    updateThemeToggleIcons(theme);
  }

  /**
   * Update visual state of all theme toggle buttons on the page.
   * @param {string} theme
   */
  function updateThemeToggleIcons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      const isDark = theme === THEME_DARK;
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');

      // Update inner icon (Sun for Dark -> Light, Moon for Light -> Dark)
      btn.innerHTML = isDark
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
    });
  }

  /**
   * Toggle between light and dark theme.
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') === THEME_DARK ? THEME_DARK : THEME_LIGHT;
    const nextTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    applyTheme(nextTheme);
  }

  // Initial immediate application to avoid FOUC (Flash of Unstyled Content)
  const initialTheme = getPreferredTheme();
  if (initialTheme === THEME_DARK) {
    document.documentElement.setAttribute('data-theme', THEME_DARK);
  }

  // Setup event listeners after DOM is loaded
  document.addEventListener('DOMContentLoaded', function () {
    updateThemeToggleIcons(initialTheme);

    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });
  });

  // Export to window for global access
  window.GrowGlobalTheme = {
    toggleTheme,
    applyTheme,
    getPreferredTheme,
  };
})();
