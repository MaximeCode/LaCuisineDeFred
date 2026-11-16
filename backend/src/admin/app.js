import './styles/donnees-legales.css';

const config = {
  locales: ['fr'],
  translations: {
    fr: {
      'content-manager.plugin.name': 'Gestionnaire de contenu',
      'cloud.plugin.name': 'Déploiement',
      Prestations: 'Prestations',
      User: 'Utilisateur',
      'search.placeholder': 'Rechercher',
      'app.components.UpsellBanner.intro.ended': 'Votre essai est terminé\u00a0: ',
      'app.components.UpsellBanner.text.ended':
        'Conservez l’accès aux fonctionnalités Growth en passant au plan payant.',
      'app.components.UpsellBanner.button.ended': 'Conserver le plan Growth',
      'content-manager.containers.list.table-headers.status': 'Statut',
      'content-manager.content-types.api::prestation.prestation.id': 'ID',
      'content-manager.content-types.api::prestation.prestation.Titre': 'Titre',
      'content-manager.content-types.api::prestation.prestation.image': 'Image',
      'content-manager.content-types.api::prestation.prestation.createdAt': 'Créé le',
      'content-manager.content-types.api::prestation.prestation.createdBy': 'Créé par',
      'content-type-builder.plugin.name': 'Constructeur de Type-Contenu',
      'content-type-builder.table.content.create-first-content-type.import-figma':
        'Importer depuis Figma',
      'widget.deploy-now.title': 'Déployer maintenant',
      'widget.deploy-now.description':
        'Déployez votre application sur le cloud pour la rendre disponible à tous.',
      'widget.deploy-now.button': 'Déployer',
      'widget.deploy-now.button.loading': 'Déploiement en cours...',
      'widget.deploy-now.button.success': 'Déploiement réussi',
      'widget.deploy-now.button.error': 'Erreur lors du déploiement',
      'widget.deploy-now.button.cancel': 'Annuler',
      'widget.deploy-now.button.retry': 'Réessayer',
      'list.asset.at.finished': 'Chargement terminé.',
      'global.more.actions': "Plus d'actions",
      'content-type-builder.search.placeholder': 'Rechercher',
      'api::prestation.prestation': 'Prestations',
      'api::donnees-legale.donnees-legale': 'Données légales',
      'content-manager.content-types.api::donnees-legale.donnees-legale.personnelles':
        'Personnelles',
      'content-manager.content-types.api::donnees-legale.donnees-legale.professionnelles':
        'Professionnelles',
      'content-manager.components.donnees-legales.personnelles.prenom': 'Prénom',
      'content-manager.components.donnees-legales.personnelles.nom': 'Nom',
      'content-manager.components.donnees-legales.personnelles.telephone': 'Téléphone',
      'content-manager.components.donnees-legales.personnelles.email': 'Email',
      'content-manager.components.donnees-legales.professionnelles.denomination':
        'Dénomination / raison sociale',
      'content-manager.components.donnees-legales.professionnelles.formeJuridique':
        'Forme juridique',
      'content-manager.components.donnees-legales.professionnelles.rue': 'Rue',
      'content-manager.components.donnees-legales.professionnelles.codePostal':
        'Code postal',
      'content-manager.components.donnees-legales.professionnelles.ville': 'Ville',
      'content-manager.components.donnees-legales.professionnelles.siret': 'SIRET',
      'content-manager.components.donnees-legales.professionnelles.siren': 'SIREN',
      'content-manager.components.donnees-legales.professionnelles.codeApe':
        'Code APE / NAF',
      'content-manager.components.donnees-legales.professionnelles.tva':
        'N° TVA intracommunautaire',
      'content-manager.components.donnees-legales.professionnelles.qualiteDirecteur':
        'Qualité / statut (directeur de publication)',
      'plugin::users-permissions.user': 'Utilisateur',
      'chat.tooltips.open-chat': 'Ouvrir le chat',
      'chat.tooltips.close-chat': 'Fermer le chat',
      'chat.tooltips.create-chat': 'Nouvelle conversation',
      'chat.header.default-title': 'Nouvelle conversation',
      'chat.input.strapi-ai-can-make-errors': 'Strapi AI peut faire des erreurs.',
      'app.utils.drag': 'Faire glisser',
    },
  },
};

export default {
  config,
  bootstrap() {},
};
