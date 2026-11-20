# Patch Strapi 5 — masquer la racine (404 au lieu de rediriger vers l’admin)

Guide reproductible pour une autre IA / un autre projet Strapi 5.

## Contexte / problème

Sur **Strapi 5**, la racine `GET /` redirige automatiquement vers l’admin (`admin.url`, défaut `/admin`).

Ce comportement est hardcodé dans :

- package : `@strapi/core`
- fichier : `dist/middlewares/public.js`
- route : `GET /` → `ctx.redirect(strapi.config.get('admin.url', '/admin'))`

Conséquence : même si `admin.url` est custom (ex. `/fred-admin`), un bot qui tape `https://api.exemple.fr/` découvre immédiatement le vrai chemin admin via la redirection.

En Strapi 5, l’option v4 `defaultIndex` du middleware `public` **n’existe plus**.

Doc officielle : [defaultIndex removed](https://docs.strapi.io/cms/migration/v4-to-v5/breaking-changes/default-index-removed)

## Objectif du patch

- `GET|HEAD /` → **404** (pas de redirect)
- L’admin reste accessible uniquement via le chemin secret configuré (`admin.url`)
- Aucun patch de `node_modules` (upgrade-safe)

## Prérequis

1. Projet Strapi **5.x**
2. Un chemin admin custom déjà défini, ex. dans `config/admin.js` :

```js
module.exports = ({ env }) => ({
  // …
  url: '/fred-admin',
  cookie: {
    path: '/fred-admin', // recommandé si cookies admin scoped
    sameSite: 'lax',
  },
});
```

3. Après changement de `admin.url` : rebuild admin (`npm run build`) puis restart.

## Fichiers à créer / modifier

### 1. Créer `src/middlewares/hide-admin-root.js`

Middleware global qui court-circuite `/` **avant** que le routeur n’atteigne la route publique Strapi.

```js
'use strict';

/**
 * Bloque la redirection Strapi 5 de `/` vers `admin.url`.
 *
 * Source du comportement natif :
 * `@strapi/core` → `dist/middlewares/public.js` (route GET `/` → redirect admin).
 *
 * Objectif : ne pas révéler le chemin admin custom aux bots qui scannent la racine.
 */
module.exports = (config = {}) => {
  const { statusCode = 404, body } = config;

  return async (ctx, next) => {
    const isGetOrHead = ctx.method === 'GET' || ctx.method === 'HEAD';
    const isRoot = ctx.path === '/' || ctx.path === '';

    if (isGetOrHead && isRoot) {
      // Ne pas appeler next() : la route publique `/` → admin ne s'exécute pas.
      ctx.status = statusCode;
      ctx.body =
        body ??
        {
          data: null,
          error: {
            status: statusCode,
            name: 'NotFoundError',
            message: 'Not Found',
            details: {},
          },
        };
      return;
    }

    await next();
  };
};
```

Nom du fichier = nom du middleware global Strapi : `global::hide-admin-root`.

### 2. Enregistrer dans `config/middlewares.js`

Ajouter `'global::hide-admin-root'` **avant** `'strapi::public'`.

```js
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
```

Pourquoi avant `strapi::public` ?

- `strapi::public` enregistre la route redirect au boot (et côté request ne fait qu’un `next()`).
- Le middleware global s’exécute dans la chaîne Koa **avant le routeur**.
- En répondant sans `next()` sur `/`, la redirect n’est jamais atteinte.

## Vérification

1. Redémarrer Strapi (`npm run develop` ou `npm run start`).
2. Tester la racine :

```bash
curl -sI http://localhost:1338/
# attendu : HTTP/1.1 404 Not Found
# attendu : PAS de Location: …/fred-admin…
```

3. Vérifier que l’admin secret fonctionne toujours :

```bash
curl -sI http://localhost:1338/fred-admin
# attendu : 200 (shell admin) — adapter le path à admin.url
```

4. Les API content-type (`/api/...`) ne doivent pas être impactées.

## Limites (à documenter au client / à l’équipe)

- Ce n’est **pas** une protection anti-bruteforce complète : c’est de l’obscurcissement d’URL (comme un plugin “hide login” WordPress).
- Quiconque connaît `/fred-admin` peut toujours tenter un login → garder le **rate limit** admin (`config/admin.js` → `rateLimit`) et idéalement un filtrage réseau (IP allowlist / VPN / Basic Auth reverse-proxy) sur le path admin.
- Les cookies admin sont scoped sur `cookie.path` (= path admin) : on ne peut pas “détecter un admin déjà connecté” sur `/` via cookie. D’où un **404 systématique** sur `/` (y compris pour un admin déjà loggé). Comportement voulu : l’entrée reste `/fred-admin`.
- Ne pas publier le path admin dans le frontend, les emails, ou un reverse-proxy trop bavard (ex. page d’erreur qui le cite).

## Ce qu’il ne faut PAS faire

- Ne pas patcher `node_modules/@strapi/core/dist/middlewares/public.js` (cassé à chaque upgrade ; le projet utilise déjà `patch-package` pour un autre plugin, ne pas y mélanger ce fix).
- Ne pas mettre `serveAdminPanel: false` sauf si l’admin est hébergé ailleurs : ça coupe le service de l’admin sur ce serveur.
- Ne pas 404-er le path `admin.url` lui-même : ça rend le login impossible.

## Adaptation à un autre projet

| Élément | À adapter |
|---|---|
| `admin.url` | Path secret du projet |
| `cookie.path` | Doit matcher `admin.url` |
| Port / host des curl de test | Env locale / preprod / prod |
| Nom du middleware | Libre, mais `global::<filename-sans-js>` doit matcher le fichier dans `src/middlewares/` |

## Checklist “done”

- [ ] `src/middlewares/hide-admin-root.js` présent
- [ ] `global::hide-admin-root` listé dans `config/middlewares.js` avant `strapi::public`
- [ ] `GET /` → 404, sans header `Location`
- [ ] `GET <admin.url>` → admin toujours joignable
- [ ] `/api/*` inchangé
