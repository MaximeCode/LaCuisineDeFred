# Nodemailer Contact Form Setup

This document explains the minimum setup needed to send an email from the frontend contact form through Strapi using Nodemailer.

The flow is:

1. The frontend sends the contact form data to `POST /api/contact`.
2. Strapi receives the request in a custom controller.
3. The controller sends an email with the Strapi email plugin.
4. The Strapi email plugin uses the Nodemailer provider.

## 1. Install The Strapi Nodemailer Provider

From the backend folder:

```bash
cd backend
npm install @strapi/provider-email-nodemailer
```

This adds the official Strapi email provider for Nodemailer.

## 2. Configure The Email Plugin

Create or update `backend/config/plugins.js`:

```js
// backend/config/plugins.js
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'localhost'),
        port: env.int('SMTP_PORT', 1025),
        secure: env.bool('SMTP_SECURE', false),
        ignoreTLS: env.bool('SMTP_IGNORE_TLS', true),
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'no-reply@lacuisinedefred.fr'),
        defaultReplyTo: env('SMTP_REPLY_TO', 'no-reply@lacuisinedefred.fr'),
      },
    },
  },
});
```

For local development, this configuration works well with MailHog or Mailpit on port `1025`.

For production, set the SMTP values in `backend/.env`:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_IGNORE_TLS=false
SMTP_FROM=no-reply@lacuisinedefred.fr
SMTP_REPLY_TO=contact@lacuisinedefred.fr
```

If your SMTP provider requires authentication, add it to `providerOptions`:

```js
auth: {
  user: env('SMTP_USERNAME'),
  pass: env('SMTP_PASSWORD'),
},
```

And add the values to `backend/.env`:

```env
SMTP_USERNAME=your-smtp-user
SMTP_PASSWORD=your-smtp-password
```

## 3. Create The Contact Route

Create `backend/src/api/contact/routes/contact.js`:

```js
'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/contact',
      handler: 'contact.send',
      config: {
        auth: false,
      },
    },
  ],
};
```

This exposes:

```txt
POST http://localhost:1337/api/contact
```

`auth: false` is required because website visitors are not logged into Strapi.

## 4. Create The Contact Controller

Create `backend/src/api/contact/controllers/contact.js`:

```js
'use strict';

module.exports = {
  async send(ctx) {
    const {
      firstName,
      lastName,
      email,
      eventType,
      eventDate,
      guests,
      comment,
    } = ctx.request.body;

    const fullName = `${firstName} ${lastName}`.trim();

    try {
      await strapi.plugins.email.services.email.send({
        to: 'contact@lacuisinedefred.fr',
        from: 'no-reply@lacuisinedefred.fr',
        replyTo: email,
        subject: `Nouvelle demande de devis - ${fullName}`,
        text: `
Nouvelle demande de devis

Client: ${fullName}
Email: ${email}
Type d'événement: ${eventType}
Date: ${eventDate}
Nombre de couverts: ${guests}

Commentaire:
${comment || 'Aucun commentaire'}
        `.trim(),
      });

      ctx.send({ message: 'Email envoyé avec succès' });
    } catch (error) {
      strapi.log.error("Erreur lors de l'envoi de l'email", error);
      return ctx.internalServerError("Erreur lors de l'envoi de l'email");
    }
  },
};
```

This is the minimum backend code. A separate HTML template can be added later, but it is not required for the service to work.

## 5. Configure The Frontend API URL

Create or update `frontend/.env`:

```env
VITE_STRAPI_URL=http://localhost:1337
```

Restart the frontend dev server after changing this file.

## 6. Add A Frontend POST Helper

Create or update `frontend/src/api/Client.ts`:

```ts
export const API_URL = import.meta.env.VITE_STRAPI_URL as string;

export async function PostAPI(endpoint: string, formData: Record<string, unknown>) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error?.message || data.message || 'Erreur API');
  }

  return data;
}
```

## 7. Send The Form From React

In the contact page submit handler:

```tsx
import { PostAPI } from '../../api/Client';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await PostAPI('/api/contact', formData);
    setSubmitted(true);
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Impossible d'envoyer votre demande.",
    );
  }
};
```

The object sent by the frontend must contain the fields expected by the controller:

```ts
{
  eventType: string;
  eventDate: string;
  guests: string;
  firstName: string;
  lastName: string;
  email: string;
  comment: string;
}
```

## 8. Restart Strapi

Restart Strapi after installing the provider or changing `config/plugins.js`:

```bash
npm run develop
```

## 9. Test The Endpoint

With Strapi running, test the API directly:

```bash
curl -X POST http://localhost:1337/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "mariage",
    "eventDate": "2026-09-15",
    "guests": "80",
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean@example.com",
    "comment": "Menu végétarien souhaité"
  }'
```

Expected response:

```json
{
  "message": "Email envoyé avec succès"
}
```

## Troubleshooting

`ERR_CONNECTION_REFUSED` or `Failed to fetch` means the frontend cannot reach Strapi. Check that Strapi is running and that `VITE_STRAPI_URL` points to the right backend URL.

`404 Not Found` on `/api/contact` means the custom route is missing, incorrectly named, or Strapi was not restarted after adding it.

`Erreur lors de l'envoi de l'email` means Strapi received the request but Nodemailer failed. Check `SMTP_HOST`, `SMTP_PORT`, authentication values, and the Strapi terminal logs.

If using MailHog or Mailpit locally, open their web UI to see captured emails. The SMTP port is usually `1025`; the web UI is usually `8025`.
