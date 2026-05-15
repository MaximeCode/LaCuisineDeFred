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
      // Upload plugin (Media Library) — same id used for assets + folders loading announcements
      'list.asset.at.finished': 'Chargement terminé.',
      'global.more.actions': "Plus d'actions",
      'content-type-builder.search.placeholder': 'Rechercher',
      'api::prestation.prestation': 'Prestations',
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
  bootstrap() { },
};
