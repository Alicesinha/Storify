// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

const config = mergeConfig(getDefaultConfig(__dirname), {})

module.exports = config