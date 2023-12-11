module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/timemap-events',
     handler: 'timemap-events.timemapEvents',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
