// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')

const config = mergeConfig(getDefaultConfig(__dirname), {
  watchFolders: [path.resolve(__dirname, 'node_modules')],
  resolver: {
    assetExts: ['html', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ttf', 'otf'],
  },
})

module.exports = config