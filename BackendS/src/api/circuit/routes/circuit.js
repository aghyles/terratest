'use strict';

/**
 * circuit router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::circuit.circuit');
