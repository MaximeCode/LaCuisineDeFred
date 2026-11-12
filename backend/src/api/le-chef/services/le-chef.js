'use strict';

/**
 * le-chef service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::le-chef.le-chef');
