module.exports = {
  collectCoverage: true, // enables collecting coverage
  coverageDirectory: 'coverage', // specifies folder jest will put coverage files
  testEnvironment: 'jsdom', //  test environment that will be used for testing note that we are setting it to jsdom and this will be coming from @testing-library/jest-dom and jest-environment-jsdom packages
};
