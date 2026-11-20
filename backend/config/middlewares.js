module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  // Doit tourner avant d'atteindre la route publique `/` → admin.url
  'global::hide-admin-root',
  'strapi::public',
];
