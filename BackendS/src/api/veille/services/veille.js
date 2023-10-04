'use strict';

/**
 * veille service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::veille.veille');
