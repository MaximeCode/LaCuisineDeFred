import { Link } from 'react-router';
import { Seo } from '../components/Seo';
import { useDonneesLegales } from '../context/DonneesLegalesContext';
import {
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

export function PolitiqueConfidentialite() {
  const legales = useDonneesLegales();
  const { personnelles, professionnelles, updatedAt } = legales;
  const adresse = formatAdresseComplete(legales);
  const updatedLabel = formatUpdatedAtFr(updatedAt);
  const email = personnelles.email;

  return (
    <div className="min-h-screen">
      <Seo
        title="Politique de confidentialité"
        description="Politique de confidentialité de La Cuisine de Fred à Chartres : données personnelles, formulaire de devis, cookies, droits RGPD et conservation."
      />
      <section className="relative h-[30vh] md:h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--dark-grey)] to-[var(--burgundy)]">
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Politique de confidentialité
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Protection des données personnelles — La Cuisine de Fred
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-8 md:py-16">
        <p className="text-muted-foreground text-sm mb-10">
          Dernière mise à jour : <Value value={updatedLabel} fallback="—" />
        </p>

        <LegalSection title="1. Responsable du traitement">
          <p>
            Le responsable du traitement des données personnelles collectées via le présent site
            est&nbsp;:
          </p>
          <ul className="list-none space-y-1 border-l-2 border-[var(--burgundy)] pl-4 my-4">
            <li>
              <strong>
                <Value value={professionnelles.denomination} />
              </strong>
              , <Value value={professionnelles.formeJuridique} />
            </li>
            <li>
              <Value value={adresse} />
            </li>
            <li>
              SIRET : <Value value={professionnelles.siret} />
            </li>
            <li>
              Email : <Value value={email} />
            </li>
            <li>
              Téléphone : <Value value={personnelles.telephone} />
            </li>
          </ul>
          <p>
            Pour toute question relative à vos données personnelles ou pour exercer vos droits,
            vous pouvez écrire à l&apos;adresse ci-dessus.
          </p>
        </LegalSection>

        <LegalSection title="2. Données collectées">
          <p>Selon votre utilisation du site, nous pouvons collecter&nbsp;:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Via le formulaire de contact / devis :</strong> prénom, nom, adresse email,
              type d&apos;événement, date souhaitée, nombre de couverts, et contenu du message.
            </li>
            <li>
              <strong>Données de navigation techniques :</strong> adresse IP, type de navigateur,
              pages consultées, horodatage — dans la mesure où elles sont générées automatiquement
              par l&apos;hébergement du site.
            </li>
            <li>
              <strong>Images et photographies :</strong> photographies de plats, d&apos;événements
              ou de personnes éventuellement publiées sur le site (portfolio, présentation), sous
              réserve des autorisations obtenues.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Finalités et bases légales">
          <p>Les données sont traitées pour les finalités suivantes&nbsp;:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Répondre aux demandes de devis et de contact</strong> adressées via le
              formulaire (intérêt légitime ; mesures précontractuelles à votre demande).
            </li>
            <li>
              <strong>Assurer le fonctionnement technique</strong> et la sécurité du site
              (intérêt légitime).
            </li>
            <li>
              <strong>Présenter l&apos;activité</strong> (prestations, formules, produits
              saisonniers, page Le Chef) et, le cas échéant, diffuser des images dans le respect
              du droit à l&apos;image et du consentement des personnes concernées.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Destinataires et sous-traitants">
          <p>
            Les données sont destinées aux personnes habilitées de{' '}
            <Value value={professionnelles.denomination} fallback="l'éditeur" />, dans la limite
            de leurs missions (réponse aux demandes, gestion du site).
          </p>
          <p>Elles peuvent être traitées pour notre compte par les prestataires suivants&nbsp;:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>OVH SAS</strong> — hébergement du site et de
              l&apos;infrastructure technique.
            </li>
            <li>
              <strong>Strapi</strong> — système de gestion de contenus (CMS) utilisé pour
              administrer les contenus du site.
            </li>
            <li>
              <strong>Nodemailer</strong> — envoi des messages issus
              du formulaire de contact.
            </li>
          </ul>
          <p>
            Aucune donnée n&apos;est vendue à des tiers. Aucun transfert hors de l&apos;Union
            européenne n&apos;est effectué volontairement dans le cadre de ce site, sauf le cas
            échéant via un prestataire tiers dont les conditions propres s&apos;appliquent alors.
          </p>
        </LegalSection>

        <LegalSection title="5. Durées de conservation">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Messages du formulaire de contact :</strong> conservés le temps nécessaire
              au traitement de la demande, puis archivés au maximum 3 ans à compter du dernier contact, sauf obligation légale contraire.
            </li>
            <li>
              <strong>Logs techniques :</strong> selon les durées pratiquées par l&apos;hébergeur,
              généralement limitées au strict nécessaire à la sécurité et au bon fonctionnement
              du service.
            </li>
            <li>
              <strong>Photographies :</strong> conservées et diffusées tant que l&apos;autorisation
              de droit à l&apos;image demeure valable, ou jusqu&apos;à exercice du droit de
              retrait.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="6. Droit à l'image">
          <p>
            Des photographies liées à l&apos;activité de traiteur / chef à domicile peuvent être
            publiées sur le site (plats, mises en scène, événements).
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Aucune image permettant d&apos;identifier clairement une personne n&apos;est
              diffusée sans autorisation préalable lorsque cela est requis.
            </li>
            <li>
              Pour les mineurs, l&apos;autorisation est recueillie auprès des représentants
              légaux.
            </li>
          </ul>
          <p>
            Pour demander le retrait d&apos;une image vous concernant, contactez-nous à{' '}
            <strong>
              <Value value={email} />
            </strong>
            .
          </p>
        </LegalSection>

        <LegalSection title="7. Cookies">
          <p>
            À la date de mise à jour de la présente politique, le site n&apos;utilise pas de
            cookies publicitaires ni d&apos;outils d&apos;analyse d&apos;audience déposant des
            traceurs non essentiels.
          </p>
          <p>
            Seuls des éléments techniques strictement nécessaires au fonctionnement du site
            peuvent être utilisés. Si des cookies non essentiels venaient à être déployés, un
            dispositif d&apos;information et de consentement conforme aux recommandations de la
            CNIL serait mis en place.
          </p>
        </LegalSection>

        <LegalSection title="8. Vos droits">
          <p>
            Conformément au Règlement général sur la protection des données (RGPD) et à la loi
            Informatique et Libertés, vous disposez des droits suivants&nbsp;:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>droit d&apos;accès</li>
            <li>droit de rectification</li>
            <li>droit à l&apos;effacement</li>
            <li>droit à la limitation du traitement</li>
            <li>droit d&apos;opposition</li>
            <li>droit à la portabilité (lorsque applicable)</li>
            <li>
              droit de retirer votre consentement à tout moment (lorsque le traitement est fondé
              sur celui-ci)
            </li>
          </ul>
          <p>
            Pour exercer ces droits, adressez votre demande à{' '}
            <strong>
              <Value value={email} />
            </strong>{' '}
            en précisant l&apos;objet de votre demande et en joignant un justificatif d&apos;identité
            si nécessaire. Nous nous engageons à y répondre dans un délai d&apos;un mois.
          </p>
          <p>
            Vous disposez également du droit d&apos;introduire une réclamation auprès de la{' '}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--burgundy)] hover:underline"
            >
              Commission nationale de l&apos;informatique et des libertés (CNIL)
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="9. Sécurité">
          <p>
            Des mesures raisonnables sont mises en œuvre pour protéger vos données (accès
            restreint aux personnes habilitées, hébergement sécurisé, communication via HTTPS).
            Aucun système n&apos;étant infaillible, en cas d&apos;incident affectant vos données,
            les démarches prévues par la réglementation seront appliquées.
          </p>
        </LegalSection>

        <LegalSection title="10. Modifications">
          <p>
            La présente politique peut être mise à jour pour refléter l&apos;évolution du site,
            des prestataires ou de la réglementation. La date de dernière mise à jour figure en
            tête de page.
          </p>
          <p>
            Pour les informations d&apos;identification de l&apos;éditeur, consultez également
            les{' '}
            <Link to="/mentions-legales" className="text-[var(--burgundy)] hover:underline">
              mentions légales
            </Link>
            .
          </p>
        </LegalSection>
      </section>
    </div>
  );
}
