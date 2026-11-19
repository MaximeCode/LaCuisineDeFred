import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Check } from 'lucide-react';
import { Seo } from '../components/Seo';
import {
  formatFormulePrice,
  getFormules,
  type Formule,
} from '../../api/formules';

export function Tarifs() {
  const [formules, setFormules] = useState<Formule[]>([]);
  const [formulesError, setFormulesError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFormules() {
      try {
        setFormulesError(null);
        const data = await getFormules();
        setFormules(data);
      } catch (error) {
        setFormulesError(
          error instanceof Error
            ? error.message
            : 'Impossible de charger les formules.',
        );
      }
    }

    loadFormules();
  }, []);

  return (
    <div className="min-h-screen">
      <Seo
        title="Tarifs"
        description="Formules traiteur de La Cuisine de Fred à Chartres : tarifs par personne, sur devis, pour mariages et événements en Eure-et-Loir."
      />
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--burgundy)] to-[var(--dark-grey)]">
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-7xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Tarifs
          </h1>
          <p className="text-2xl text-gray-200">
            Des formules adaptées à tous vos événements
          </p>
        </div>
      </section>

      {/* Formulas Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Nos Formules Traiteur
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Choisissez la formule qui correspond le mieux à votre événement.
          </p>
        </div>

        {formulesError && (
          <div className="text-center py-10 mb-8">
            <p className="text-destructive text-lg">{formulesError}</p>
          </div>
        )}

        {!formulesError && formules.length === 0 && (
          <div className="text-center py-10 mb-8">
            <p className="text-muted-foreground text-lg">
              Aucune formule publiée pour le moment.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {formules.map((formule) => {
            const highlighted = formule.populaire;
            const { label: priceLabel, detail: priceDetail } = formatFormulePrice(formule.prix);

            return (
              <div
                key={formule.documentId}
                className={`rounded-2xl overflow-hidden border-2 transition-colors duration-300 ${highlighted
                  ? 'bg-[var(--burgundy)] border-transparent text-white shadow-xl scale-105 md:scale-105 hover:border-white/40'
                  : 'bg-white shadow-md hover:border-[var(--burgundy)] hover:shadow-lg'
                  }`}
              >
                <div className={`p-8 ${highlighted ? 'pb-6' : ''}`}>
                  {highlighted && (
                    <div className="text-center mb-4">
                      <span className="bg-white/20 text-white text-sm px-4 py-1.5 rounded-full">
                        Plus Populaire
                      </span>
                    </div>
                  )}

                  <h3
                    className={`text-3xl mb-2 ${highlighted ? 'text-white' : ''}`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {formule.titre}
                  </h3>
                  <p className={`text-sm mb-6 ${highlighted ? 'text-white/90' : 'text-muted-foreground'}`}>
                    {formule.description}
                  </p>

                  <div className="mb-8">
                    <div
                      className={`text-4xl mb-1 ${highlighted ? 'text-white' : 'text-[var(--burgundy)]'}`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      À partir de {priceLabel}
                    </div>
                    <div className={`text-sm ${highlighted ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {priceDetail}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {formule.detailLines.map((item, itemIndex) => (
                      <li key={`${formule.documentId}-${itemIndex}`} className="flex items-start gap-3">
                        <Check
                          size={20}
                          className={`flex-shrink-0 mt-0.5 ${highlighted ? 'text-white' : 'text-[var(--burgundy)]'
                            }`}
                        />
                        <span className={`text-sm ${highlighted ? 'text-white' : 'text-foreground'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`block w-full text-center py-3 rounded-full transition-colors ${highlighted
                      ? 'bg-white text-[var(--burgundy)] hover:bg-gray-100'
                      : 'bg-[var(--burgundy)] text-white hover:bg-[#6b0f2a]'
                      }`}
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Note */}
        <div className="bg-muted border-l-4 border-[var(--burgundy)] p-6 rounded-lg max-w-4xl mx-auto">
          <p className="text-muted-foreground leading-relaxed text-lg">
            <strong className="text-foreground">À noter :</strong> Tous nos plats sont préparés avec des
            produits frais et de saison. Les tarifs peuvent varier en fonction des ingrédients
            sélectionnés.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Besoin d'un Devis Personnalisé ?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Contactez-moi pour discuter de vos besoins spécifiques et recevoir une proposition sur mesure.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[var(--burgundy)] text-white px-10 py-5 rounded-full hover:bg-[#6b0f2a] transition-colors text-xl"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </div>
  );
}
