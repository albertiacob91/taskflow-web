import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="text-lg font-semibold text-slate-900 hover:text-blue-600"
        >
          TaskFlow
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link to="/" className="hover:text-blue-600">
            Dashboard
          </Link>

          <a
            href="https://github.com/albertiacob91"
            target="_blank"
            className="hover:text-blue-600"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}