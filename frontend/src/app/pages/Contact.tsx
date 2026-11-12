import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import React from 'react';
import { PostAPI } from '../../api/Client';
import { Seo } from '../components/Seo';

export function Contact() {
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    guests: '',
    firstName: '',
    lastName: '',
    email: '',
    comment: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await PostAPI('/api/contact', formData);
      setSubmitted(true);
      setFormData({
        eventType: '',
        eventDate: '',
        guests: '',
        firstName: '',
        lastName: '',
        email: '',
        comment: '',
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Impossible d\'envoyer votre demande. Vérifiez que le serveur est démarré et réessayez.',
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="Contact"
        description="Contactez La Cuisine de Fred, traiteur et chef à domicile à Chartres : demandez un devis pour votre mariage, anniversaire ou repas d'entreprise en Eure-et-Loir."
      />
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--dark-grey)] to-[var(--burgundy)]">
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-7xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Contact
          </h1>
          <p className="text-2xl text-gray-200">
            Parlons de votre projet
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Demander un Devis
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
              Remplissez ce formulaire avec les détails de votre événement.
              Je vous répondrai dans les plus brefs délais.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Event Type */}
              <div>
                <label htmlFor="eventType" className="block mb-2 text-foreground">
                  Nature de l'événement *
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-[var(--burgundy)] transition-all"
                >
                  <option value="">Sélectionnez le type d'événement</option>
                  <option value="mariage">Mariage</option>
                  <option value="anniversaire">Anniversaire</option>
                  <option value="bapteme">Baptême</option>
                  <option value="entreprise">Événement d'entreprise</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              {/* Event Date */}
              <div>
                <label htmlFor="eventDate" className="block mb-2 text-foreground">
                  Date de la prestation *
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-[var(--burgundy)] transition-all"
                />
              </div>

              {/* Number of Guests */}
              <div>
                <label htmlFor="guests" className="block mb-2 text-foreground">
                  Nombre de couverts *
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="Ex: 50"
                  min="1"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-[var(--burgundy)] transition-all"
                />
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-foreground">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-[var(--burgundy)] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block mb-2 text-foreground">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-[var(--burgundy)] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-foreground">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-[var(--burgundy)] transition-all"
                />
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="comment" className="block mb-2 text-foreground">
                  Commentaire
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Décrivez votre événement, vos préférences culinaires, allergies éventuelles..."
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-[var(--burgundy)] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitted || loading}
                className={`w-full py-4 rounded-full transition-all flex items-center justify-center gap-2 text-lg text-white ${submitted
                  ? 'bg-green-600'
                  : 'bg-[var(--burgundy)] hover:bg-[#6b0f2a]'
                  }`}
              >
                {submitted ? (
                  <>
                    <Check className="animate-bounce" size={20} />
                    Demande envoyée !
                  </>
                ) : (
                  <>
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Send size={20} />
                    )}
                    Envoyer ma demande
                  </>
                )}
              </button>

              {error && (
                <p className="text-center text-red-600 text-sm">
                  {error}
                </p>
              )}

              {submitted && (
                <p className="text-center text-green-600 text-md">
                  Merci pour votre demande ! Je vous répondrai très rapidement.
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-muted rounded-2xl p-8 mb-8">
              <h3 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Informations de Contact
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--burgundy)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[var(--burgundy)]" size={20} />
                  </div>
                  <div>
                    <div className="font-medium mb-1 text-lg">Téléphone</div>
                    <a
                      href="tel:0612345678"
                      className="text-muted-foreground hover:text-[var(--burgundy)] transition-colors text-lg"
                    >
                      06 12 34 56 78
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--burgundy)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[var(--burgundy)]" size={20} />
                  </div>
                  <div>
                    <div className="font-medium mb-1 text-lg">Email</div>
                    <a
                      href="mailto:contact@lacuisinedefred.fr"
                      className="text-muted-foreground hover:text-[var(--burgundy)] transition-colors text-lg"
                    >
                      contact@lacuisinedefred.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--burgundy)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[var(--burgundy)]" size={20} />
                  </div>
                  <div>
                    <div className="font-medium mb-1 text-lg">Zone d'intervention</div>
                    <p className="text-muted-foreground text-lg">
                      Chartres et tout le département<br />
                      de l'Eure-et-Loir (28)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--burgundy)] text-white rounded-2xl p-8">
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Horaires de Contact
              </h3>
              <p className="text-white/90 leading-relaxed mb-4 text-lg">
                Du lundi au samedi<br />
                9h00 - 19h00
              </p>
              <p className="text-sm text-white/80">
                Je réponds généralement dans les 24 heures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Check({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}