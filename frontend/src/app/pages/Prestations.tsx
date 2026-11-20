import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { CalendarDays, Leaf } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Seo } from '../components/Seo';
import { getPrestations, type Prestation } from '../../api/prestations';
import {
  formatProduitAmount,
  getProduits,
  type Produit,
} from '../../api/produits';
import type { Category } from '../../api/categories';

type ContentView = 'prestations' | 'produits';

function categoriesFromItems(
  items: { category?: Category }[],
  allLabel: string,
): { id: number | 'all'; label: string }[] {
  const map = new Map<number, string>();
  for (const item of items) {
    if (item.category?.id != null && item.category.label) {
      map.set(item.category.id, item.category.label);
    }
  }

  const cats = Array.from(map.entries())
    .map(([id, label]) => ({ id, label }))
    .sort((a, b) => a.label.localeCompare(b.label, 'fr', { sensitivity: 'base' }));

  return [{ id: 'all', label: allLabel }, ...cats];
}

export function Prestations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialView: ContentView =
    searchParams.get('view') === 'produits' ? 'produits' : 'prestations';

  const [activeView, setActiveView] = useState<ContentView>(initialView);
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');

  const [prestations, setPrestations] = useState<Prestation[]>([]);
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [produitsError, setProduitsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        setPrestations(await getPrestations());
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les prestations.',
        );
      }
    }

    async function loadProduits() {
      try {
        setProduitsError(null);
        setProduits(await getProduits());
      } catch (error) {
        setProduitsError(
          error instanceof Error
            ? error.message
            : 'Impossible de charger les produits saisonniers.',
        );
      }
    }

    loadData();
    loadProduits();
  }, []);

  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'produits' && activeView !== 'produits') {
      setActiveView('produits');
      setActiveCategory('all');
    }
  }, [searchParams, activeView]);

  const changeView = (view: ContentView) => {
    setActiveView(view);
    setActiveCategory('all');
    if (view === 'produits') {
      setSearchParams({ view: 'produits' }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const sortedPrestations = useMemo(
    () =>
      [...prestations].sort((a, b) => {
        const categoryCompare = (a.category?.label ?? '').localeCompare(
          b.category?.label ?? '',
          'fr',
          { sensitivity: 'base' },
        );
        if (categoryCompare !== 0) return categoryCompare;
        return a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' });
      }),
    [prestations],
  );

  const sortedProduits = useMemo(
    () =>
      [...produits].sort((a, b) => {
        const categoryCompare = (a.category?.label ?? '').localeCompare(
          b.category?.label ?? '',
          'fr',
          { sensitivity: 'base' },
        );
        if (categoryCompare !== 0) return categoryCompare;
        return a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' });
      }),
    [produits],
  );

  const filterCategories =
    activeView === 'prestations'
      ? categoriesFromItems(sortedPrestations, 'Toutes les prestations')
      : categoriesFromItems(sortedProduits, 'Tous les produits');

  const filteredPrestations =
    activeCategory === 'all'
      ? sortedPrestations
      : sortedPrestations.filter((p) => p.category?.id === activeCategory);

  const filteredProduits =
    activeCategory === 'all'
      ? sortedProduits
      : sortedProduits.filter((p) => p.category?.id === activeCategory);

  const seoDescription =
    activeView === 'prestations'
      ? "Portfolio des prestations de La Cuisine de Fred, traiteur à Chartres : créations culinaires pour mariages, anniversaires et repas d'entreprise en Eure-et-Loir."
      : 'Produits saisonniers de La Cuisine de Fred à Chartres : sélection artisanale selon les récoltes, disponible sur commande en Eure-et-Loir.';

  return (
    <div className="min-h-screen">
      <Seo
        title={activeView === 'prestations' ? 'Prestations' : 'Produits saisonniers'}
        description={seoDescription}
      />

      <section className="relative h-[30vh] md:h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--dark-grey)] to-[var(--burgundy)]">
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Prestations
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Mon portfolio de créations culinaires
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-border sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div
            className="flex w-fit mx-auto rounded-full bg-muted p-1 mb-3"
            role="tablist"
            aria-label="Choisir le type de contenu"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'prestations'}
              onClick={() => changeView('prestations')}
              className={`px-5 py-2 rounded-full transition-all text-lg ${activeView === 'prestations'
                ? 'bg-white text-[var(--burgundy)] shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Prestations
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'produits'}
              onClick={() => changeView('produits')}
              className={`px-5 py-2 rounded-full transition-all text-lg ${activeView === 'produits'
                ? 'bg-white text-[var(--burgundy)] shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Produits saisonniers
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center" aria-label="Filtrer par catégorie">
            {filterCategories.map((category) => (
              <button
                type="button"
                key={String(category.id)}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-1.5 rounded-full transition-all ${activeCategory === category.id
                  ? 'bg-[var(--burgundy)] text-white'
                  : 'text-muted-foreground hover:bg-[var(--burgundy)]/10 hover:text-foreground'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[var(--burgundy)] mb-3">
              {activeView === 'prestations' ? <CalendarDays size={18} /> : <Leaf size={18} />}
              <span className="text-sm uppercase tracking-[0.18em]">
                {activeView === 'prestations' ? 'Sur mesure' : 'Au rythme des saisons'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
              {activeView === 'prestations' ? 'Vos événements' : 'Produits saisonniers'}
            </h2>
          </div>
          <p className="md:max-w-md text-muted-foreground leading-relaxed">
            {activeView === 'prestations'
              ? 'Des formats pensés pour chaque occasion, du repas intime à la grande réception.'
              : 'Une sélection artisanale qui évolue selon les récoltes, les arrivages et l’inspiration du chef.'}
          </p>
        </div>

        {activeView === 'prestations' && loadError && (
          <div className="text-center py-10 mb-8">
            <p className="text-destructive text-lg">{loadError}</p>
          </div>
        )}

        {activeView === 'produits' && produitsError && (
          <div className="text-center py-10 mb-8">
            <p className="text-destructive text-lg">{produitsError}</p>
          </div>
        )}

        {activeView === 'prestations' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrestations.map((prestation, index) => (
                <Link
                  to={`/prestation/${prestation.documentId}`}
                  key={prestation.documentId || index}
                  className="group"
                  style={{
                    animation: 'fadeIn 0.5s ease-in-out',
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full">
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

            {!loadError && filteredPrestations.length === 0 && (
              <div className="text-center py-8 md:py-16">
                <p className="text-muted-foreground text-xl">
                  Aucune prestation disponible dans cette catégorie pour le moment.
                </p>
              </div>
            )}
          </>
        )}

        {activeView === 'produits' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProduits.map((produit, index) => (
                <Link
                  to={`/produit/${produit.documentId}`}
                  key={produit.documentId || index}
                  className="group"
                  style={{
                    animation: 'fadeIn 0.5s ease-in-out',
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                    <div className="aspect-square overflow-hidden relative">
                      <ImageWithFallback
                        src={produit.image}
                        alt={produit.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3
                        className="text-lg uppercase tracking-wide"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {produit.title}
                      </h3>
                      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-2 text-[var(--burgundy)] min-w-0">
                          <CalendarDays size={15} className="flex-shrink-0" />
                          <span className="truncate">{produit.saison || 'Selon disponibilité'}</span>
                        </div>
                        <span
                          className="font-medium text-foreground whitespace-nowrap"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {formatProduitAmount(produit.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {!produitsError && filteredProduits.length === 0 && (
              <div className="text-center py-8 md:py-16">
                <p className="text-muted-foreground text-xl">
                  Aucun produit disponible dans cette catégorie pour le moment.
                </p>
              </div>
            )}
          </>
        )}
      </section>

      <section className="bg-muted py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Un Projet en Tête ?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Je serais ravi de créer un menu personnalisé qui fera de votre événement
            un moment inoubliable.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[var(--burgundy)] text-white px-10 py-5 rounded-full hover:bg-[#6b0f2a] transition-colors text-xl"
          >
            Demander un devis
          </Link>
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
