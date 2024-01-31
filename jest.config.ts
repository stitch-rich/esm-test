import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  setupFiles: [
    '<rootDir>/jest.setup.js',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest',
  },
  testPathIgnorePatterns: [
    'node_modules',
    'build',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/build/',
  ],
  coverageReporters: [
    'html',
    'text',
    'lcov',
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',
  ],
};

export default config;
