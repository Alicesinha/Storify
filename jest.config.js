module.exports = {
  preset: 'react-native',
  setupFilesAfterFramework: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@native/(.*)$': '<rootDir>/src/native/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@env$': '<rootDir>/src/__mocks__/env.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-mmkv|react-native-nitro-modules)/)',
  ],
}