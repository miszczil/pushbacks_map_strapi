'use strict';

/**
 * A set of functions called "actions" for `timemap-events`
 */

module.exports = {
  async timemapEvents(ctx, next) {
    try {
      const data = await strapi
        .service("api::timemap-events.timemap-events")
        .timemapEvents();
      console.log(data, "data");

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Timemap events controller error", { moreDetails: err });
    }
  },
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
};
