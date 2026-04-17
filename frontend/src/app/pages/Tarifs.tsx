import { Link } from 'react-router';
import { Check } from 'lucide-react';

export function Tarifs() {
  const formulas = [
    {
      name: 'Formule Basique',
      description: 'Idéale pour les événements intimes',
      price: 'À partir de 45€',
      priceDetail: 'par personne',
      items: [
        'Entrée au choix',
        'Plat principal',
        'Dessert gourmand',
        'Pain artisanal',
        'Service et vaisselle inclus',
      ],
      highlighted: false,
    },
    {
      name: 'Formule Complète',
      description: 'Notre formule la plus demandée',
      price: 'À partir de 75€',
      priceDetail: 'par personne',
      items: [
        'Apéritif et amuse-bouches',
        'Entrée gastronomique',
        'Plat principal raffiné',
        'Plateau de fromages affinés',
        'Dessert signature',
        'Vin sélectionné',
        'Service et vaisselle premium',
        'Personnalisation du menu',
      ],
      highlighted: true,
    },
    {
      name: 'Formule Prestige',
      description: 'Pour vos événements exceptionnels',
      price: 'Sur devis',
      priceDetail: 'personnalisé',
      items: [
        'Menu entièrement sur mesure',
        'Produits d\'exception',
        'Accords mets et vins premium',
        'Service complet avec équipe',
        'Décoration de table',
        'Chef présent pendant le service',
        'Options végétariennes/végan',
        'Prestations additionnelles',
      ],
      highlighted: false,
    },
  ];

  const seasonalProducts = [
    {
      category: 'Foie Gras Artisanal',
      items: [
        { name: 'Foie gras nature', price: '85€/kg' },
        { name: 'Foie gras au Banyuls', price: '90€/kg' },
        { name: 'Foie gras à l\'abricot', price: '90€/kg' },
      ],
    },
    {
      category: 'Spécialités Maison',
      items: [
        { name: 'Saumon mariné citron vert et gingembre', price: '12€/pers' },
        { name: 'Terrine de campagne', price: '8€/pers' },
        { name: 'Verrines gourmandes (lot de 6)', price: '18€' },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
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
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Nos Formules Traiteur
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Choisissez la formule qui correspond le mieux à votre événement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {formulas.map((formula, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                formula.highlighted
                  ? 'bg-[var(--burgundy)] text-white shadow-xl scale-105 md:scale-105'
                  : 'bg-white shadow-md hover:shadow-lg'
              }`}
            >
              <div className={`p-8 ${formula.highlighted ? 'pb-6' : ''}`}>
                {formula.highlighted && (
                  <div className="text-center mb-4">
                    <span className="bg-white/20 text-white text-sm px-4 py-1.5 rounded-full">
                      Plus Populaire
                    </span>
                  </div>
                )}
                
                <h3
                  className={`text-3xl mb-2 ${formula.highlighted ? 'text-white' : ''}`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {formula.name}
                </h3>
                <p className={`text-sm mb-6 ${formula.highlighted ? 'text-white/90' : 'text-muted-foreground'}`}>
                  {formula.description}
                </p>

                <div className="mb-8">
                  <div className={`text-4xl mb-1 ${formula.highlighted ? 'text-white' : 'text-[var(--burgundy)]'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                    {formula.price}
                  </div>
                  <div className={`text-sm ${formula.highlighted ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {formula.priceDetail}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {formula.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <Check
                        size={20}
                        className={`flex-shrink-0 mt-0.5 ${
                          formula.highlighted ? 'text-white' : 'text-[var(--burgundy)]'
                        }`}
                      />
                      <span className={`text-sm ${formula.highlighted ? 'text-white' : 'text-foreground'}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`block w-full text-center py-3 rounded-full transition-colors ${
                    formula.highlighted
                      ? 'bg-white text-[var(--burgundy)] hover:bg-gray-100'
                      : 'bg-[var(--burgundy)] text-white hover:bg-[#6b0f2a]'
                  }`}
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Important Note */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg max-w-4xl mx-auto">
          <p className="text-amber-900 leading-relaxed text-lg">
            <strong>Important :</strong> Tous nos plats sont préparés avec des produits frais et de saison. 
            Les tarifs peuvent varier en fonction des ingrédients sélectionnés.
          </p>
        </div>
      </section>

      {/* Seasonal Products */}
      <section className="bg-muted py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Produits Saisonniers
            </h2>
            <p className="text-xl text-muted-foreground">
              Disponibles en fonction de la saison et sur commande
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {seasonalProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  {product.category}
                </h3>
                <ul className="space-y-4">
                  {product.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex justify-between items-center pb-4 border-b border-border last:border-0"
                    >
                      <span className="text-foreground text-lg">{item.name}</span>
                      <span className="text-[var(--burgundy)] text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
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
      </section>
    </div>
  );
}