import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Prestations() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Toutes les prestations' },
    { id: 'mariages', label: 'Mariages' },
    { id: 'evenements-prives', label: 'Événements privés' },
    { id: 'entreprise', label: 'Repas d\'entreprise' },
    { id: 'saisonniers', label: 'Produits saisonniers' },
  ];

  const prestations = [
    {
      category: 'mariages',
      title: 'Banquet de mariage élégant',
      image: 'https://images.unsplash.com/photo-1758810742443-b82f48355828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2F0ZXJpbmclMjBlbGVnYW50JTIwdGFibGV8ZW58MXx8fHwxNzczNTE4ODU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'saisonniers',
      title: 'Saumon mariné citron vert et gingembre',
      image: 'https://images.unsplash.com/photo-1771995356656-3a5e975318e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBkaXNoJTIwZ291cm1ldCUyMHBsYXRlZHxlbnwxfHx8fDE3NzM1MTg4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'saisonniers',
      title: 'Foie gras artisanal au Banyuls',
      image: 'https://images.unsplash.com/photo-1758972574371-57cf8c42bae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2llJTIwZ3JhcyUyMGdvdXJtZXQlMjBmcmVuY2h8ZW58MXx8fHwxNzczNTE4ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'evenements-prives',
      title: 'Plat raffiné pour événement privé',
      image: 'https://images.unsplash.com/photo-1625225977832-7de9c77a6048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBtYWluJTIwY291cnNlJTIwcGxhdGVkfGVufDF8fHx8MTc3MzUxODg1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'mariages',
      title: 'Plateau de fromages affinés',
      image: 'https://images.unsplash.com/photo-1773245149417-5b7414fec7d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjBwbGF0dGVyJTIwZ291cm1ldCUyMGZyZW5jaHxlbnwxfHx8fDE3NzM1MTg4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'evenements-prives',
      title: 'Pâtisserie fine française',
      image: 'https://images.unsplash.com/photo-1605138693981-6c8a5ea87796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBkZXNzZXJ0JTIwcGFzdHJ5JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzM1MTg4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'entreprise',
      title: 'Buffet pour événement corporate',
      image: 'https://images.unsplash.com/photo-1751651054926-36ea440bb06c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGJ1ZmZldCUyMGVsZWdhbnQlMjBldmVudHxlbnwxfHx8fDE3NzM1MTg4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'mariages',
      title: 'Entrée gastronomique raffinée',
      image: 'https://images.unsplash.com/photo-1673705988622-18d05a5cf293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBnb3VybWV0JTIwZGlzaCUyMHBsYXRlZCUyMGVsZWdhbnR8ZW58MXx8fHwxNzczNTE4ODU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      category: 'entreprise',
      title: 'Table dressée pour séminaire',
      image: 'https://images.unsplash.com/photo-1709380757207-89e864f6b3c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc3MzQ4NTAxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const filteredPrestations = activeCategory === 'all'
    ? prestations
    : prestations.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
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
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 rounded-full transition-all ${
                  activeCategory === category.id
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrestations.map((prestation, index) => (
            <div
              key={index}
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
            </div>
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