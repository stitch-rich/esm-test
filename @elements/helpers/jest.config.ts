import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
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
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/../node_modules/ts-jest',
  },
  coverageReporters: [
    'html',
    'text',
    'lcov',
  ],
  collectCoverageFrom: ['**/*.ts'],
};

export default config;
