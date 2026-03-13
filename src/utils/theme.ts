const THEME_KEY = 'theme';

export type Theme = 'light' | 'dark';

export function getStoredTheme(): Theme | null {
  const value = localStorage.getItem(THEME_KEY);

  if (value === 'light' || value === 'dark') {
    return value;
  }

  return null;
}

export function getPreferredTheme(): Theme {
  const storedTheme = getStoredTheme();

  if (storedTheme) {
    return storedTheme;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  localStorage.setItem(THEME_KEY, theme);
}