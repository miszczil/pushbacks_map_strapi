'use strict';

/**
 * timemap-events service
 */

module.exports = {
  timemapEvents: async () => {
    try {
      // fetching data
      const entries = await strapi.entityService.findMany(
        "api::event.event",
        {
          fields: ["id", "description", "date", "time", "location", "location_name"],
          populate: {
            sources: {
              fields: ["id", "title", "paths"],
            }
          },
        }
      );

      // {
      //   "associations": [
      //     "tear_gas",
      //     "narrative_1",
      //     "narrative_3"
      //   ],
      //   "sources": [
      //     "src1"
      //   ],
      //   "description": "Person A appears on the scene and sprays tear gas.",
      //   "date": "10/10/2015",
      //   "time": "16:20",
      //   "location": "Al Araqib",
      //   "latitude": "31.3484783",
      //   "longitude": "34.7874169"
      // },

      // reduce the data to the format we want to return
      let entriesReduced;
      if (entries && Array.isArray(entries)) {
        entriesReduced = entries.reduce((acc, item) => {
          acc = acc || [];
          acc.push({
            id: item.id.toString(),
            description: item.description || "",
            date: item.date || "", // TODO format date to dd/mm/yyyy
            time: item.time || "",
            latitude: item.location?.lat.toString(),
            longitude: item.location?.lng.toString(),
            associations: [],
            // sources: []
            // publishedDate: new Date(item.createdAt).toDateString() || "",
            // authorName: item.author?.name || "",
            // authorEmail: item.author?.email || "",
          });
          return acc;
        }, []);
      }

      // return the reduced data
      return entriesReduced;
    } catch (err) {
      return err;
    }
  },
};