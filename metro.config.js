const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const { assetExts, sourceExts } = config.resolver;

  // Use SVG transformer
  config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
  config.resolver.assetExts = assetExts.filter((ext) => ext !== 'svg');
  config.resolver.sourceExts = [...sourceExts, 'svg'];

  return config;
})();

