const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

function svgConfig() {
  const vConfig = mergeConfig(getDefaultConfig(__dirname), config);

  return mergeConfig(vConfig, {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: vConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...vConfig.resolver.sourceExts, 'svg'],
    },
  });
}

module.exports = svgConfig();
