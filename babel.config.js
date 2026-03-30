module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@modules': './src/modules',
          '@shared': './src/shared',
          '@navigation': './src/navigation',
          '@native': './src/native',
          '@assets': './src/assets',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    'nativewind/babel',
    'react-native-reanimated/plugin',
  ],
}