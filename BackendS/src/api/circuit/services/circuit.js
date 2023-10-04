'use strict';

/**
 * circuit service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::circuit.circuit');
