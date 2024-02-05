import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  setupFiles: [
    '<rootDir>/jest.setup.ts',
  ],
  testPathIgnorePatterns: [
    'node_modules',
    'lib',
  ],
  coverageReporters: [
    'html',
    'text',
    'lcov',
  ],
  collectCoverageFrom: ['**/*.ts'],
};

export default config;
