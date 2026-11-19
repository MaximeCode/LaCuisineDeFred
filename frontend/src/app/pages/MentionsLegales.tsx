import { Link } from 'react-router';
import { Seo } from '../components/Seo';
import { useDonneesLegales } from '../context/DonneesLegalesContext';
import {
  directeurPublication,
  formatAdresseComplete,
  formatUpdatedAtFr,
} from '../../api/donneesLegales';

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-2xl md:text-3xl text-[var(--burgundy)] mb-4"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-foreground/80 leading-relaxed text-base">{children}</div>
    </section>
  );
}

function Value({ value, fallback = '—' }: { value: string; fallback?: string }) {
  return <>{value.trim() ? value : fallback}</>;
}

export function MentionsLegales() {
  const legales = useDonneesLegales();
  const { personnelles, professionnelles, updatedAt } = legales;
  const directeur = directeurPublication(legales);
  const adresse = formatAdresseComplete(legales);
  const updatedLabel = formatUpdatedAtFr(updatedAt);

  return (
    <div className="min-h-screen">
      <Seo
        title="Mentions légales"
        description="Mentions légales de La Cuisine de Fred, traiteur à Chartres : éditeur, hébergeur, propriété intellectuelle et responsabilités du site."
      />
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--dark-grey)] to-[var(--burgundy)]">
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-7xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Mentions légales
          </h1>
          <p className="text-2xl text-gray-200">
            Informations légales relatives au site La Cuisine de Fred
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-muted-foreground text-sm mb-10">
          Dernière mise à jour : <Value value={updatedLabel} fallback="—" />
        </p>

        <LegalSection title="1. Éditeur du site">
          <p>Le présent site internet est édité par&nbsp;:</p>
          <ul className="list-none space-y-1 border-l-2 border-[var(--burgundy)] pl-4 my-4">
            <li>
              <strong>Dénomination :</strong>{' '}
              <Value value={professionnelles.denomination} />
            </li>
            <li>
              <strong>Forme juridique :</strong>{' '}
              <Value value={professionnelles.formeJuridique} />
            </li>
            <li>
              <strong>Siège / adresse :</strong> <Value value={adresse} />
            </li>
            <li>
              <strong>SIRET :</strong> <Value value={professionnelles.siret} />
            </li>
            <li>
              <strong>SIREN :</strong> <Value value={professionnelles.siren} />
            </li>
            <li>
              <strong>Code APE / NAF :</strong> <Value value={professionnelles.codeApe} />
            </li>
            <li>
              <strong>N° TVA intracommunautaire :</strong>{' '}
              <Value value={professionnelles.tva} />
            </li>
            <li>
              <strong>Téléphone :</strong> <Value value={personnelles.telephone} />
            </li>
            <li>
              <strong>Email :</strong> <Value value={personnelles.email} />
            </li>
          </ul>
          <p>
            L&apos;activité présentée sur ce site concerne un service de traiteur / chef à domicile
            pour des événements privés et professionnels, notamment autour de Chartres et en
            Eure-et-Loir.
          </p>
        </LegalSection>

        <LegalSection title="2. Directeur de la publication">
          <p>
            Le directeur de la publication est <strong><Value value={directeur} /></strong>, en
            qualité de{' '}
            <strong>
              <Value value={professionnelles.qualiteDirecteur} />
            </strong>
            .
          </p>
        </LegalSection>

        <LegalSection title="3. Conception et réalisation">
          <p>Le site a été conçu et développé par&nbsp;:</p>
          <ul className="list-none space-y-1 border-l-2 border-[var(--burgundy)] pl-4 my-4">
            <li>
              <strong>Nom :</strong>{' '}
              <a
                href="https://my-portfolio-maxime-baude.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--burgundy)] hover:underline"
              >
                Maxime BAUDE
              </a>
            </li>
            <li>
              <strong>Portfolio :</strong>{' '}
              <a
                href="https://my-portfolio-maxime-baude.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--burgundy)] hover:underline break-all"
              >
                https://my-portfolio-maxime-baude.vercel.app/
              </a>
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Hébergement">
          <p>Le site est hébergé par&nbsp;:</p>
          <ul className="list-none space-y-1 border-l-2 border-[var(--burgundy)] pl-4 my-4">
            <li>
              <strong>Raison sociale :</strong> OVH SAS
            </li>
            <li>
              <strong>Siège social :</strong> 2, rue Kellermann, 59100 Roubaix, France
            </li>
            <li>
              <strong>RCS / identification :</strong> 424 761 419 00045
            </li>
            <li>
              <strong>Téléphone :</strong> +33 9 72 10 00 09
            </li>
            <li>
              <strong>Site :</strong> https://www.ovh.com
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Propriété intellectuelle">
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, photographies, logos,
            éléments graphiques, structure, charte visuelle), sauf mention contraire, est la
            propriété de{' '}
            <Value value={professionnelles.denomination} fallback="l'éditeur" /> ou fait
            l&apos;objet d&apos;une autorisation d&apos;utilisation.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou
            partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
            interdite sans autorisation écrite préalable de l&apos;éditeur.
          </p>
          <p>
            Les photographies de plats, événements ou personnes publiées sur le site le sont dans
            le respect du droit à l&apos;image. Pour toute demande de retrait, contactez-nous à
            l&apos;adresse indiquée ci-dessus.
          </p>
        </LegalSection>

        <LegalSection title="6. Données personnelles">
          <p>
            Les traitements de données personnelles mis en œuvre via ce site sont décrits dans
            notre{' '}
            <Link
              to="/politique-de-confidentialite"
              className="text-[var(--burgundy)] hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="7. Limitation de responsabilité">
          <p>
            L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
            informations diffusées sur ce site (présentation des prestations, formules, produits
            saisonniers, etc.). Il ne saurait toutefois garantir l&apos;absence d&apos;erreurs,
            d&apos;omissions ou de retards de mise à jour, notamment concernant les tarifs et
            disponibilités, qui peuvent varier selon la saison et les demandes.
          </p>
          <p>
            Le site peut contenir des liens vers des sites tiers. L&apos;éditeur n&apos;exerce
            aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou
            à leurs pratiques.
          </p>
        </LegalSection>

        <LegalSection title="8. Droit applicable">
          <p>
            Le présent site est soumis au droit français. En cas de litige, et à défaut d&apos;accord
            amiable, les tribunaux français seront seuls compétents.
          </p>
        </LegalSection>
      </section>
    </div>
  );
}
