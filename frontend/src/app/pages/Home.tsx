import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Award, Leaf, FileText } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getLatestPrestations, type Prestation } from '../../api/prestations';

export function Home() {
  const [prestations, setPrestations] = useState<Prestation[]>([]);
  const [prestationsError, setPrestationsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLatestPrestations() {
      try {
        setPrestationsError(null);
        const data = await getLatestPrestations(3);
        setPrestations(data);
      } catch (error) {
        setPrestationsError(
          error instanceof Error
            ? error.message
            : 'Impossible de charger les dernières prestations.',
        );
      }
    }

    loadLatestPrestations();
  }, []);

  const values = [
    {
      icon: FileText,
      title: 'Devis sur mesure',
      description: 'Chaque événement est unique. Recevez une proposition personnalisée adaptée à vos besoins et votre budget.',
    },
    {
      icon: Award,
      title: 'Produits faits maison',
      description: 'Tous nos plats sont préparés artisanalement avec passion et savoir-faire pour garantir une qualité exceptionnelle.',
    },
    {
      icon: Leaf,
      title: 'Produits frais',
      description: 'Nous sélectionnons rigoureusement des ingrédients frais et de saison auprès de producteurs locaux.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758810742443-b82f48355828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2F0ZXJpbmclMjBlbGVnYW50JTIwdGFibGV8ZW58MXx8fHwxNzczNTE4ODU0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Table élégante pour événement"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <h1 className="text-6xl md:text-8xl mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            La Cuisine de Fred
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-gray-100 leading-relaxed font-light">
            Une cuisine maison et conviviale pour vos événements
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[var(--burgundy)] text-white px-10 py-5 rounded-full hover:bg-[#6b0f2a] transition-colors text-xl"
          >
            Demander un devis
          </Link>
        </div>
      </section>

      {/* Latest Prestations */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Dernières Prestations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Découvrez quelques-unes de mes créations culinaires récentes.
          </p>
        </div>

        {prestationsError && (
          <div className="text-center py-10 mb-8">
            <p className="text-destructive text-lg">{prestationsError}</p>
          </div>
        )}

        {!prestationsError && prestations.length === 0 && (
          <div className="text-center py-10 mb-8">
            <p className="text-muted-foreground text-lg">
              Aucune prestation publiée pour le moment.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prestations.map((prestation, index) => (
            <Link
              to={`/prestation/${prestation.documentId}`}
              key={prestation.documentId}
              className="group cursor-pointer"
              style={{
                transform: index % 2 === 1 ? 'translateY(1.5rem)' : 'translateY(0)',
              }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={prestation.image}
                    alt={prestation.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
      </section>

      {/* Key Values */}
      <section className="bg-muted py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Mes Engagements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[var(--burgundy)]/10 rounded-full flex items-center justify-center mb-5">
                    <Icon className="text-[var(--burgundy)]" size={24} />
                  </div>
                  <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--dark-grey)] text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Prêt à organiser votre événement ?
          </h2>
          <p className="text-2xl text-gray-300 mb-10 leading-relaxed font-light">
            Contactez-moi pour recevoir un devis personnalisé.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[var(--burgundy)] text-white px-10 py-5 rounded-full hover:bg-[#6b0f2a] transition-colors text-xl"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>

      {/* Service Area */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-5xl md:text-6xl mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          Traiteur à Chartres et en Eure-et-Loir
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed text-center">
          Basé près de Chartres, je me déplace dans tout le département de l'Eure-et-Loir (28)
          pour vos événements privés et professionnels. Que ce soit pour un mariage, un anniversaire,
          ou un repas d'entreprise, je vous propose une cuisine gastronomique préparée sur place
          avec des produits frais et de saison.
        </p>
      </section>
    </div>
  );
}