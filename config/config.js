var rootPath = require('path').normalize(__dirname + '/..');

module.exports = {
  development: {
    db: {
      host: 'mongodb://localhost/sns-dev',
      option: {
        server: { poolSize: 5 }
      }
    },
    root: rootPath,
    app: {
      name: 'SNS'
    }
  },

  production: { }
}