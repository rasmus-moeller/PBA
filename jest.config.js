export default {
    extensionsToTreatAsEsm: ['.js'],
    testMatch: ['**/__tests__/**/*.test.js'],
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  };