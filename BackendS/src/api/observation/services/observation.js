'use strict';

/**
 * observation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::observation.observation');
