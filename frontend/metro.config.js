/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
    resolver: {
        sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json'],
    },
    transformer: {
        babelTransformerPath: require.resolve('react-native-typescript-transformer'),
    },
};
