'use strict';

async function ensurePublicPermissions(strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
    populate: ['permissions'],
  });

  if (!publicRole) {
    return;
  }

  const existingActions = new Set(
    (publicRole.permissions ?? []).map((permission) => permission.action),
  );

  const contentTypes = Object.keys(strapi.contentTypes);

  const publicActions = [];

  for (const uid of contentTypes) {
    // Ignore plugins/admin internes
    if (!uid.startsWith('api::')) {
      continue;
    }

    publicActions.push(`${uid}.find`);
    publicActions.push(`${uid}.findOne`);
  }

  await Promise.all(
    publicActions
      .filter((action) => !existingActions.has(action))
      .map((action) =>
        strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: publicRole.id,
          },
        }),
      ),
  );
}

module.exports = {
  async bootstrap({ strapi }) {
    await ensurePublicPermissions(strapi);
  },
};