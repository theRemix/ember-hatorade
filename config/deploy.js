module.exports = {
  development: {
    buildEnv: 'development',
    store: {
      type: 'redis',
      host: 'localhost',
      port: '6379'
    },
    assets: { }
  }
};
