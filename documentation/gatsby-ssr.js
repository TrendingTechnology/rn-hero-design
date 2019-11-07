const { renderToString } = require('react-dom/server');
const { AppRegistry } = require('react-native-web');

exports.replaceRenderer = ({ bodyComponent, setHeadComponents }) => {
  const RootComponent = () => bodyComponent;

  AppRegistry.registerComponent('main', () => RootComponent);

  const { element, getStyleElement } = AppRegistry.getApplication('main');
  // eslint-disable-next-line no-unused-vars
  const markup = renderToString(element);
  const styleElement = getStyleElement();

  setHeadComponents([styleElement]);
};
