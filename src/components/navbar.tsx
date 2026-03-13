import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applyTheme, getPreferredTheme, type Theme } from '../utils/theme';
import { removeAccessToken } from '../utils/auth';

export function Navbar() {
  const [theme, setTheme] = useState<Theme>('light');
  const navigate = useNavigate();

  useEffect(() => {
    setTheme(getPreferredTheme());
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const handleLogout = () => {
    removeAccessToken();
    navigate('/login', { replace: true });
  };

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="text-lg font-semibold text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
        >
          TaskFlow
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Dashboard
          </Link>

          <a
            href="https://github.com/albertiacob91"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            GitHub
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-red-500 bg-white px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white dark:border-red-400 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}