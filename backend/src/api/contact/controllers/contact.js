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

        try {
            await strapi.plugins['email'].services.email.send({
                to: 'contact@lacuisinedefred.fr',
                from: 'no-reply@lacuisinedefred.fr',
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
