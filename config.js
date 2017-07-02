'use stict'

// Deps
const Confidence = require('confidence')

// Main Config
const config = {
  projectName: 'auth-server',
  env: process.env.NODE_ENV || 'development',
  port: process.env.APP_PORT || 1337,
  production: 'production',
  db: {
    $filter: 'env',
    $default: 'mongo://localhost:27017/mydb',
    production: 'mongo://localhost:27017/prodDB'
  },
  jwtSecret: 'blabla-secret',
  morgan: process.env.MORGAN || 'dev',
  session: {
    resave: false,
    secret: 'keyboard cat',
    saveUninitialized: true,
    cookie: {
      $filter: 'env',
      $default: { maxAge: 3600 },
      production: { maxAge: 60000, secure: true }
    }
  }
}

const store = new Confidence.Store(config)
module.exports = {
  config: store.get('/', { env: store.get('/env') }),
  get: (key, criteria) => store.get(key, criteria || {})
}
