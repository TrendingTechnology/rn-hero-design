exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        'react-native-svg':
          '@rn-hero-design/documentation/mocks/react-native-svg-web',
      },
    },
  });
};
