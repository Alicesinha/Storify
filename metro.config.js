// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const path = require('path')

const config = mergeConfig(getDefaultConfig(__dirname), {
  watchFolders: [path.resolve(__dirname, 'node_modules')],
})

module.exports = config