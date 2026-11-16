// backend/src/api/contact/controllers/contact.js
const { buildContactEmail } = require('../templates_js/contact-email');

module.exports = {
    async send(ctx) {
        const { firstName, lastName, email, eventType, eventDate, guests, comment } = ctx.request.body;
        const { html, text, fullName } = buildContactEmail({
            firstName,
            lastName,
            email,
            eventType,
            eventDate,
            guests,
            comment,
        });

        const contactTo = process.env.CONTACT_TO;
        const smtpFrom = process.env.SMTP_FROM || 'no-reply@lacuisinedefred-traiteur.fr';

        if (!contactTo) {
            strapi.log.error('[contact] CONTACT_TO is not configured');
            return ctx.internalServerError('Configuration email manquante');
        }

        try {
            await strapi.plugins['email'].services.email.send({
                to: contactTo,
                from: smtpFrom,
                replyTo: email,
                subject: `Nouvelle demande de devis — ${fullName}`,
                text,
                html,
            });
            ctx.send({ message: 'Email envoyé avec succès' });
        } catch (error) {
            console.error('[LOG] sendmail: Erreur lors de l\'envoi de l\'email', error);
            return ctx.internalServerError('Erreur lors de l\'envoi de l\'email');
        }
    },
};
