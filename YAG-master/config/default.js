module.exports = {
  'MONGODB_HOST': process.env.MONGODB_HOST || 'localhost',
  'MONGODB_PORT': process.env.MONGODB_PORT || 27017,
  // 'MONGODB_HOST': "40.83.251.117",
  // 'MONGODB_PORT': 4000,
  'HEALTH_HOST': process.env.HEALTH_HOST || 'localhost',
  'HEALTH_PORT': process.env.HEALTH_PORT || 7001,
  'ACCOUNT_HOST': process.env.ACCOUNT_HOST || 'localhost',
  'ACCOUNT_PORT': process.env.ACCOUNT_PORT || 7002,
  'PRICING_HOST': process.env.PRICING_HOST || 'localhost',
  'PRICING_PORT': process.env.PRICING_PORT || 7004,
  'SUBSCRIPTION_HOST': process.env.SUBSCRIPTION_HOST || 'localhost',
  'SUBSCRIPTION_PORT': process.env.SUBSCRIPTION_PORT || 7003,
  'WALLET_HOST': process.env.WALLET_HOST || 'localhost',
  'WALLET_PORT': process.env.WALLET_PORT || 7005,
  'PORT': 80
}