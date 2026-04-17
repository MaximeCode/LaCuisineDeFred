import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/le-chef', label: 'Le Chef' },
    { path: '/prestations', label: 'Prestations' },
    { path: '/tarifs', label: 'Tarifs' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="text-2xl tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
              La Cuisine de Fred
            </span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Traiteur à Chartres
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors text-lg ${
                  isActive(item.path)
                    ? 'text-[var(--burgundy)]'
                    : 'text-foreground hover:text-[var(--burgundy)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-[var(--burgundy)] text-white px-7 py-3 rounded-full hover:bg-[#6b0f2a] transition-colors"
            >
              Demander un devis
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`transition-colors text-lg ${
                  isActive(item.path)
                    ? 'text-[var(--burgundy)]'
                    : 'text-foreground hover:text-[var(--burgundy)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[var(--burgundy)] text-white px-7 py-3 rounded-full hover:bg-[#6b0f2a] transition-colors text-center"
            >
              Demander un devis
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}