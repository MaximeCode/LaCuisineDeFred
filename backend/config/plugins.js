// backend/config/plugins.js
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'localhost'),
        port: env('SMTP_PORT', 1025),
        ignoreTLS: true,
        secure: false,
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'no-reply@lacuisinedefred-traiteur.fr'),
        defaultReplyTo: env('SMTP_FROM', 'no-reply@lacuisinedefred-traiteur.fr'),
      },
    },
  },
  // WebP à l’upload + conversion bulk médiathèque (admin : Settings → Media WebP & migration)
  'strapi-media-webp-convertor': {
    enabled: true,
    config: {
      webpQuality: 82,
      webpConversionEnabled: true,
      // PDFs du club (documents) : validation ok, pas de blocage trop strict
      pdfValidationEnabled: true,
      maxPdfSizeMb: 50,
      blockPdfActiveContent: false,
    },
  },
  upload: {
    config: {
      // Garantit la génération des variantes Sharp (srcSet côté front)
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        thumbnail: 245,
      },
    },
  },
});