module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
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
  ],
}