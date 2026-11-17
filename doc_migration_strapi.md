# Migration Strapi (upgrade vers la dernière version)

Procédure pour mettre à jour le backend Strapi vers la dernière version disponible avec l’outil officiel `@strapi/upgrade`.

> **Contexte** : sur Windows, `npx @strapi/upgrade latest` peut échouer avec `Cannot find module 'esbuild'`. Il faut d’abord installer `esbuild` en dépendance de développement dans le projet.

## Prérequis

- Travailler dans une **copie** du projet (ne pas lancer l’upgrade directement sur preprod/prod).
- Backup de la codebase et de la base de données.
- Node.js compatible avec Strapi (`>=20` et `<=24` selon le `package.json` actuel).

## Étapes

Depuis le dossier `backend` :

```bash
cd backend
```

### 1. Réinstaller les dépendances à froid

```bash
rm -rf node_modules
npm install
```

Sous PowerShell Windows, si `rm -rf` ne convient pas :

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### 2. Installer le correctif `esbuild` + l’outil d’upgrade

```bash
npm install --save-dev @strapi/upgrade esbuild
```

Sans cette étape, `npx @strapi/upgrade latest` plante souvent avec :

```text
Error: Cannot find module 'esbuild'
```

Références : [strapi#18656](https://github.com/strapi/strapi/issues/18656), [strapi#23516](https://github.com/strapi/strapi/issues/23516).

### 3. Lancer l’upgrade

```bash
npx @strapi/upgrade latest
```

Variantes utiles :

```bash
# Simulation sans écrire les fichiers
npx @strapi/upgrade latest --dry

# Dernière minor/patch de la majeure actuelle (ex. rester en v5)
npx @strapi/upgrade minor
```

Si l’outil propose de **pinner** les dépendances `@strapi/*` (celles déclarées avec `^…`), répondre **yes**.

### 4. Vérifier après l’upgrade

1. Relire le diff (`package.json`, fichiers transformés par les codemods).
2. Rebuild / démarrage :

```bash
npm run build
npm run develop
```

3. Tester l’admin, les API critiques (auth, contact/email, contenus publics).

## Notes

- L’outil met à jour les dépendances `@strapi/*` et applique des codemods. Il **ne migre pas** les données : ça reste géré par les migrations Strapi au démarrage.
- Aligner idéalement tous les packages `@strapi/*` sur la **même** version (strapi, users-permissions, plugin-cloud, provider-email-nodemailer, etc.).
- Doc officielle : [Upgrade tool](https://docs.strapi.io/cms/upgrade-tool).
