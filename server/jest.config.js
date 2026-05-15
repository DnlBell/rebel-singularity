// Load .env.test before running tests
require('dotenv').config({ path: '.env.test' });

module.exports = {
  displayName: 'server',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'routes/**/*.js',
    'middleware/**/*.js',
    '!**/__tests__/**'
  ],
  testTimeout: 30000,
  verbose: true
};
