'use strict';

/**
 * production-eau-chaude service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::production-eau-chaude.production-eau-chaude');
