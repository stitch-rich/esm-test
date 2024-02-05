import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  testEnvironment: 'node',
  clearMocks: true,
  setupFiles: [
    '<rootDir>/jest.setup.ts',
  ],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testPathIgnorePatterns: [
    'node_modules',
    'lib',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      '<rootDir>/../../node_modules/ts-jest',
      { "useESM": true }
    ],
  },
  coverageReporters: [
    'html',
    'text',
    'lcov',
  ],
  collectCoverageFrom: ['**/*.ts'],
};

export default config;
