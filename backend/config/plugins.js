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
});