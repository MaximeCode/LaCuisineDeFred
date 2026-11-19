import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { CalendarDays, Leaf } from 'lucide-react';
import {
  formatProduitAmount,
  formatProduitUniteLabel,
  getOneProduit,
  type Produit,
} from '../../../api/produits';
import { BlocksRenderer } from '../../components/BlocksRenderer';
import { ImageGallery } from '../../components/ImageGallery';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Seo } from '../../components/Seo';
import React from 'react';

/** Libellés galerie Produit — isolés pour extension sans toucher le mapping. */
const PRODUIT_GALLERY_COPY = {
  eyebrow: "Dans l’assiette",
  title: "Le produit en images",
} as const;

const pageBackgroundStyle: React.CSSProperties = {
  backgroundColor: '#faf8f9',
  backgroundImage: [
    'linear-gradient(165deg, color-mix(in srgb, var(--burgundy) 18%, transparent) 0%, transparent 42%)',
    'linear-gradient(200deg, color-mix(in srgb, var(--burgundy) 10%, transparent) 0%, transparent 55%)',
    'linear-gradient(to bottom, color-mix(in srgb, var(--burgundy) 8%, transparent) 0%, transparent 70%)',
  ].join(', '),
};

function ProduitPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative" style={pageBackgroundStyle}>
      {children}
    </div>
  );
}

export function ProduitDetail() {
  const { documentId } = useParams<{ documentId: string }>();
  const [produit, setProduit] = useState<Produit | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) {
      setLoadError('Produit introuvable.');
      setLoading(false);
      return;
    }

    const id = documentId;

    async function loadData() {
      try {
        setLoading(true);
        setLoadError(null);
        const data = await getOneProduit(id);
        setProduit(data);
      } catch (error) {
        setProduit(null);
        setLoadError(
          error instanceof Error
            ? error.message
            : 'Impossible de charger ce produit.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [documentId]);

  if (loading) {
    return (
      <ProduitPageShell>
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-muted-foreground text-xl">Chargement…</p>
        </div>
      </ProduitPageShell>
    );
  }

  if (loadError || !produit) {
    return (
      <ProduitPageShell>
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6 px-6">
          <p className="text-destructive text-xl text-center">
            {loadError ?? 'Produit introuvable.'}
          </p>
          <Link
            to="/prestations?view=produits"
            className="text-[var(--burgundy)] hover:underline text-lg"
          >
            ← Retour aux produits saisonniers
          </Link>
        </div>
      </ProduitPageShell>
    );
  }

  const uniteLabel = formatProduitUniteLabel(produit.unite);
  const seoDescription = `Découvrez « ${produit.title} » par La Cuisine de Fred, traiteur et chef à domicile à Chartres (Eure-et-Loir).`;

  return (
    <ProduitPageShell>
      <Seo
        title={produit.title}
        description={seoDescription.slice(0, 160)}
        image={produit.image}
      />

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <Link
          to="/prestations?view=produits"
          className="inline-block text-foreground/80 mb-10 text-sm tracking-wide relative after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--burgundy)] after:transition-all after:duration-200 hover:text-[var(--burgundy)] hover:after:w-full"
        >
          ← Retour aux produits saisonniers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-white">
            <ImageWithFallback
              src={produit.image}
              alt={produit.title}
              className="w-full h-full object-cover aspect-[4/5] max-h-[640px]"
            />
          </div>

          <div className="rounded-2xl bg-white/95 backdrop-blur-sm px-6 py-8 md:px-8 md:py-10 shadow-sm ring-1 ring-[var(--burgundy)]/10">
            {produit.category && (
              <div className="flex items-center gap-2 text-[var(--burgundy)] mb-4">
                <Leaf size={16} />
                <span className="text-sm uppercase tracking-[0.18em] font-medium">
                  {produit.category.label}
                </span>
              </div>
            )}

            <h1
              className="text-3xl md:text-5xl uppercase tracking-wide mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {produit.title}
            </h1>

            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div className="flex items-center gap-2 text-[var(--burgundy)]">
                <CalendarDays size={18} />
                <span>{produit.saison || 'Selon disponibilité'}</span>
              </div>
              <div className="text-right">
                <div
                  className="text-3xl text-[var(--burgundy)]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {formatProduitAmount(produit.price)}
                </div>
                {uniteLabel && (
                  <div className="text-sm text-muted-foreground mt-0.5">{uniteLabel}</div>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-8 mb-8">
              {produit.details && produit.details.length > 0 ? (
                <BlocksRenderer content={produit.details} headingOffset={1} />
              ) : (
                <p className="text-muted-foreground text-lg">
                  Le détail de ce produit sera bientôt disponible.
                </p>
              )}
            </div>

            <div className="border-t border-border pt-8">
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto justify-center items-center bg-[var(--burgundy)] text-white px-10 py-4 rounded-full hover:bg-[#6b0f2a] transition-colors text-lg shadow-md"
              >
                Demander un devis
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Quantités et date de retrait à confirmer lors de la demande.
              </p>
            </div>
          </div>
        </div>

        <ImageGallery
          images={produit.gallery}
          eyebrow={PRODUIT_GALLERY_COPY.eyebrow}
          title={PRODUIT_GALLERY_COPY.title}
        />
      </section>
    </ProduitPageShell>
  );
}
