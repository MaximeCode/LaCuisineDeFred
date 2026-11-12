import { Link } from 'react-router';
import { Phone, Mail, MapPin, Star } from 'lucide-react';
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[var(--dark-grey)] text-white">
      <hr className="bg-gray-600 h-1" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              La Cuisine de Fred
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Chef à domicile et service traiteur pour vos événements privés et professionnels.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={18} className="text-[var(--burgundy)]" />
                <span>06 12 34 56 78</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={18} className="text-[var(--burgundy)]" />
                <span>contact@lacuisinedefred.fr</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={18} className="text-[var(--burgundy)]" />
                <span>Chartres et Eure-et-Loir (28)</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h4 className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Avis clients
            </h4>
            <div className="flex items-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} fill="var(--burgundy)" className="text-[var(--burgundy)]" />
              ))}
            </div>
            <p className="text-gray-300 mb-3">
              4.9/5 basé sur les avis Google
            </p>
            <a
              href="#"
              className="text-[var(--burgundy)] hover:underline"
            >
              Voir tous les avis
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 La Cuisine de Fred. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}