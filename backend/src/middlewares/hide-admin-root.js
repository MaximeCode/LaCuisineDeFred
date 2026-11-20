'use strict';

/**
 * Bloque la redirection Strapi 5 de `/` vers `admin.url`.
 *
 * Source du comportement natif :
 * `@strapi/core` → `dist/middlewares/public.js` (route GET `/` → redirect admin).
 *
 * Objectif : ne pas révéler le chemin admin custom (ex. `/fred-admin`) aux bots
 * qui scannent la racine, à la manière d’un “hide login” WordPress.
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
