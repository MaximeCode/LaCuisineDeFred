'use strict';

const EVENT_LABELS = {
  mariage: 'Mariage',
  anniversaire: 'Anniversaire',
  bapteme: 'Baptême',
  entreprise: "Événement d'entreprise",
  autre: 'Autre',
};

const BRAND = {
  burgundy: '#8b1538',
  darkGrey: '#3a3a3a',
  foreground: '#1a1a1a',
  muted: '#6b6b6b',
  background: '#f5f5f5',
  white: '#ffffff',
  border: '#e5e5e5',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatEventType(eventType) {
  return EVENT_LABELS[eventType] || eventType || '—';
}

function formatDate(eventDate) {
  if (!eventDate) return '—';

  const date = new Date(`${eventDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return eventDate;

  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function buildFieldRow(label, value, { isLink = false, href = '' } = {}) {
  const safeValue = escapeHtml(value || '—');
  const valueHtml = isLink && href
    ? `<a href="${escapeHtml(href)}" style="color:${BRAND.burgundy};text-decoration:none;">${safeValue}</a>`
    : safeValue;

  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${BRAND.border};vertical-align:top;width:38%;">
        <span style="font-size:13px;font-weight:600;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.04em;">
          ${escapeHtml(label)}
        </span>
      </td>
      <td style="padding:12px 0 12px 16px;border-bottom:1px solid ${BRAND.border};vertical-align:top;color:${BRAND.foreground};font-size:16px;line-height:1.5;">
        ${valueHtml}
      </td>
    </tr>
  `;
}

function buildContactEmail({ firstName, lastName, email, eventType, eventDate, guests, comment }) {
  const fullName = `${firstName} ${lastName}`.trim();
  const eventLabel = formatEventType(eventType);
  const formattedDate = formatDate(eventDate);
  const safeComment = escapeHtml(comment || 'Aucun commentaire');

  const text = [
    'La Cuisine de Fred — Nouvelle demande de devis',
    '',
    `Client : ${fullName}`,
    `Email : ${email}`,
    `Événement : ${eventLabel}`,
    `Date : ${formattedDate}`,
    `Couverts : ${guests || '—'}`,
    '',
    'Commentaire :',
    comment || 'Aucun commentaire',
  ].join('\n');

  const html = `
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nouvelle demande de devis</title>
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND.background};font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.foreground};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND.background};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:${BRAND.white};border-radius:16px;overflow:hidden;border:1px solid ${BRAND.border};">
            <tr>
              <td style="background:linear-gradient(135deg, ${BRAND.darkGrey} 0%, ${BRAND.burgundy} 100%);padding:28px 32px;text-align:center;">
                <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;color:${BRAND.white};letter-spacing:0.04em;">
                  La Cuisine de Fred
                </p>
                <p style="margin:0;font-size:15px;line-height:1.5;color:rgba(255,255,255,0.88);">
                  Nouvelle demande de devis
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:${BRAND.foreground};">
                  Bonjour Fred,<br />
                  Un visiteur vient de remplir le formulaire de contact sur votre site.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                  ${buildFieldRow('Client', fullName)}
                  ${buildFieldRow('Email', email, { isLink: true, href: `mailto:${email}` })}
                  ${buildFieldRow('Événement', eventLabel)}
                  ${buildFieldRow('Date', formattedDate)}
                  ${buildFieldRow('Couverts', guests)}
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND.background};border-radius:12px;">
                  <tr>
                    <td style="padding:20px 22px;">
                      <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.04em;">
                        Commentaire
                      </p>
                      <p style="margin:0;font-size:16px;line-height:1.6;color:${BRAND.foreground};white-space:pre-wrap;">
                        ${safeComment}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px 28px;">
                <table role="presentation" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td style="border-radius:999px;background-color:${BRAND.burgundy};">
                      <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: Demande de devis - ${fullName}`)}"
                         style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:${BRAND.white};text-decoration:none;">
                        Répondre à ${escapeHtml(firstName)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 32px;background-color:${BRAND.background};text-align:center;border-top:1px solid ${BRAND.border};">
                <p style="margin:0;font-size:12px;line-height:1.5;color:${BRAND.muted};">
                  Message envoyé depuis lacuisinedefred-traiteur.fr
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  return { html, text, fullName, eventLabel, formattedDate };
}

module.exports = {
  buildContactEmail,
};
