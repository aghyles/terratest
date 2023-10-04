'use strict';

/**
 * appareil service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::appareil.appareil');
