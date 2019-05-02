module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://test:test@jwttestapi-c0q4w.mongodb.net/sample_mflix?retryWrites=true',
  JWT_SECRET: process.env.JWT_SECRET || 'ololoSecret'
}