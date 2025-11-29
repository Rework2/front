// Theme configuration for styled-components
export const theme = {
  colors: {
    primary: '#2A5EE4',
    primaryLight: '#5F8EF8',
    primaryLighter: '#E9F1FF',
    backgroundLight: '#F8FBFF',
    text: '#0F172A',
    textLight: 'rgba(15, 23, 42, 0.7)',
    textLighter: 'rgba(15, 23, 42, 0.6)',
    textLightest: 'rgba(15, 23, 42, 0.5)',
    white: '#ffffff',
    border: 'rgba(0, 0, 0, 0.1)',
    borderLight: '#E9F1FF',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif",
  transitions: {
    default: 'all 0.2s ease-in-out',
    fast: 'all 0.15s ease-in-out',
  }
};
