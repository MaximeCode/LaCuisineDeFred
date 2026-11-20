import { Link } from 'react-router';
import { Seo } from '../components/Seo';

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-8 md:py-16">
      <Seo
        title="Page introuvable"
        description="La page demandée est introuvable sur le site de La Cuisine de Fred, traiteur à Chartres."
        noindex
      />
      <div className="max-w-2xl text-center">
        <p
          className="text-8xl md:text-9xl text-[var(--burgundy)] mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          404
        </p>
        <h1
          className="text-4xl md:text-5xl mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Page introuvable
        </h1>
        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
          Cette page n&apos;existe pas ou a été déplacée. Revenez à l&apos;accueil
          pour découvrir les prestations de La Cuisine de Fred, traiteur à Chartres.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-block bg-[var(--burgundy)] text-white px-10 py-4 rounded-full hover:bg-[#6b0f2a] transition-colors text-lg"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            to="/contact"
            className="inline-block border border-[var(--burgundy)] text-[var(--burgundy)] px-10 py-4 rounded-full hover:bg-[var(--burgundy)]/5 transition-colors text-lg"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  );
}
