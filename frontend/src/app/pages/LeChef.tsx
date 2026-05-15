import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import React from 'react';

export function LeChef() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1512149519538-136d1b8c574a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHByb2Zlc3Npb25hbCUyMGtpdGNoZW58ZW58MXx8fHwxNzczNDU3ODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Chef en cuisine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-7xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Le Chef
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759521296047-89338c8e083d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwcG9ydHJhaXQlMjB1bmlmb3JtfGVufDF8fHx8MTc3MzUxODg1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fred, Chef à domicile"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div>
            <h2 className="text-5xl md:text-6xl mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              Bonjour, je suis Fred
            </h2>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
              <p>
                Passionné de cuisine depuis mon plus jeune âge, j'ai transformé cette passion 
                en métier il y a plus de 15 ans.
              </p>
              <p>
                Ma philosophie est simple : proposer une cuisine raffinée et authentique, 
                préparée avec des produits frais et de saison.
              </p>
              <p>
                Chaque événement est une nouvelle aventure culinaire. J'aime créer des menus 
                sur mesure qui reflètent vos goûts et l'esprit de votre célébration.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-muted rounded-2xl p-12 md:p-16">
          <h2 className="text-5xl md:text-6xl mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
            Ma Philosophie
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-[var(--burgundy)] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  1
                </span>
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Cuisine Maison
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Tous mes plats sont préparés artisanalement, sans produits industriels.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-[var(--burgundy)] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  2
                </span>
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Produits Frais
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Je sélectionne personnellement mes ingrédients auprès de producteurs locaux 
                et de fournisseurs de confiance.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-[var(--burgundy)] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  3
                </span>
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Événements Conviviaux
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Au-delà de la cuisine, je souhaite créer une atmosphère chaleureuse et 
                conviviale pour des moments inoubliables.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}