import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BlocksRenderer } from '../components/BlocksRenderer';
import { Seo } from '../components/Seo';
import { getLeChef, type LeChefContent } from '../../api/leChef';

const EMPTY_CONTENT: LeChefContent = {
  titre: '',
  description: [],
  image: null,
  philosophies: [],
};

export function LeChef() {
  const [content, setContent] = useState<LeChefContent>(EMPTY_CONTENT);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoadError(null);
        const data = await getLeChef();
        setContent(data);
      } catch (error) {
        setLoadError(
          error instanceof Error
            ? error.message
            : 'Impossible de charger la page Le Chef.',
        );
        setContent(EMPTY_CONTENT);
      }
    }

    load();
  }, []);

  const hasDescription = content.description.length > 0;
  const hasTitle = Boolean(content.titre);

  return (
    <div className="min-h-screen">
      <Seo
        title="Le Chef"
        description="Découvrez Fred, chef à domicile et traiteur à Chartres : parcours, cuisine maison et philosophie autour de produits frais en Eure-et-Loir."
        image={content.image ?? undefined}
      />
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--dark-grey)] to-[var(--burgundy)]">
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-7xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Le Chef
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {loadError && (
          <div className="text-center py-6 mb-10">
            <p className="text-destructive text-lg">{loadError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          <div className="lg:sticky lg:top-[90px]">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-muted aspect-[4/5] flex items-center justify-center">
              {content.image ? (
                <ImageWithFallback
                  src={content.image}
                  alt={hasTitle ? content.titre : 'Le Chef'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-muted-foreground text-lg px-6 text-center">
                  Photo à venir
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-5xl md:text-6xl mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {hasTitle ? content.titre : 'Contenu à venir'}
            </h2>
            {hasDescription ? (
              <BlocksRenderer content={content.description} headingOffset={1} />
            ) : (
              <p className="text-xl text-muted-foreground leading-relaxed">
                La présentation du chef sera bientôt disponible.
              </p>
            )}
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-muted rounded-2xl p-12 md:p-16">
          <h2 className="text-5xl md:text-6xl mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
            Ma Philosophie
          </h2>

          {content.philosophies.length === 0 ? (
            <p className="text-muted-foreground text-lg">
              Les points de philosophie seront ajoutés prochainement.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {content.philosophies.map((item, index) => (
                <div key={item.id ?? `${item.titre}-${index}`}>
                  <div className="w-16 h-16 bg-[var(--burgundy)] rounded-full flex items-center justify-center mb-6">
                    <span className="text-3xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.titre}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                    {item.description || ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-block bg-[var(--burgundy)] text-white px-10 py-5 rounded-full hover:bg-[#6b0f2a] transition-colors text-xl"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </div>
  );
}
