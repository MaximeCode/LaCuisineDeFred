// backend/config/plugins.js
/**
 * @param {{ env: typeof import('@strapi/utils').env }} param0
 */
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-resend-strapi',
      providerOptions: {
        apiKey: env('RESEND_API_KEY'),
      },
      settings: {
        defaultFrom: env('RESEND_DEFAULT_EMAIL', 'onboarding@resend.dev'),
        defaultReplyTo: env('RESEND_USER_EMAIL'),
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
