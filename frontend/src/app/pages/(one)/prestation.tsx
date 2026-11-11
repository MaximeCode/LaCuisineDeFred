import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getOnePrestation, type Prestation } from "../../../api/prestations";
import { BlocksRenderer } from "../../components/BlocksRenderer";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import React from "react";

const pageBackgroundStyle: React.CSSProperties = {
  backgroundColor: "#faf8f9",
  backgroundImage: [
    "linear-gradient(165deg, color-mix(in srgb, var(--burgundy) 18%, transparent) 0%, transparent 42%)",
    "linear-gradient(200deg, color-mix(in srgb, var(--burgundy) 10%, transparent) 0%, transparent 55%)",
    "linear-gradient(to bottom, color-mix(in srgb, var(--burgundy) 8%, transparent) 0%, transparent 70%)",
  ].join(", "),
};

function PrestationPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative" style={pageBackgroundStyle}>
      {children}
    </div>
  );
}

export function PrestationDetail() {
  const { documentId } = useParams<{ documentId: string }>();
  const [prestation, setPrestation] = useState<Prestation | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) {
      setLoadError("Prestation introuvable.");
      setLoading(false);
      return;
    }

    const id = documentId;

    async function loadData() {
      try {
        setLoading(true);
        setLoadError(null);
        const data = await getOnePrestation(id);
        setPrestation(data);
      } catch (error) {
        setPrestation(null);
        setLoadError(
          error instanceof Error
            ? error.message
            : "Impossible de charger cette prestation.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [documentId]);

  if (loading) {
    return (
      <PrestationPageShell>
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-muted-foreground text-xl">Chargement…</p>
        </div>
      </PrestationPageShell>
    );
  }

  if (loadError || !prestation) {
    return (
      <PrestationPageShell>
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6 px-6">
          <p className="text-destructive text-xl text-center">
            {loadError ?? "Prestation introuvable."}
          </p>
          <Link
            to="/prestations"
            className="text-[var(--burgundy)] hover:underline text-lg"
          >
            ← Retour aux prestations
          </Link>
        </div>
      </PrestationPageShell>
    );
  }

  return (
    <PrestationPageShell>
      {/* Hero Section */}
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--dark-grey)] to-[var(--burgundy)]">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 pt-8">
          <Link
            to="/prestations"
            className="inline-block text-white/90 mb-6 text-sm tracking-wide relative after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white/90 after:transition-all after:duration-200 hover:after:w-full"
          >
            ← Retour aux prestations
          </Link>
          <h1
            className="text-4xl md:text-6xl text-white drop-shadow-sm"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {prestation.title}
          </h1>
          {prestation.category && (
            <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white/95 tracking-wide shadow-sm border border-white/20 backdrop-blur-sm">
              {prestation.category.label}
            </span>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 pb-20">
        {prestation.image && (
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-12 -mt-20 relative z-20 ring-1 ring-black/5">
            <ImageWithFallback
              src={prestation.image}
              alt={prestation.title}
              className="w-full object-cover max-h-[400px]"
            />
          </div>
        )}

        <div className="rounded-2xl bg-white/90 backdrop-blur-sm px-6 py-10 md:px-10 md:py-12 shadow-sm ring-1 ring-[var(--burgundy)]/10">
          {prestation.details && prestation.details.length > 0 ? (
            <BlocksRenderer content={prestation.details} />
          ) : (
            <p className="text-muted-foreground text-lg text-center py-12">
              Le détail de cette prestation sera bientôt disponible.
            </p>
          )}
        </div>
      </section>

      <section className="py-16 border-t border-[var(--burgundy)]/10">
        <div
          className="max-w-7xl mx-auto px-6 py-12 rounded-2xl text-center"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--burgundy) 12%, white) 0%, color-mix(in srgb, var(--burgundy) 4%, transparent) 100%)",
          }}
        >
          <p className="text-xl text-foreground/80 mb-8">
            Un événement similaire en tête ? Parlons-en.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[var(--burgundy)] text-white px-10 py-4 rounded-full hover:bg-[#6b0f2a] transition-colors text-lg shadow-md"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </PrestationPageShell>
  );
}
