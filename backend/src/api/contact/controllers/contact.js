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
        const fromAddress = process.env.RESEND_DEFAULT_EMAIL || 'onboarding@resend.dev';
        const from = `La Cuisine de Fred <${fromAddress}>`;

        if (!contactTo) {
            strapi.log.error('[contact] CONTACT_TO is not configured');
            return ctx.internalServerError('Configuration email manquante');
        }

        if (!process.env.RESEND_API_KEY) {
            strapi.log.error('[contact] RESEND_API_KEY is not configured');
            return ctx.internalServerError('Configuration email manquante');
        }

        try {
            const result = await strapi.plugins['email'].services.email.send({
                to: contactTo,
                from,
                replyTo: email,
                subject: `Nouvelle demande de devis — ${fullName}`,
                text,
                html,
            });

            // Resend renvoie { data, error } sans throw — il faut remonter l'échec
            if (result?.error) {
                strapi.log.error('[contact] Resend error', result.error);
                return ctx.internalServerError('Erreur lors de l\'envoi de l\'email');
            }

            ctx.send({ message: 'Email envoyé avec succès' });
        } catch (error) {
            console.error('[LOG] sendmail: Erreur lors de l\'envoi de l\'email', error);
            return ctx.internalServerError('Erreur lors de l\'envoi de l\'email');
        }
    },
};
