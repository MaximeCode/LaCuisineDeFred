import { Link } from 'react-router';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useDonneesLegales } from '../context/DonneesLegalesContext';
import { formatAdresseComplete, telHref } from '../../api/donneesLegales';

const NAV_LINKS = [
  { to: '/prestations', label: 'Prestations' },
  { to: '/prestations?view=produits', label: 'Produits' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/le-chef', label: 'Le Chef' },
] as const;

export function Footer() {
  const legales = useDonneesLegales();
  const { telephone, email } = legales.personnelles;
  const adresse = formatAdresseComplete(legales);

  return (
    <footer className="bg-[var(--dark-grey)] text-white">
      <hr className="bg-gray-600 h-1" />
      <div className="max-w-7xl mx-auto px-6 py-4 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <p className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              La Cuisine de Fred
            </p>
            <p className="text-gray-300 leading-relaxed">
              Chef à domicile et service traiteur pour vos événements privés et professionnels.
            </p>
            <div className="mt-6 ml-10">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-[var(--burgundy)] text-white px-7 py-3 rounded-full hover:bg-[#6b0f2a] transition-colors"
              >
                Me contacter
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Contact
            </p>
            <div className="space-y-3">
              {telephone && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={18} className="text-[var(--burgundy)]" />
                  <a href={telHref(telephone)} className="hover:text-white transition-colors">
                    {telephone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={18} className="text-[var(--burgundy)]" />
                {email ? (
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                    {email}
                  </a>
                ) : (
                  <a
                    href="mailto:contact@lacuisinedefred-traiteur.fr"
                    className="hover:text-white transition-colors"
                  >
                    contact@lacuisinedefred-traiteur.fr
                  </a>
                )}
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={18} className="text-[var(--burgundy)]" />
                <span>{adresse || 'Chartres et Eure-et-Loir (28)'}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Navigation
            </p>
            <nav className="flex flex-col gap-3" aria-label="Navigation pied de page">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-300 hover:text-white transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>© 2026 La Cuisine de Fred. Tous droits réservés.</p>
            <p>
              Site réalisé par{' '}
              <a
                href="https://my-portfolio-maxime-baude.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                Maxime BAUDE
              </a>
            </p>
          </div>
          <img
            src="/logo_lacuisinedefred.webp"
            alt="La Cuisine de Fred"
            width={320}
            height={180}
            className="w-full max-w-[200px] h-auto rounded-md shadow-sm"
            decoding="async"
          />
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link
              to="/politique-de-confidentialite"
              className="hover:text-white transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
