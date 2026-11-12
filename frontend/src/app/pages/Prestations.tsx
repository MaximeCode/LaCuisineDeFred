import { useEffect, useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Seo } from '../components/Seo';
import { getPrestations, type Prestation } from '../../api/prestations';
import { getCategories, type Category } from '../../api/categories';
import { Link } from 'react-router';

export function Prestations() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [prestations, setPrestations] = useState<Prestation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const data = await getPrestations();
        // console.log(data);
        setPrestations(data);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        // console.log(categoriesData);
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les prestations.',
        );
      }
    }

    loadData();
  }, []);

  const sortedPrestations = [...prestations].sort((a, b) => {
    const categoryCompare = (a.category?.label ?? '').localeCompare(
      b.category?.label ?? '',
      'fr',
      { sensitivity: 'base' },
    );
    if (categoryCompare !== 0) return categoryCompare;
    return a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' });
  });

  const filteredPrestations = activeCategory === null
    ? sortedPrestations
    : sortedPrestations.filter((p) => p.category?.id === activeCategory);

  return (
    <div className="min-h-screen">
      <Seo
        title="Prestations"
        description="Portfolio des prestations de La Cuisine de Fred, traiteur à Chartres : créations culinaires pour mariages, anniversaires et repas d'entreprise en Eure-et-Loir."
      />
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--dark-grey)] to-[var(--burgundy)]">
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-7xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Prestations
          </h1>
          <p className="text-2xl text-gray-200">
            Mon portfolio de créations culinaires
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-border sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-2.5 rounded-full transition-all ${activeCategory === null
                ? 'bg-[var(--burgundy)] text-white shadow-md'
                : 'bg-muted text-foreground hover:bg-[var(--burgundy)]/10'
                }`}
            >
              Toutes les prestations</button>
            {categories.map((category: Category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 rounded-full transition-all ${activeCategory === category.id
                  ? 'bg-[var(--burgundy)] text-white shadow-md'
                  : 'bg-muted text-foreground hover:bg-[var(--burgundy)]/10'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Prestations Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {loadError && (
          <div className="text-center py-10 mb-8">
            <p className="text-destructive text-lg">{loadError}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrestations.map((prestation, index) => (
            <Link to={`/prestation/${prestation.documentId}`}
              key={prestation.id || index}
              className="group cursor-pointer"
              style={{
                animation: 'fadeIn 0.5s ease-in-out',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <div className="aspect-square overflow-hidden relative">
                  <ImageWithFallback
                    src={prestation.image}
                    alt={prestation.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                    {prestation.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPrestations.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-xl">
              Aucune prestation disponible dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Un Projet en Tête ?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Je serais ravi de créer un menu personnalisé qui fera de votre événement
            un moment inoubliable.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[var(--burgundy)] text-white px-10 py-5 rounded-full hover:bg-[#6b0f2a] transition-colors text-xl"
          >
            Demander un devis
          </a>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}