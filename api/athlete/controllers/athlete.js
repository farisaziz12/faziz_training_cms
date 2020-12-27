"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { email, id } = ctx.params;

    let entity = {};

    if (email) {
      entity = await strapi
        .query("athlete")
        .findOne({ email: email }, [
          "cart",
          "cart.cart_items",
          "active_services",
          "active_services.service",
        ]);
    } else {
      entity = await strapi
        .query("athlete")
        .findOne({ id: id }, [
          "cart",
          "cart.cart_items",
          "active_services",
          "active_services.service",
        ]);
    }
    return sanitizeEntity(entity, { model: strapi.models.athlete });
  },
};
