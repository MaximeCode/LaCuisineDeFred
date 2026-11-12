# Récap tâches ClickUp — branche `full_ia`

Date : 2026-11-12  
Branche : `full_ia` (base `dev`, sans push)

Tous les statuts ClickUp ci-dessous ont été passés en **à valider** (jamais `terminée`).

---

## 01 — Prestations ([869dcg6pt](https://app.clickup.com/t/869dcg6pt))

**Commit :** `Connect home and prestations pages to Strapi and fix category manyToOne.` (+ `.gitignore` utile)

### Changements
- Relation `prestation.categorie` : `oneToOne` → `manyToOne`
- Home : 3 dernières prestations CMS (`publishedAt` desc), liens détail, états vide/erreur
- `/prestations` : tri catégorie ASC puis titre (filtre existant conservé)
- `.gitignore` : exemples, CDC, `docs/agent-tasks/`

### Tests
- `npm run build` (frontend) OK

### Décisions
- Tri côté front (pas de champ `order`)

### Infos encore à demander
- Contenu éditorial / photos prestations en BO

---

## 02 — Produits ([869dc08mb](https://app.clickup.com/t/869dc08mb))

**Commit :** `Add produit content-type and wire seasonal products on tarifs.`

### Changements
- CT Strapi `produit` : Titre, image, details, Prix, unite, categorie (manyToOne partagée)
- API front `produits.ts` + format prix `{Prix}€` + `unite`
- Section Produits Saisonniers sur `/tarifs` groupée par catégorie

### Tests
- `npm run build` OK

### Décisions
- Format unite libre en BO (`/kg`, `kg`, vide…)
- Permissions publiques via bootstrap existant (`ensurePublicPermissions`)

### Infos encore à demander
- Produits / prix réels à saisir en BO

---

## 03 — Formules ([869dbzqa2](https://app.clickup.com/t/869dbzqa2))

**Commit :** `Add formule content-type and wire pricing cards on tarifs.`

### Changements
- CT `formule` : titre, description, prix nullable, details (blocks), populaire
- Front : null → « Sur devis » / « personnalisé » ; nombre → `{n}€` + « par personne »
- Tri : prix ASC, nulls en dernier
- Details blocks → lignes à puces `Check`

### Tests
- `npm run build` OK

### Décisions
- Pas de champ `ordre` ni `unite`
- Pas de préfixe « À partir de »

### Infos encore à demander
- Textes / prix / listes d’inclusions des formules

---

## 04 — Le Chef ([869dc0b07](https://app.clickup.com/t/869dc0b07))

**Commit :** `Add LeChef single type with philosophy component and wire the page.`

### Changements
- Single Type `le-chef` + component `le-chef.philosophie`
- Front branché : image sticky, numérotation auto, placeholders « Contenu à venir »
- CTA devis conservé

### Tests
- `npm run build` OK

### Décisions
- Pas de contenus inventés « validés client »

### Infos encore à demander
- Bio, photo, points de philosophie à saisir en BO

---

## 05 — Email contact ([869daq8qn](https://app.clickup.com/t/869daq8qn))

**Commit :** `Externalize contact mail recipient via env for MailHog-friendly setup.`

### Changements
- Destinataire : `CONTACT_TO` (plus de hardcode)
- `SMTP_FROM` pour from / defaultFrom
- `backend/.env.example` + `doc_nodemailer.md` (test MailHog `localhost:8025`)

### Tests
- Pas de test SMTP live dans cette session (dépend MailHog + Strapi up + `.env` local)
- Doc de test curl documentée

### Décisions
- Nom unique `CONTACT_TO` (pas `SMTP_TO`)
- Nodemailer conservé (pas Resend)

### Infos encore à demander / backlog
- Vraie boîte mail prod : tâche [869e133m2](https://app.clickup.com/t/869e133m2)
- Vérifier que `CONTACT_TO` est bien dans le `.env` local de chaque env

---

## 06 — Pages légales ([869daq8rv](https://app.clickup.com/t/869daq8rv))

**Commit :** `Add legal mentions and privacy policy pages with editable placeholders.`

### Changements
- `/mentions-legales`, `/politique-de-confidentialite`
- Structure inspirée CLTO, contexte traiteur Chartres
- Placeholders `[À COMPLÉTER]` pour données sensibles
- Liens Footer branchés

### Tests
- `npm run build` OK

### Décisions
- Pages React statiques (pas de CT Strapi)
- Aucune fausse identité légale

### Infos encore à demander
- SIRET / SIREN / forme juridique / adresse / hébergeur / email légal / téléphone / DPO / dates
- Validation juridique éventuelle

---

## 07 — Page 404 ([1amhb6b8g3r](https://app.clickup.com/t/1amhb6b8g3r))

**Commit :** `Add custom 404 page with home navigation CTA.`

### Changements
- Route catch-all `*`
- Page custom + CTA accueil (+ contact)
- Puis branchée `noindex` via `<Seo />` dans la tâche SEO

### Tests
- `npm run build` OK

---

## 08 — SEO ([869dekevg](https://app.clickup.com/t/869dekevg))

**Commit :** `Apply CLTO-style SEO helpers, meta, robots, and LocalBusiness JSON-LD.`

### Changements
- `utils/seo.ts` + composant `<Seo />`
- Branché sur toutes les pages indexables + 404 `noindex`
- `index.html` fallbacks FR + OG
- `public/robots.txt` (Allow `/`) + `sitemap.xml` (routes statiques)
- JSON-LD `FoodEstablishment` / LocalBusiness-like sur Home (placeholders adresse/tél)
- `headingOffset` BlocksRenderer ; footer headings → `<p>`
- `frontend/.env.example` : `VITE_SITE_URL`

### Tests
- `npm run build` OK

### Décisions / limites
- Sitemap sans fiches prestation dynamiques (SPA / pas d’inventaire CMS au build)
- Meta injectées en JS ; fallbacks `index.html` critiques
- Pas de SSR / Next.js

### Infos encore à demander
- Adresse postale complète, téléphone, email pour JSON-LD
- Confirmation hébergeur / GMB hors code

---

## Commit docs (après SEO)

**Commit :** `docs: recap tâches ClickUp`

Fichier : `docs/recap-taches-clickup.md` (hors `agent-tasks/`)

---

## Blocages / non faits

| Sujet | Détail |
|-------|--------|
| Contenu CMS | Pas de seed produits / formules / le-chef / prestations |
| Mail live | Test MailHog non exécuté ici (infra locale) |
| Données légales | Placeholders uniquement — attente client |
| Push | Interdit par mission |
| Statut ClickUp `terminée` | Non utilisé |
