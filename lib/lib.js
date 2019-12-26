import React__default, { Component, createElement, useState, useCallback, useEffect } from 'react';
import t from 'prop-types';
import { PixelRatio, Dimensions, Platform as Platform$1, StyleSheet, InteractionManager, Animated, ActivityIndicator, Text as Text$2, View as View$1, TouchableOpacity, TextInput as TextInput$3, TouchableWithoutFeedback, Keyboard, DatePickerIOS, DatePickerAndroid, KeyboardAvoidingView as KeyboardAvoidingView$1, FlatList, Image, ScrollView, SectionList } from 'react-native';
import { connect } from 'react-redux';
import { SvgXml } from 'react-native-svg';

//
const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width; // -- Testing Only --
// const fontScale = PixelRatio.getFontScale();
// const layoutSize = PixelRatio.getPixelSizeForLayoutSize(14);
// console.log('normalizeText getPR ->', pixelRatio);
// console.log('normalizeText getFS ->', fontScale);
// console.log('normalizeText getDH ->', deviceHeight);
// console.log('normalizeText getDW ->', deviceWidth);
// console.log('normalizeText getPSFLS ->', layoutSize);

const normalize = size => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.95;
    } // iphone 5


    if (deviceHeight < 667) {
      return size; // iphone 6-6s
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    } // older phablets


    return size * 1.25;
  }

  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    } // Catch other weird android width sizings


    if (deviceHeight < 667) {
      return size * 1.15; // catch in-between size Androids and scale font up
      // a tad but not too much
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    } // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等


    return size * 1.27;
  }

  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size; // Catch other smaller android height sizings
    }

    if (deviceHeight < 667) {
      return size * 1.2; // catch in-between size Androids and scale font up
      // a tad but not too much
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    } // catch larger phablet devices


    return size * 1.4;
  }

  return size;
};

const isWeb = Platform$1.OS === 'web';
const BLUE = '#1dbeee';
const FOCUS_BLUE_1 = '#003580';
const FOCUS_BLUE_2 = '#40679f';
const FOCUS_BLUE_3 = '#5d7ead';
const BACKGROUND_BLUE_1 = '#347ab7';
const BACKGROUND_BLUE_2 = '#b5eeff';
const BACKGROUND_BLUE_3 = '#e6f7ff';
const RED = '#de350b';
const ORANGE = '#ffa234';
const BLACK = '#000000';
const GREY_1 = '#2b2b2b';
const GREY_2 = '#71767c';
const GREY_3 = '#a3a6ac';
const GREY_4 = '#d9dbdf';
const GREY_5 = '#f5f6f8';
const WHITE = '#fcfcfc';
const BASE_SIZE = isWeb ? 16 : normalize(13);
const FONT_SIZE = isWeb ? 16 : normalize(13); // Edit these 👇

const FONT_FAMILY = isWeb ? undefined : 'Proxima Nova';
const PRIMARY_COLOR = BLUE;
const DANGER_COLOR = RED;
const TEXT_COLOR = BLACK;
const INVERTED_TEXT_COLOR = WHITE;
const DISABLED_TEXT_COLOR = GREY_3;
const MUTED_TEXT_COLOR = GREY_3;
const LINK_TEXT_COLOR = BLUE;
const BORDER_COLOR = GREY_4;
const BACKGROUND_COLOR = WHITE;
const DISABLED_BACKGROUND_COLOR = GREY_4;
const SMALL_SIZE = BASE_SIZE * 0.5;
const MEDIUM_SIZE = BASE_SIZE * 1;
const LARGE_SIZE = BASE_SIZE * 1.5;
const HEADER_5 = FONT_SIZE * 0.83;
const HEADER_4 = FONT_SIZE * 1;
const HEADER_3 = FONT_SIZE * 1.17;
const HEADER_2 = FONT_SIZE * 1.5;
const HEADER_1 = FONT_SIZE * 2;

var variables = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BLUE: BLUE,
  FOCUS_BLUE_1: FOCUS_BLUE_1,
  FOCUS_BLUE_2: FOCUS_BLUE_2,
  FOCUS_BLUE_3: FOCUS_BLUE_3,
  BACKGROUND_BLUE_1: BACKGROUND_BLUE_1,
  BACKGROUND_BLUE_2: BACKGROUND_BLUE_2,
  BACKGROUND_BLUE_3: BACKGROUND_BLUE_3,
  RED: RED,
  ORANGE: ORANGE,
  BLACK: BLACK,
  GREY_1: GREY_1,
  GREY_2: GREY_2,
  GREY_3: GREY_3,
  GREY_4: GREY_4,
  GREY_5: GREY_5,
  WHITE: WHITE,
  BASE_SIZE: BASE_SIZE,
  FONT_SIZE: FONT_SIZE,
  FONT_FAMILY: FONT_FAMILY,
  PRIMARY_COLOR: PRIMARY_COLOR,
  DANGER_COLOR: DANGER_COLOR,
  TEXT_COLOR: TEXT_COLOR,
  INVERTED_TEXT_COLOR: INVERTED_TEXT_COLOR,
  DISABLED_TEXT_COLOR: DISABLED_TEXT_COLOR,
  MUTED_TEXT_COLOR: MUTED_TEXT_COLOR,
  LINK_TEXT_COLOR: LINK_TEXT_COLOR,
  BORDER_COLOR: BORDER_COLOR,
  BACKGROUND_COLOR: BACKGROUND_COLOR,
  DISABLED_BACKGROUND_COLOR: DISABLED_BACKGROUND_COLOR,
  SMALL_SIZE: SMALL_SIZE,
  MEDIUM_SIZE: MEDIUM_SIZE,
  LARGE_SIZE: LARGE_SIZE,
  HEADER_5: HEADER_5,
  HEADER_4: HEADER_4,
  HEADER_3: HEADER_3,
  HEADER_2: HEADER_2,
  HEADER_1: HEADER_1
});

const TEXT_FONT_SIZE = HEADER_4;
const WRAPPER_PADDING_VERTICAL = MEDIUM_SIZE;
const WRAPPER_PADDING_HORIZONTAL = MEDIUM_SIZE;
const WRAPPER_HEIGHT = TEXT_FONT_SIZE + WRAPPER_PADDING_VERTICAL * 2;
const WRAPPER_BORDER_RADIUS = WRAPPER_HEIGHT * 0.5;
const FILLED_TEXT_COLOR = INVERTED_TEXT_COLOR;
const FILLED_BACKGROUND_COLOR = PRIMARY_COLOR;
const OUTLINED_TEXT_COLOR = PRIMARY_COLOR;
const OUTLINED_BORDER_COLOR = PRIMARY_COLOR;
const DISABLED_TEXT_COLOR$1 = INVERTED_TEXT_COLOR;
const DISABLED_BACKGROUND_COLOR$1 = DISABLED_BACKGROUND_COLOR;
const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: WRAPPER_HEIGHT,
    paddingHorizontal: WRAPPER_PADDING_HORIZONTAL,
    borderRadius: WRAPPER_BORDER_RADIUS
  },
  text: {
    fontFamily: FONT_FAMILY,
    fontSize: TEXT_FONT_SIZE,
    lineHeight: TEXT_FONT_SIZE
  },
  filledWrapper: {
    backgroundColor: FILLED_BACKGROUND_COLOR
  },
  filledText: {
    color: FILLED_TEXT_COLOR
  },
  filledLoadingIndicator: {
    color: FILLED_TEXT_COLOR
  },
  outlinedWrapper: {
    borderWidth: 1.2,
    borderColor: OUTLINED_BORDER_COLOR,
    backgroundColor: 'transparent'
  },
  outlinedText: {
    fontWeight: '500',
    color: OUTLINED_TEXT_COLOR
  },
  outlinedLoadingIndicator: {
    color: OUTLINED_TEXT_COLOR
  },
  disabledWrapper: {
    borderWidth: 0,
    backgroundColor: DISABLED_BACKGROUND_COLOR$1
  },
  disabledText: {
    color: DISABLED_TEXT_COLOR$1
  }
};
var buttonTheme = StyleSheet.create(styles);

const WRAPPER_MARGIN_VERTICAL = MEDIUM_SIZE;
const LABEL_FONT_SIZE = HEADER_5;
const LABEL_COLOR = MUTED_TEXT_COLOR;
const INPUT_FONT_SIZE = HEADER_4;
const INPUT_PADDING_VERTICAL = MEDIUM_SIZE;
const INPUT_HEIGHT = INPUT_FONT_SIZE + INPUT_PADDING_VERTICAL * 2;
const INPUT_BORDER_COLOR = BORDER_COLOR;
const INPUT_COLOR = TEXT_COLOR;
const ICON_COLOR = MUTED_TEXT_COLOR;
const ERROR_FONT_SIZE = HEADER_5;
const ERROR_MARGIN_VERTICAL = SMALL_SIZE;
const ERROR_COLOR = DANGER_COLOR;
const styles$1 = {
  wrapper: {
    marginBottom: WRAPPER_MARGIN_VERTICAL
  },
  label: {
    height: LABEL_FONT_SIZE,
    lineHeight: LABEL_FONT_SIZE,
    fontFamily: FONT_FAMILY,
    fontSize: LABEL_FONT_SIZE,
    fontWeight: '500',
    color: LABEL_COLOR
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: INPUT_BORDER_COLOR
  },
  baseTextInput: {
    flex: 1,
    paddingTop: INPUT_PADDING_VERTICAL,
    paddingBottom: INPUT_PADDING_VERTICAL,
    textAlignVertical: 'center',
    fontFamily: FONT_FAMILY,
    fontSize: INPUT_FONT_SIZE,
    color: INPUT_COLOR
  },
  icon: {
    height: INPUT_HEIGHT,
    color: ICON_COLOR
  },
  errorMessage: {
    height: ERROR_FONT_SIZE,
    lineHeight: ERROR_FONT_SIZE,
    marginTop: ERROR_MARGIN_VERTICAL,
    fontFamily: FONT_FAMILY,
    fontSize: ERROR_FONT_SIZE,
    fontWeight: '500',
    color: ERROR_COLOR
  },
  errorLabel: {
    color: ERROR_COLOR
  },
  errorTextInput: {
    borderBottomColor: ERROR_COLOR
  },
  errorIcon: {
    color: ERROR_COLOR
  },
  activeLabel: {
    color: PRIMARY_COLOR
  },
  activeTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_COLOR
  },
  activeIcon: {
    color: PRIMARY_COLOR
  },
  disabledBaseTextInput: {
    color: DISABLED_TEXT_COLOR
  }
};
var textInputTheme = StyleSheet.create(styles$1);

const COLOR = TEXT_COLOR;
const styles$2 = {
  icon: {
    color: COLOR
  }
};
var iconTheme = StyleSheet.create(styles$2);

const COLOR$1 = TEXT_COLOR;
const FONT_SIZE$1 = HEADER_4;
const H1_FONT_SIZE = HEADER_1;
const H2_FONT_SIZE = HEADER_2;
const H3_FONT_SIZE = HEADER_3;
const H4_FONT_SIZE = HEADER_4;
const H5_FONT_SIZE = HEADER_5;
const styles$3 = {
  text: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE$1,
    color: COLOR$1
  },
  h1: {
    fontSize: H1_FONT_SIZE
  },
  h2: {
    fontSize: H2_FONT_SIZE
  },
  h3: {
    fontSize: H3_FONT_SIZE
  },
  h4: {
    fontSize: H4_FONT_SIZE
  },
  h5: {
    fontSize: H5_FONT_SIZE
  }
};
var textTheme = StyleSheet.create(styles$3);

const TITLE_FONT_SIZE = HEADER_4;
const TITLE_LINE_HEIGHT = TITLE_FONT_SIZE * 1.4;
const TITLE_COLOR = TEXT_COLOR;
const SUBTITLE_FONT_SIZE = HEADER_5;
const SUBTITLE_LINE_HEIGHT = SUBTITLE_FONT_SIZE * 1.4;
const SUBTITLE_COLOR = MUTED_TEXT_COLOR;
const WRAPPER_PADDING_VERTICAL$1 = MEDIUM_SIZE;
const WRAPPER_PADDING_HORIZONTAL$1 = MEDIUM_SIZE;
const WRAPPER_HEIGHT$1 = TITLE_LINE_HEIGHT + SUBTITLE_LINE_HEIGHT + WRAPPER_PADDING_VERTICAL$1 * 2;
const WRAPPER_BORDER_COLOR = BORDER_COLOR;
const styles$4 = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: WRAPPER_HEIGHT$1,
    paddingVertical: WRAPPER_PADDING_VERTICAL$1,
    paddingHorizontal: WRAPPER_PADDING_HORIZONTAL$1,
    borderBottomWidth: 0.8,
    borderBottomColor: WRAPPER_BORDER_COLOR
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '500',
    lineHeight: TITLE_LINE_HEIGHT,
    color: TITLE_COLOR
  },
  subtitle: {
    fontFamily: FONT_FAMILY,
    fontSize: SUBTITLE_FONT_SIZE,
    fontWeight: '500',
    lineHeight: SUBTITLE_LINE_HEIGHT,
    color: SUBTITLE_COLOR
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
};
var listItemTheme = StyleSheet.create(styles$4);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var REACT_STATICS = {
  childContextTypes: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }

    return targetComponent;
  }

  return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics;

const isOrientationLandscape = ({
  width,
  height
}) => width > height;
function withOrientation (WrappedComponent) {
  class withOrientation extends Component {
    constructor() {
      super();

      _defineProperty(this, "handleOrientationChange", ({
        window
      }) => {
        const isLandscape = isOrientationLandscape(window);
        this.setState({
          isLandscape
        });
      });

      const _isLandscape = isOrientationLandscape(Dimensions.get('window'));

      this.state = {
        isLandscape: _isLandscape
      };
    }

    componentDidMount() {
      if (typeof Dimensions.addEventListener === 'function') {
        Dimensions.addEventListener('change', this.handleOrientationChange);
      }
    }

    componentWillUnmount() {
      if (typeof Dimensions.removeEventListener === 'function') {
        Dimensions.removeEventListener('change', this.handleOrientationChange);
      }
    }

    render() {
      return createElement(WrappedComponent, _extends({}, this.props, this.state));
    }

  }

  return hoistNonReactStatics_cjs(withOrientation, WrappedComponent);
}

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const PAD_WIDTH = 768;
const IPADPRO11_WIDTH = 834;
const IPADPRO11_HEIGHT = 1194;
const IPADPRO129_HEIGHT = 1024;
const IPADPRO129_WIDTH = 1366;

const getResolvedDimensions = () => {
  const {
    width,
    height
  } = Dimensions.get('window');
  if (width === 0 && height === 0) return Dimensions.get('screen');
  return {
    width,
    height
  };
};

const {
  height: D_HEIGHT,
  width: D_WIDTH
} = getResolvedDimensions();
const PlatformConstants = Platform$1.constants || {};
const {
  minor = 0
} = PlatformConstants.reactNativeVersion || {};

const isIPhoneX = (() => {
  if (Platform$1.OS === 'web') return false;
  return Platform$1.OS === 'ios' && (D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH || D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT) || D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH || D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT;
})();

const isNewIPadPro = (() => {
  if (Platform$1.OS !== 'ios') return false;
  return D_HEIGHT === IPADPRO11_HEIGHT && D_WIDTH === IPADPRO11_WIDTH || D_HEIGHT === IPADPRO11_WIDTH && D_WIDTH === IPADPRO11_HEIGHT || D_HEIGHT === IPADPRO129_HEIGHT && D_WIDTH === IPADPRO129_WIDTH || D_HEIGHT === IPADPRO129_WIDTH && D_WIDTH === IPADPRO129_HEIGHT;
})();

const isIPad = (() => {
  if (Platform$1.OS !== 'ios' || isIPhoneX) return false; // if portrait and width is smaller than iPad width

  if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
    return false;
  } // if landscape and height is smaller that iPad height


  if (D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH) {
    return false;
  }

  return true;
})();

let _customStatusBarHeight = null;
let _customStatusBarHidden = null;

const statusBarHeight = isLandscape => {
  if (_customStatusBarHeight !== null) {
    return _customStatusBarHeight;
  }
  /**
   * This is a temporary workaround because we don't have a way to detect
   * if the status bar is translucent or opaque. If opaque, we don't need to
   * factor in the height here; if translucent (content renders under it) then
   * we do.
   */


  if (Platform$1.OS === 'android') {
    if (global.Expo) {
      return global.Expo.Constants.statusBarHeight;
    } else {
      return 0;
    }
  }

  if (isIPhoneX) {
    return isLandscape ? 0 : 44;
  }

  if (isNewIPadPro) {
    return 24;
  }

  if (isIPad) {
    return _customStatusBarHidden ? 0 : 20;
  }

  return isLandscape || _customStatusBarHidden ? 0 : 20;
};

const doubleFromPercentString = percent => {
  if (!percent.includes('%')) {
    return 0;
  }

  const dbl = parseFloat(percent) / 100;
  if (isNaN(dbl)) return 0;
  return dbl;
};

class SafeView extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      touchesTop: true,
      touchesBottom: true,
      touchesLeft: true,
      touchesRight: true,
      orientation: null,
      viewWidth: 0,
      viewHeight: 0
    });

    _defineProperty(this, "_handleLayout", e => {
      if (this.props.onLayout) this.props.onLayout(e);

      this._updateMeasurements();
    });

    _defineProperty(this, "_updateMeasurements", () => {
      if (!this._isMounted) return;
      if (!this.view) return;
      const {
        isLandscape
      } = this.props;
      const {
        orientation
      } = this.state;
      const newOrientation = isLandscape ? 'landscape' : 'portrait';

      if (orientation && orientation === newOrientation) {
        return;
      }

      const {
        width: WIDTH,
        height: HEIGHT
      } = getResolvedDimensions();
      this.view.getNode().measureInWindow((winX, winY, winWidth, winHeight) => {
        if (!this.view) {
          return;
        }

        let realY = winY;
        let realX = winX;

        if (realY >= HEIGHT) {
          realY = realY % HEIGHT;
        } else if (realY < 0) {
          realY = realY % HEIGHT + HEIGHT;
        }

        if (realX >= WIDTH) {
          realX = realX % WIDTH;
        } else if (realX < 0) {
          realX = realX % WIDTH + WIDTH;
        }

        const touchesTop = realY === 0;
        const touchesBottom = realY + winHeight >= HEIGHT;
        const touchesLeft = realX === 0;
        const touchesRight = realX + winWidth >= WIDTH;
        this.setState({
          touchesTop,
          touchesBottom,
          touchesLeft,
          touchesRight,
          orientation: newOrientation,
          viewWidth: winWidth,
          viewHeight: winHeight
        });
      });
    });

    _defineProperty(this, "_getSafeAreaStyle", () => {
      const {
        touchesTop,
        touchesBottom,
        touchesLeft,
        touchesRight
      } = this.state;
      const {
        forceInset,
        isLandscape
      } = this.props;

      const {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        viewStyle
      } = this._getViewStyles();

      const style = { ...viewStyle,
        paddingTop: touchesTop ? this._getInset('top') : 0,
        paddingBottom: touchesBottom ? this._getInset('bottom') : 0,
        paddingLeft: touchesLeft ? this._getInset('left') : 0,
        paddingRight: touchesRight ? this._getInset('right') : 0
      };

      if (forceInset) {
        Object.keys(forceInset).forEach(key => {
          let inset = forceInset[key];

          if (inset === 'always') {
            inset = this._getInset(key);
          }

          if (inset === 'never') {
            inset = 0;
          }

          switch (key) {
            case 'horizontal':
              {
                style.paddingLeft = inset;
                style.paddingRight = inset;
                break;
              }

            case 'vertical':
              {
                style.paddingTop = inset;
                style.paddingBottom = inset;
                break;
              }

            case 'left':
            case 'right':
            case 'top':
            case 'bottom':
              {
                const padding = `padding${key[0].toUpperCase()}${key.slice(1)}`;
                style[padding] = inset;
                break;
              }
          }
        });
      } // new height/width should only include padding from insets
      // height/width should not be affected by padding from style obj


      if (style.height && typeof style.height === 'number') {
        style.height += style.paddingTop + style.paddingBottom;
      }

      if (style.width && typeof style.width === 'number') {
        style.width += style.paddingLeft + style.paddingRight;
      }

      style.paddingTop = Math.max(style.paddingTop, paddingTop);
      style.paddingBottom = Math.max(style.paddingBottom, paddingBottom);
      style.paddingLeft = Math.max(style.paddingLeft, paddingLeft);
      style.paddingRight = Math.max(style.paddingRight, paddingRight);
      return style;
    });

    _defineProperty(this, "_getViewStyles", () => {
      const {
        viewWidth
      } = this.state; // get padding values from style to add back in after insets are determined
      // default precedence: padding[Side] -> vertical | horizontal -> padding -> 0

      let {
        padding = 0,
        paddingVertical = padding,
        paddingHorizontal = padding,
        paddingTop = paddingVertical,
        paddingBottom = paddingVertical,
        paddingLeft = paddingHorizontal,
        paddingRight = paddingHorizontal,
        ...viewStyle
      } = StyleSheet.flatten(this.props.style || {});

      if (typeof paddingTop !== 'number') {
        paddingTop = doubleFromPercentString(paddingTop) * viewWidth;
      }

      if (typeof paddingBottom !== 'number') {
        paddingBottom = doubleFromPercentString(paddingBottom) * viewWidth;
      }

      if (typeof paddingLeft !== 'number') {
        paddingLeft = doubleFromPercentString(paddingLeft) * viewWidth;
      }

      if (typeof paddingRight !== 'number') {
        paddingRight = doubleFromPercentString(paddingRight) * viewWidth;
      }

      return {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        viewStyle
      };
    });

    _defineProperty(this, "_getInset", key => {
      const {
        isLandscape
      } = this.props;
      return getInset(key, isLandscape);
    });
  }

  componentDidMount() {
    this._isMounted = true;
    InteractionManager.runAfterInteractions(() => {
      this._updateMeasurements();
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    this._updateMeasurements();
  }

  render() {
    const {
      forceInset = false,
      isLandscape,
      style,
      ...props
    } = this.props;

    const safeAreaStyle = this._getSafeAreaStyle();

    return React__default.createElement(Animated.View, _extends({
      ref: c => this.view = c,
      pointerEvents: "box-none"
    }, props, {
      onLayout: this._handleLayout,
      style: safeAreaStyle
    }));
  }

}

_defineProperty(SafeView, "setStatusBarHeight", height => {
  _customStatusBarHeight = height;
});

_defineProperty(SafeView, "setStatusBarHidden", hidden => {
  _customStatusBarHidden = hidden;
});

function getInset(key, isLandscape) {
  switch (key) {
    case 'horizontal':
    case 'right':
    case 'left':
      {
        return isLandscape ? isIPhoneX ? 44 : 0 : 0;
      }

    case 'vertical':
    case 'top':
      {
        return statusBarHeight(isLandscape);
      }

    case 'bottom':
      {
        if (isIPhoneX) {
          return isLandscape ? 24 : 34;
        }

        if (isNewIPadPro) {
          return 20;
        }

        return 0;
      }
  }
}
const SafeAreaView = withOrientation(SafeView);

const bottomInset = getInset('bottom');
const WRAPPER_MARGIN_HORIZONTAL = MEDIUM_SIZE;
const WRAPPER_NO_HOME_BAR_MARGIN_BOTTOM = MEDIUM_SIZE;
const WRAPPER_NO_HOME_BAR_PADDING_BOTTOM = 0;
const WRAPPER_WITH_HOME_BAR_MARGIN_BOTTOM = bottomInset;
const WRAPPER_WITH_HOME_BAR_PADDING_BOTTOM = 0;
const TEXT_FONT_SIZE$1 = HEADER_4;
const BUTTON_PADDING_VERTICAL = MEDIUM_SIZE;
const BUTTON_PADDING_HORIZONTAL = MEDIUM_SIZE;
const BUTTON_HEIGHT = TEXT_FONT_SIZE$1 + BUTTON_PADDING_VERTICAL * 2;
const BUTTON_BORDER_RADIUS = BUTTON_HEIGHT * 0.5;
const FILLED_TEXT_COLOR$1 = INVERTED_TEXT_COLOR;
const FILLED_BACKGROUND_COLOR$1 = PRIMARY_COLOR;
const DISABLED_TEXT_COLOR$2 = INVERTED_TEXT_COLOR;
const DISABLED_BACKGROUND_COLOR$2 = DISABLED_BACKGROUND_COLOR;
const styles$5 = {
  wrapper: {
    marginHorizontal: WRAPPER_MARGIN_HORIZONTAL,
    backgroundColor: FILLED_BACKGROUND_COLOR$1,
    borderRadius: BUTTON_BORDER_RADIUS
  },
  wrapperWithoutHomeBar: {
    marginBottom: WRAPPER_NO_HOME_BAR_MARGIN_BOTTOM,
    paddingBottom: WRAPPER_NO_HOME_BAR_PADDING_BOTTOM
  },
  wrapperWithHomeBar: {
    marginBottom: WRAPPER_WITH_HOME_BAR_MARGIN_BOTTOM,
    paddingBottom: WRAPPER_WITH_HOME_BAR_PADDING_BOTTOM
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: BUTTON_HEIGHT,
    paddingHorizontal: BUTTON_PADDING_HORIZONTAL
  },
  text: {
    fontFamily: FONT_FAMILY,
    fontSize: TEXT_FONT_SIZE$1,
    lineHeight: TEXT_FONT_SIZE$1,
    color: FILLED_TEXT_COLOR$1
  },
  loadingIndicator: {
    color: FILLED_TEXT_COLOR$1
  },
  disabledWrapper: {
    backgroundColor: DISABLED_BACKGROUND_COLOR$2
  },
  disabledText: {
    color: DISABLED_TEXT_COLOR$2
  }
};
var bottomButtonTheme = StyleSheet.create(styles$5);

const WRAPPER_BACKGROUND_COLOR = GREY_5;
const ACTIONS_BORDER_COLOR = BORDER_COLOR;
const ACTION_TEXT_FONT_SIZE = HEADER_4;
const ACTION_TEXT_LINE_HEIGHT = HEADER_5;
const ACTION_TEXT_COLOR = LINK_TEXT_COLOR;
const ACTION_PADDING_VERTICAL = MEDIUM_SIZE;
const ACTION_PADDING_HORIZONTAL = MEDIUM_SIZE;
const ACTION_HEIGHT = ACTION_TEXT_LINE_HEIGHT + ACTION_PADDING_VERTICAL * 2;
const styles$6 = {
  wrapper: {
    backgroundColor: WRAPPER_BACKGROUND_COLOR
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ACTIONS_BORDER_COLOR
  },
  action: {
    justifyContent: 'center',
    height: ACTION_HEIGHT,
    paddingHorizontal: ACTION_PADDING_HORIZONTAL
  },
  actionText: {
    // DateTimePicker uses system font
    fontSize: ACTION_TEXT_FONT_SIZE,
    color: ACTION_TEXT_COLOR
  }
};
var dateTimePickerTheme = StyleSheet.create(styles$6);

const CONTAINER_PADDING = MEDIUM_SIZE;
const styles$7 = {
  container: {
    padding: CONTAINER_PADDING
  },
  fluid: {
    flex: 1
  }
};
var containerTheme = StyleSheet.create(styles$7);

const BACKGROUND_COLOR$1 = BACKGROUND_COLOR;
const BORDER_RADIUS = SMALL_SIZE;
const styles$8 = {
  card: {
    overflow: 'hidden',
    backgroundColor: BACKGROUND_COLOR$1,
    borderRadius: BORDER_RADIUS
  }
};
var cardTheme = StyleSheet.create(styles$8);

var heroTheme = {
  variables,
  button: buttonTheme,
  textInput: textInputTheme,
  icon: iconTheme,
  text: textTheme,
  listItem: listItemTheme,
  bottomButton: bottomButtonTheme,
  dateTimePicker: dateTimePickerTheme,
  container: containerTheme,
  card: cardTheme
};

const IP6_WIDTH = 375;
const IP6_HEIGHT = 667;
const isWeb$1 = Platform$1.OS === 'web';
const {
  height,
  width
} = Dimensions.get('window');

const scaleByWidth = (size, baseWidth = IP6_WIDTH) => Math.floor(width / baseWidth * size);

const scaleByHeight = (size, baseHeight = IP6_HEIGHT) => Math.floor(height / baseHeight * size);

const scale = size => {
  const phoneRatio = height / width;
  if (phoneRatio > 1.6) return scaleByWidth(size);
  return scaleByHeight(size);
};

const BLUE$1 = '#1dbeee';
const FOCUS_BLUE_1$1 = '#003580';
const FOCUS_BLUE_2$1 = '#40679f';
const FOCUS_BLUE_3$1 = '#5d7ead';
const BACKGROUND_BLUE_1$1 = '#347ab7';
const BACKGROUND_BLUE_2$1 = '#b5eeff';
const BACKGROUND_BLUE_3$1 = '#e6f7ff';
const RED$1 = '#de350b';
const ORANGE$1 = '#ffa234';
const MAGENTA = '#ee1d84';
const BLACK$1 = '#000000';
const GREY_1$1 = '#2b2b2b';
const GREY_2$1 = '#71767c';
const GREY_3$1 = '#a3a6ac';
const GREY_4$1 = '#d9dbdf';
const GREY_5$1 = '#f5f6f8';
const WHITE$1 = '#fcfcfc';
const BASE_SIZE$1 = isWeb$1 ? 16 : scale(16);
const FONT_SIZE$2 = isWeb$1 ? 16 : scale(16); // Edit these 👇

const FONT_FAMILY$1 = isWeb$1 ? undefined : 'Proxima Nova';
const PRIMARY_COLOR$1 = BLUE$1;
const DANGER_COLOR$1 = MAGENTA;
const TEXT_COLOR$1 = BLACK$1;
const INVERTED_TEXT_COLOR$1 = WHITE$1;
const DISABLED_TEXT_COLOR$3 = GREY_3$1;
const MUTED_TEXT_COLOR$1 = GREY_3$1;
const LINK_TEXT_COLOR$1 = BLUE$1;
const BORDER_COLOR$1 = GREY_4$1;
const BACKGROUND_COLOR$2 = WHITE$1;
const DISABLED_BACKGROUND_COLOR$3 = GREY_4$1;
const SMALL_SIZE$1 = BASE_SIZE$1 * 0.5;
const MEDIUM_SIZE$1 = BASE_SIZE$1 * 1;
const LARGE_SIZE$1 = BASE_SIZE$1 * 1.5;
const HEADER_5$1 = FONT_SIZE$2 * 0.83;
const HEADER_4$1 = FONT_SIZE$2 * 1;
const HEADER_3$1 = FONT_SIZE$2 * 1.17;
const HEADER_2$1 = FONT_SIZE$2 * 1.5;
const HEADER_1$1 = FONT_SIZE$2 * 2;

var variables$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BLUE: BLUE$1,
  FOCUS_BLUE_1: FOCUS_BLUE_1$1,
  FOCUS_BLUE_2: FOCUS_BLUE_2$1,
  FOCUS_BLUE_3: FOCUS_BLUE_3$1,
  BACKGROUND_BLUE_1: BACKGROUND_BLUE_1$1,
  BACKGROUND_BLUE_2: BACKGROUND_BLUE_2$1,
  BACKGROUND_BLUE_3: BACKGROUND_BLUE_3$1,
  RED: RED$1,
  ORANGE: ORANGE$1,
  MAGENTA: MAGENTA,
  BLACK: BLACK$1,
  GREY_1: GREY_1$1,
  GREY_2: GREY_2$1,
  GREY_3: GREY_3$1,
  GREY_4: GREY_4$1,
  GREY_5: GREY_5$1,
  WHITE: WHITE$1,
  BASE_SIZE: BASE_SIZE$1,
  FONT_SIZE: FONT_SIZE$2,
  FONT_FAMILY: FONT_FAMILY$1,
  PRIMARY_COLOR: PRIMARY_COLOR$1,
  DANGER_COLOR: DANGER_COLOR$1,
  TEXT_COLOR: TEXT_COLOR$1,
  INVERTED_TEXT_COLOR: INVERTED_TEXT_COLOR$1,
  DISABLED_TEXT_COLOR: DISABLED_TEXT_COLOR$3,
  MUTED_TEXT_COLOR: MUTED_TEXT_COLOR$1,
  LINK_TEXT_COLOR: LINK_TEXT_COLOR$1,
  BORDER_COLOR: BORDER_COLOR$1,
  BACKGROUND_COLOR: BACKGROUND_COLOR$2,
  DISABLED_BACKGROUND_COLOR: DISABLED_BACKGROUND_COLOR$3,
  SMALL_SIZE: SMALL_SIZE$1,
  MEDIUM_SIZE: MEDIUM_SIZE$1,
  LARGE_SIZE: LARGE_SIZE$1,
  HEADER_5: HEADER_5$1,
  HEADER_4: HEADER_4$1,
  HEADER_3: HEADER_3$1,
  HEADER_2: HEADER_2$1,
  HEADER_1: HEADER_1$1
});

const TEXT_FONT_SIZE$2 = HEADER_4$1;
const WRAPPER_PADDING_VERTICAL$2 = MEDIUM_SIZE$1;
const WRAPPER_PADDING_HORIZONTAL$2 = MEDIUM_SIZE$1;
const WRAPPER_HEIGHT$2 = TEXT_FONT_SIZE$2 + WRAPPER_PADDING_VERTICAL$2 * 2;
const WRAPPER_BORDER_RADIUS$1 = WRAPPER_HEIGHT$2 * 0.5;
const FILLED_TEXT_COLOR$2 = INVERTED_TEXT_COLOR$1;
const FILLED_BACKGROUND_COLOR$2 = PRIMARY_COLOR$1;
const OUTLINED_TEXT_COLOR$1 = PRIMARY_COLOR$1;
const OUTLINED_BORDER_COLOR$1 = PRIMARY_COLOR$1;
const DISABLED_TEXT_COLOR$4 = INVERTED_TEXT_COLOR$1;
const DISABLED_BACKGROUND_COLOR$4 = DISABLED_BACKGROUND_COLOR$3;
const styles$9 = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: WRAPPER_HEIGHT$2,
    paddingHorizontal: WRAPPER_PADDING_HORIZONTAL$2,
    borderRadius: WRAPPER_BORDER_RADIUS$1
  },
  text: {
    fontFamily: FONT_FAMILY$1,
    fontSize: TEXT_FONT_SIZE$2,
    lineHeight: TEXT_FONT_SIZE$2
  },
  filledWrapper: {
    backgroundColor: FILLED_BACKGROUND_COLOR$2
  },
  filledText: {
    color: FILLED_TEXT_COLOR$2
  },
  filledLoadingIndicator: {
    color: FILLED_TEXT_COLOR$2
  },
  outlinedWrapper: {
    borderWidth: 1.2,
    borderColor: OUTLINED_BORDER_COLOR$1,
    backgroundColor: 'transparent'
  },
  outlinedText: {
    fontWeight: '500',
    color: OUTLINED_TEXT_COLOR$1
  },
  outlinedLoadingIndicator: {
    color: OUTLINED_TEXT_COLOR$1
  },
  disabledWrapper: {
    borderWidth: 0,
    backgroundColor: DISABLED_BACKGROUND_COLOR$4
  },
  disabledText: {
    color: DISABLED_TEXT_COLOR$4
  }
};
var buttonTheme$1 = StyleSheet.create(styles$9);

const WRAPPER_MARGIN_VERTICAL$1 = MEDIUM_SIZE$1;
const LABEL_FONT_SIZE$1 = HEADER_5$1;
const LABEL_COLOR$1 = MUTED_TEXT_COLOR$1;
const INPUT_FONT_SIZE$1 = HEADER_4$1;
const INPUT_PADDING_VERTICAL$1 = MEDIUM_SIZE$1;
const INPUT_HEIGHT$1 = INPUT_FONT_SIZE$1 + INPUT_PADDING_VERTICAL$1 * 2;
const INPUT_BORDER_COLOR$1 = BORDER_COLOR$1;
const INPUT_COLOR$1 = TEXT_COLOR$1;
const ICON_COLOR$1 = MUTED_TEXT_COLOR$1;
const ERROR_FONT_SIZE$1 = HEADER_5$1;
const ERROR_MARGIN_VERTICAL$1 = SMALL_SIZE$1;
const ERROR_COLOR$1 = DANGER_COLOR$1;
const styles$a = {
  wrapper: {
    marginBottom: WRAPPER_MARGIN_VERTICAL$1
  },
  label: {
    height: LABEL_FONT_SIZE$1,
    lineHeight: LABEL_FONT_SIZE$1,
    fontFamily: FONT_FAMILY$1,
    fontSize: LABEL_FONT_SIZE$1,
    fontWeight: '500',
    color: LABEL_COLOR$1
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: INPUT_BORDER_COLOR$1
  },
  baseTextInput: {
    flex: 1,
    paddingTop: INPUT_PADDING_VERTICAL$1,
    paddingBottom: INPUT_PADDING_VERTICAL$1,
    textAlignVertical: 'center',
    fontFamily: FONT_FAMILY$1,
    fontSize: INPUT_FONT_SIZE$1,
    color: INPUT_COLOR$1
  },
  icon: {
    height: INPUT_HEIGHT$1,
    color: ICON_COLOR$1
  },
  errorMessage: {
    height: ERROR_FONT_SIZE$1,
    lineHeight: ERROR_FONT_SIZE$1,
    marginTop: ERROR_MARGIN_VERTICAL$1,
    fontFamily: FONT_FAMILY$1,
    fontSize: ERROR_FONT_SIZE$1,
    fontWeight: '500',
    color: ERROR_COLOR$1
  },
  errorLabel: {
    color: ERROR_COLOR$1
  },
  errorTextInput: {
    borderBottomColor: ERROR_COLOR$1
  },
  errorIcon: {
    color: ERROR_COLOR$1
  },
  activeLabel: {
    color: PRIMARY_COLOR$1
  },
  activeTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_COLOR$1
  },
  activeIcon: {
    color: PRIMARY_COLOR$1
  },
  disabledBaseTextInput: {
    color: DISABLED_TEXT_COLOR$3
  }
};
var textInputTheme$1 = StyleSheet.create(styles$a);

const COLOR$2 = TEXT_COLOR$1;
const styles$b = {
  icon: {
    color: COLOR$2
  }
};
var iconTheme$1 = StyleSheet.create(styles$b);

const COLOR$3 = TEXT_COLOR$1;
const FONT_SIZE$3 = HEADER_4$1;
const H1_FONT_SIZE$1 = HEADER_1$1;
const H2_FONT_SIZE$1 = HEADER_2$1;
const H3_FONT_SIZE$1 = HEADER_3$1;
const H4_FONT_SIZE$1 = HEADER_4$1;
const H5_FONT_SIZE$1 = HEADER_5$1;
const styles$c = {
  text: {
    fontFamily: FONT_FAMILY$1,
    fontSize: FONT_SIZE$3,
    color: COLOR$3
  },
  h1: {
    fontSize: H1_FONT_SIZE$1
  },
  h2: {
    fontSize: H2_FONT_SIZE$1
  },
  h3: {
    fontSize: H3_FONT_SIZE$1
  },
  h4: {
    fontSize: H4_FONT_SIZE$1
  },
  h5: {
    fontSize: H5_FONT_SIZE$1
  }
};
var textTheme$1 = StyleSheet.create(styles$c);

const TITLE_FONT_SIZE$1 = HEADER_4$1;
const TITLE_LINE_HEIGHT$1 = TITLE_FONT_SIZE$1 * 1.4;
const TITLE_COLOR$1 = TEXT_COLOR$1;
const SUBTITLE_FONT_SIZE$1 = HEADER_5$1;
const SUBTITLE_LINE_HEIGHT$1 = SUBTITLE_FONT_SIZE$1 * 1.4;
const SUBTITLE_COLOR$1 = MUTED_TEXT_COLOR$1;
const WRAPPER_PADDING_VERTICAL$3 = MEDIUM_SIZE$1;
const WRAPPER_PADDING_HORIZONTAL$3 = MEDIUM_SIZE$1;
const WRAPPER_HEIGHT$3 = TITLE_LINE_HEIGHT$1 + SUBTITLE_LINE_HEIGHT$1 + WRAPPER_PADDING_VERTICAL$3 * 2;
const WRAPPER_BORDER_COLOR$1 = BORDER_COLOR$1;
const styles$d = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: WRAPPER_HEIGHT$3,
    paddingVertical: WRAPPER_PADDING_VERTICAL$3,
    paddingHorizontal: WRAPPER_PADDING_HORIZONTAL$3,
    borderBottomWidth: 0.8,
    borderBottomColor: WRAPPER_BORDER_COLOR$1
  },
  title: {
    fontFamily: FONT_FAMILY$1,
    fontSize: TITLE_FONT_SIZE$1,
    fontWeight: '500',
    lineHeight: TITLE_LINE_HEIGHT$1,
    color: TITLE_COLOR$1
  },
  subtitle: {
    fontFamily: FONT_FAMILY$1,
    fontSize: SUBTITLE_FONT_SIZE$1,
    fontWeight: '500',
    lineHeight: SUBTITLE_LINE_HEIGHT$1,
    color: SUBTITLE_COLOR$1
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
};
var listItemTheme$1 = StyleSheet.create(styles$d);

const bottomInset$1 = getInset('bottom');
const WRAPPER_MARGIN_HORIZONTAL$1 = 0;
const WRAPPER_NO_HOME_BAR_MARGIN_BOTTOM$1 = 0;
const WRAPPER_NO_HOME_BAR_PADDING_BOTTOM$1 = 0;
const WRAPPER_WITH_HOME_BAR_MARGIN_BOTTOM$1 = 0;
const WRAPPER_WITH_HOME_BAR_PADDING_BOTTOM$1 = bottomInset$1;
const TEXT_FONT_SIZE$3 = HEADER_4$1;
const BUTTON_PADDING_VERTICAL$1 = MEDIUM_SIZE$1;
const BUTTON_PADDING_HORIZONTAL$1 = MEDIUM_SIZE$1;
const BUTTON_HEIGHT$1 = TEXT_FONT_SIZE$3 + BUTTON_PADDING_VERTICAL$1 * 2;
const BUTTON_BORDER_RADIUS$1 = 0;
const FILLED_TEXT_COLOR$3 = INVERTED_TEXT_COLOR$1;
const FILLED_BACKGROUND_COLOR$3 = PRIMARY_COLOR$1;
const DISABLED_TEXT_COLOR$5 = INVERTED_TEXT_COLOR$1;
const DISABLED_BACKGROUND_COLOR$5 = DISABLED_BACKGROUND_COLOR$3;
const styles$e = {
  wrapper: {
    marginHorizontal: WRAPPER_MARGIN_HORIZONTAL$1,
    backgroundColor: FILLED_BACKGROUND_COLOR$3,
    borderRadius: BUTTON_BORDER_RADIUS$1
  },
  wrapperWithoutHomeBar: {
    marginBottom: WRAPPER_NO_HOME_BAR_MARGIN_BOTTOM$1,
    paddingBottom: WRAPPER_NO_HOME_BAR_PADDING_BOTTOM$1
  },
  wrapperWithHomeBar: {
    marginBottom: WRAPPER_WITH_HOME_BAR_MARGIN_BOTTOM$1,
    paddingBottom: WRAPPER_WITH_HOME_BAR_PADDING_BOTTOM$1
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: BUTTON_HEIGHT$1,
    paddingHorizontal: BUTTON_PADDING_HORIZONTAL$1
  },
  text: {
    fontFamily: FONT_FAMILY$1,
    fontSize: TEXT_FONT_SIZE$3,
    lineHeight: TEXT_FONT_SIZE$3,
    color: FILLED_TEXT_COLOR$3
  },
  loadingIndicator: {
    color: FILLED_TEXT_COLOR$3
  },
  disabledWrapper: {
    backgroundColor: DISABLED_BACKGROUND_COLOR$5
  },
  disabledText: {
    color: DISABLED_TEXT_COLOR$5
  }
};
var bottomButtonTheme$1 = StyleSheet.create(styles$e);

const WRAPPER_BACKGROUND_COLOR$1 = GREY_5$1;
const ACTIONS_BORDER_COLOR$1 = BORDER_COLOR$1;
const ACTION_TEXT_FONT_SIZE$1 = HEADER_4$1;
const ACTION_TEXT_LINE_HEIGHT$1 = HEADER_5$1;
const ACTION_TEXT_COLOR$1 = LINK_TEXT_COLOR$1;
const ACTION_PADDING_VERTICAL$1 = MEDIUM_SIZE$1;
const ACTION_PADDING_HORIZONTAL$1 = MEDIUM_SIZE$1;
const ACTION_HEIGHT$1 = ACTION_TEXT_LINE_HEIGHT$1 + ACTION_PADDING_VERTICAL$1 * 2;
const styles$f = {
  wrapper: {
    backgroundColor: WRAPPER_BACKGROUND_COLOR$1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ACTIONS_BORDER_COLOR$1
  },
  action: {
    justifyContent: 'center',
    height: ACTION_HEIGHT$1,
    paddingHorizontal: ACTION_PADDING_HORIZONTAL$1
  },
  actionText: {
    // DateTimePicker uses system font
    fontSize: ACTION_TEXT_FONT_SIZE$1,
    color: ACTION_TEXT_COLOR$1
  }
};
var dateTimePickerTheme$1 = StyleSheet.create(styles$f);

const CONTAINER_PADDING$1 = MEDIUM_SIZE$1;
const styles$g = {
  container: {
    padding: CONTAINER_PADDING$1
  },
  fluid: {
    flex: 1
  }
};
var containerTheme$1 = StyleSheet.create(styles$g);

const BACKGROUND_COLOR$3 = BACKGROUND_COLOR$2;
const BORDER_RADIUS$1 = SMALL_SIZE$1;
const styles$h = {
  card: {
    overflow: 'hidden',
    backgroundColor: BACKGROUND_COLOR$3,
    borderRadius: BORDER_RADIUS$1
  }
};
var cardTheme$1 = StyleSheet.create(styles$h);

var legacyTheme = {
  variables: variables$1,
  button: buttonTheme$1,
  textInput: textInputTheme$1,
  icon: iconTheme$1,
  text: textTheme$1,
  listItem: listItemTheme$1,
  bottomButton: bottomButtonTheme$1,
  dateTimePicker: dateTimePickerTheme$1,
  container: containerTheme$1,
  card: cardTheme$1
};

const isWeb$2 = Platform$1.OS === 'web';
const BLUE$2 = '#1dbeee';
const FOCUS_BLUE_1$2 = '#003580';
const FOCUS_BLUE_2$2 = '#40679f';
const FOCUS_BLUE_3$2 = '#5d7ead';
const BACKGROUND_BLUE_1$2 = '#347ab7';
const BACKGROUND_BLUE_2$2 = '#b5eeff';
const BACKGROUND_BLUE_3$2 = '#e6f7ff';
const RED$2 = '#de350b';
const BLACK$2 = '#111111';
const GREY_1$2 = '#444444';
const GREY_2$2 = '#777777';
const GREY_3$2 = '#a3a6ac';
const GREY_4$2 = '#d9dbdf';
const GREY_5$2 = '#f5f6f8';
const WHITE$2 = '#fcfcfc';
const BASE_SIZE$2 = isWeb$2 ? 16 : normalize(13);
const FONT_SIZE$4 = isWeb$2 ? 16 : normalize(13); // Edit these 👇

const FONT_FAMILY$2 = isWeb$2 ? undefined : 'Proxima Nova';
const PRIMARY_COLOR$2 = BLUE$2;
const DANGER_COLOR$2 = RED$2;
const TEXT_COLOR$2 = GREY_5$2;
const INVERTED_TEXT_COLOR$2 = BLACK$2;
const DISABLED_TEXT_COLOR$6 = GREY_2$2;
const MUTED_TEXT_COLOR$2 = GREY_2$2;
const LINK_TEXT_COLOR$2 = BLUE$2;
const BORDER_COLOR$2 = GREY_1$2;
const BACKGROUND_COLOR$4 = BLACK$2;
const DISABLED_BACKGROUND_COLOR$6 = GREY_1$2;
const SMALL_SIZE$2 = BASE_SIZE$2 * 0.5;
const MEDIUM_SIZE$2 = BASE_SIZE$2 * 1;
const LARGE_SIZE$2 = BASE_SIZE$2 * 1.5;
const HEADER_5$2 = FONT_SIZE$4 * 0.83;
const HEADER_4$2 = FONT_SIZE$4 * 1;
const HEADER_3$2 = FONT_SIZE$4 * 1.17;
const HEADER_2$2 = FONT_SIZE$4 * 1.5;
const HEADER_1$2 = FONT_SIZE$4 * 2;

var variables$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BLUE: BLUE$2,
  FOCUS_BLUE_1: FOCUS_BLUE_1$2,
  FOCUS_BLUE_2: FOCUS_BLUE_2$2,
  FOCUS_BLUE_3: FOCUS_BLUE_3$2,
  BACKGROUND_BLUE_1: BACKGROUND_BLUE_1$2,
  BACKGROUND_BLUE_2: BACKGROUND_BLUE_2$2,
  BACKGROUND_BLUE_3: BACKGROUND_BLUE_3$2,
  RED: RED$2,
  BLACK: BLACK$2,
  GREY_1: GREY_1$2,
  GREY_2: GREY_2$2,
  GREY_3: GREY_3$2,
  GREY_4: GREY_4$2,
  GREY_5: GREY_5$2,
  WHITE: WHITE$2,
  BASE_SIZE: BASE_SIZE$2,
  FONT_SIZE: FONT_SIZE$4,
  FONT_FAMILY: FONT_FAMILY$2,
  PRIMARY_COLOR: PRIMARY_COLOR$2,
  DANGER_COLOR: DANGER_COLOR$2,
  TEXT_COLOR: TEXT_COLOR$2,
  INVERTED_TEXT_COLOR: INVERTED_TEXT_COLOR$2,
  DISABLED_TEXT_COLOR: DISABLED_TEXT_COLOR$6,
  MUTED_TEXT_COLOR: MUTED_TEXT_COLOR$2,
  LINK_TEXT_COLOR: LINK_TEXT_COLOR$2,
  BORDER_COLOR: BORDER_COLOR$2,
  BACKGROUND_COLOR: BACKGROUND_COLOR$4,
  DISABLED_BACKGROUND_COLOR: DISABLED_BACKGROUND_COLOR$6,
  SMALL_SIZE: SMALL_SIZE$2,
  MEDIUM_SIZE: MEDIUM_SIZE$2,
  LARGE_SIZE: LARGE_SIZE$2,
  HEADER_5: HEADER_5$2,
  HEADER_4: HEADER_4$2,
  HEADER_3: HEADER_3$2,
  HEADER_2: HEADER_2$2,
  HEADER_1: HEADER_1$2
});

const TEXT_FONT_SIZE$4 = HEADER_4$2;
const WRAPPER_PADDING_VERTICAL$4 = MEDIUM_SIZE$2;
const WRAPPER_PADDING_HORIZONTAL$4 = MEDIUM_SIZE$2;
const WRAPPER_HEIGHT$4 = TEXT_FONT_SIZE$4 + WRAPPER_PADDING_VERTICAL$4 * 2;
const WRAPPER_BORDER_RADIUS$2 = WRAPPER_HEIGHT$4 * 0.5;
const FILLED_TEXT_COLOR$4 = INVERTED_TEXT_COLOR$2;
const FILLED_BACKGROUND_COLOR$4 = PRIMARY_COLOR$2;
const OUTLINED_TEXT_COLOR$2 = PRIMARY_COLOR$2;
const OUTLINED_BORDER_COLOR$2 = PRIMARY_COLOR$2;
const DISABLED_TEXT_COLOR$7 = INVERTED_TEXT_COLOR$2;
const DISABLED_BACKGROUND_COLOR$7 = DISABLED_BACKGROUND_COLOR$6;
const styles$i = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: WRAPPER_HEIGHT$4,
    paddingHorizontal: WRAPPER_PADDING_HORIZONTAL$4,
    borderRadius: WRAPPER_BORDER_RADIUS$2
  },
  text: {
    fontFamily: FONT_FAMILY$2,
    fontSize: TEXT_FONT_SIZE$4,
    lineHeight: TEXT_FONT_SIZE$4
  },
  filledWrapper: {
    backgroundColor: FILLED_BACKGROUND_COLOR$4
  },
  filledText: {
    color: FILLED_TEXT_COLOR$4
  },
  filledLoadingIndicator: {
    color: FILLED_TEXT_COLOR$4
  },
  outlinedWrapper: {
    borderWidth: 1.2,
    borderColor: OUTLINED_BORDER_COLOR$2,
    backgroundColor: 'transparent'
  },
  outlinedText: {
    fontWeight: '500',
    color: OUTLINED_TEXT_COLOR$2
  },
  outlinedLoadingIndicator: {
    color: OUTLINED_TEXT_COLOR$2
  },
  disabledWrapper: {
    borderWidth: 0,
    backgroundColor: DISABLED_BACKGROUND_COLOR$7
  },
  disabledText: {
    color: DISABLED_TEXT_COLOR$7
  }
};
var buttonTheme$2 = StyleSheet.create(styles$i);

const WRAPPER_MARGIN_VERTICAL$2 = MEDIUM_SIZE$2;
const LABEL_FONT_SIZE$2 = HEADER_5$2;
const LABEL_COLOR$2 = MUTED_TEXT_COLOR$2;
const INPUT_FONT_SIZE$2 = HEADER_4$2;
const INPUT_PADDING_VERTICAL$2 = MEDIUM_SIZE$2;
const INPUT_HEIGHT$2 = INPUT_FONT_SIZE$2 + INPUT_PADDING_VERTICAL$2 * 2;
const INPUT_BORDER_COLOR$2 = BORDER_COLOR$2;
const INPUT_COLOR$2 = TEXT_COLOR$2;
const ICON_COLOR$2 = MUTED_TEXT_COLOR$2;
const ERROR_FONT_SIZE$2 = HEADER_5$2;
const ERROR_MARGIN_VERTICAL$2 = SMALL_SIZE$2;
const ERROR_COLOR$2 = DANGER_COLOR$2;
const styles$j = {
  wrapper: {
    marginBottom: WRAPPER_MARGIN_VERTICAL$2
  },
  label: {
    height: LABEL_FONT_SIZE$2,
    lineHeight: LABEL_FONT_SIZE$2,
    fontFamily: FONT_FAMILY$2,
    fontSize: LABEL_FONT_SIZE$2,
    fontWeight: '500',
    color: LABEL_COLOR$2
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: INPUT_BORDER_COLOR$2
  },
  baseTextInput: {
    flex: 1,
    paddingTop: INPUT_PADDING_VERTICAL$2,
    paddingBottom: INPUT_PADDING_VERTICAL$2,
    textAlignVertical: 'center',
    fontFamily: FONT_FAMILY$2,
    fontSize: INPUT_FONT_SIZE$2,
    color: INPUT_COLOR$2
  },
  icon: {
    height: INPUT_HEIGHT$2,
    color: ICON_COLOR$2
  },
  errorMessage: {
    height: ERROR_FONT_SIZE$2,
    lineHeight: ERROR_FONT_SIZE$2,
    marginTop: ERROR_MARGIN_VERTICAL$2,
    fontFamily: FONT_FAMILY$2,
    fontSize: ERROR_FONT_SIZE$2,
    fontWeight: '500',
    color: ERROR_COLOR$2
  },
  errorLabel: {
    color: ERROR_COLOR$2
  },
  errorTextInput: {
    borderBottomColor: ERROR_COLOR$2
  },
  errorIcon: {
    color: ERROR_COLOR$2
  },
  disabledBaseTextInput: {
    color: DISABLED_TEXT_COLOR$6
  }
};
var textInputTheme$2 = StyleSheet.create(styles$j);

const COLOR$4 = TEXT_COLOR$2;
const styles$k = {
  icon: {
    color: COLOR$4
  }
};
var iconTheme$2 = StyleSheet.create(styles$k);

const COLOR$5 = TEXT_COLOR$2;
const FONT_SIZE$5 = HEADER_4$2;
const H1_FONT_SIZE$2 = HEADER_1$2;
const H2_FONT_SIZE$2 = HEADER_2$2;
const H3_FONT_SIZE$2 = HEADER_3$2;
const H4_FONT_SIZE$2 = HEADER_4$2;
const H5_FONT_SIZE$2 = HEADER_5$2;
const styles$l = {
  text: {
    fontFamily: FONT_FAMILY$2,
    fontSize: FONT_SIZE$5,
    color: COLOR$5
  },
  h1: {
    fontSize: H1_FONT_SIZE$2
  },
  h2: {
    fontSize: H2_FONT_SIZE$2
  },
  h3: {
    fontSize: H3_FONT_SIZE$2
  },
  h4: {
    fontSize: H4_FONT_SIZE$2
  },
  h5: {
    fontSize: H5_FONT_SIZE$2
  }
};
var textTheme$2 = StyleSheet.create(styles$l);

const TITLE_FONT_SIZE$2 = HEADER_4$2;
const TITLE_LINE_HEIGHT$2 = TITLE_FONT_SIZE$2 * 1.4;
const TITLE_COLOR$2 = TEXT_COLOR$2;
const SUBTITLE_FONT_SIZE$2 = HEADER_5$2;
const SUBTITLE_LINE_HEIGHT$2 = SUBTITLE_FONT_SIZE$2 * 1.4;
const SUBTITLE_COLOR$2 = MUTED_TEXT_COLOR$2;
const WRAPPER_PADDING_VERTICAL$5 = MEDIUM_SIZE$2;
const WRAPPER_PADDING_HORIZONTAL$5 = MEDIUM_SIZE$2;
const WRAPPER_HEIGHT$5 = TITLE_LINE_HEIGHT$2 + SUBTITLE_LINE_HEIGHT$2 + WRAPPER_PADDING_VERTICAL$5 * 2;
const WRAPPER_BORDER_COLOR$2 = BORDER_COLOR$2;
const styles$m = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: WRAPPER_HEIGHT$5,
    paddingVertical: WRAPPER_PADDING_VERTICAL$5,
    paddingHorizontal: WRAPPER_PADDING_HORIZONTAL$5,
    borderBottomWidth: 0.8,
    borderBottomColor: WRAPPER_BORDER_COLOR$2
  },
  title: {
    fontFamily: FONT_FAMILY$2,
    fontSize: TITLE_FONT_SIZE$2,
    fontWeight: '500',
    lineHeight: TITLE_LINE_HEIGHT$2,
    color: TITLE_COLOR$2
  },
  subtitle: {
    fontFamily: FONT_FAMILY$2,
    fontSize: SUBTITLE_FONT_SIZE$2,
    fontWeight: '500',
    lineHeight: SUBTITLE_LINE_HEIGHT$2,
    color: SUBTITLE_COLOR$2
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
};
var listItemTheme$2 = StyleSheet.create(styles$m);

const bottomInset$2 = getInset('bottom');
const WRAPPER_MARGIN_HORIZONTAL$2 = MEDIUM_SIZE$2;
const WRAPPER_NO_HOME_BAR_MARGIN_BOTTOM$2 = MEDIUM_SIZE$2;
const WRAPPER_NO_HOME_BAR_PADDING_BOTTOM$2 = 0;
const WRAPPER_WITH_HOME_BAR_MARGIN_BOTTOM$2 = bottomInset$2;
const WRAPPER_WITH_HOME_BAR_PADDING_BOTTOM$2 = 0;
const TEXT_FONT_SIZE$5 = HEADER_4$2;
const BUTTON_PADDING_VERTICAL$2 = MEDIUM_SIZE$2;
const BUTTON_PADDING_HORIZONTAL$2 = MEDIUM_SIZE$2;
const BUTTON_HEIGHT$2 = TEXT_FONT_SIZE$5 + BUTTON_PADDING_VERTICAL$2 * 2;
const BUTTON_BORDER_RADIUS$2 = BUTTON_HEIGHT$2 * 0.5;
const FILLED_TEXT_COLOR$5 = INVERTED_TEXT_COLOR$2;
const FILLED_BACKGROUND_COLOR$5 = PRIMARY_COLOR$2;
const DISABLED_TEXT_COLOR$8 = INVERTED_TEXT_COLOR$2;
const DISABLED_BACKGROUND_COLOR$8 = DISABLED_BACKGROUND_COLOR$6;
const styles$n = {
  wrapper: {
    marginHorizontal: WRAPPER_MARGIN_HORIZONTAL$2,
    backgroundColor: FILLED_BACKGROUND_COLOR$5,
    borderRadius: BUTTON_BORDER_RADIUS$2
  },
  wrapperWithoutHomeBar: {
    marginBottom: WRAPPER_NO_HOME_BAR_MARGIN_BOTTOM$2,
    paddingBottom: WRAPPER_NO_HOME_BAR_PADDING_BOTTOM$2
  },
  wrapperWithHomeBar: {
    marginBottom: WRAPPER_WITH_HOME_BAR_MARGIN_BOTTOM$2,
    paddingBottom: WRAPPER_WITH_HOME_BAR_PADDING_BOTTOM$2
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: BUTTON_HEIGHT$2,
    paddingHorizontal: BUTTON_PADDING_HORIZONTAL$2
  },
  text: {
    fontFamily: FONT_FAMILY$2,
    fontSize: TEXT_FONT_SIZE$5,
    lineHeight: TEXT_FONT_SIZE$5,
    color: FILLED_TEXT_COLOR$5
  },
  loadingIndicator: {
    color: FILLED_TEXT_COLOR$5
  },
  disabledWrapper: {
    backgroundColor: DISABLED_BACKGROUND_COLOR$8
  },
  disabledText: {
    color: DISABLED_TEXT_COLOR$8
  }
};
var bottomButtonTheme$2 = StyleSheet.create(styles$n);

const WRAPPER_BACKGROUND_COLOR$2 = GREY_5$2;
const ACTIONS_BORDER_COLOR$2 = GREY_4$2;
const ACTION_TEXT_FONT_SIZE$2 = HEADER_4$2;
const ACTION_TEXT_LINE_HEIGHT$2 = HEADER_5$2;
const ACTION_TEXT_COLOR$2 = LINK_TEXT_COLOR$2;
const ACTION_PADDING_VERTICAL$2 = MEDIUM_SIZE$2;
const ACTION_PADDING_HORIZONTAL$2 = MEDIUM_SIZE$2;
const ACTION_HEIGHT$2 = ACTION_TEXT_LINE_HEIGHT$2 + ACTION_PADDING_VERTICAL$2 * 2;
const styles$o = {
  wrapper: {
    backgroundColor: WRAPPER_BACKGROUND_COLOR$2
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ACTIONS_BORDER_COLOR$2
  },
  action: {
    justifyContent: 'center',
    height: ACTION_HEIGHT$2,
    paddingHorizontal: ACTION_PADDING_HORIZONTAL$2
  },
  actionText: {
    // DateTimePicker uses system font
    fontSize: ACTION_TEXT_FONT_SIZE$2,
    color: ACTION_TEXT_COLOR$2
  }
};
var dateTimePickerTheme$2 = StyleSheet.create(styles$o);

var darkKnightTheme = {
  variables: variables$2,
  button: buttonTheme$2,
  textInput: textInputTheme$2,
  icon: iconTheme$2,
  text: textTheme$2,
  listItem: listItemTheme$2,
  bottomButton: bottomButtonTheme$2,
  dateTimePicker: dateTimePickerTheme$2
};

let themes = {
  default: heroTheme,
  hero: heroTheme,
  legacy: legacyTheme,
  'dark-knight': darkKnightTheme
};
var themeManager = {
  getTheme: (name = 'default') => themes[name],
  setTheme: (name, theme) => themes[name] = theme
};

var injectTheme = connect((state, ownProps) => ({
  theme: ownProps.theme || themeManager.getTheme(state.__theme)
}));

const Button = ({
  text,
  onPress,
  disabled = false,
  loading = false,
  icon,
  rightIcon,
  variant = 'filled',
  wrapperStyle,
  textStyle,
  theme
}) => {
  const Wrapper = loading || disabled ? View$1 : TouchableOpacity;
  const styles = getStylesByVariant(variant, theme.button);
  return React__default.createElement(Wrapper, {
    onPress: onPress,
    style: StyleSheet.flatten([theme.button.wrapper, styles.wrapper, disabled ? theme.button.disabledWrapper : null, wrapperStyle])
  }, loading && !disabled ? React__default.createElement(ActivityIndicator, {
    size: "small",
    color: styles.loadingIndicator.color
  }) : React__default.createElement(Text$2, {
    style: StyleSheet.flatten([theme.button.text, styles.text, disabled ? theme.button.disabledText : null, textStyle])
  }, text));
};

const getStylesByVariant = (variant, styles) => {
  const variantStyles = {
    filled: {
      wrapper: styles.filledWrapper,
      text: styles.filledText,
      loadingIndicator: styles.filledLoadingIndicator
    },
    outlined: {
      wrapper: styles.outlinedWrapper,
      text: styles.outlinedText,
      loadingIndicator: styles.outlinedLoadingIndicator
    }
  };
  return variantStyles[variant] || variantStyles.filled;
};

Button.propTypes = {
  /**
   * The text displayed inside button
   */
  text: t.string.isRequired,
  onPress: t.func.isRequired,
  disabled: t.bool,
  loading: t.bool,
  variant: t.oneOf(['filled', 'outlined']),
  wrapperStyle: t.object,
  textStyle: t.object,

  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object
};
var Button$1 = injectTheme(Button);

var email = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024px" height="1024px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
    <title>email</title>
    <desc>Created with Sketch.</desc>
    <g id="email" stroke="none" stroke-width="1" fill-rule="evenodd">
        <path d="M966.782173,133 L53.7771522,133 C40.5223182,133 29.7771522,143.745166 29.7771522,157 C29.7771522,164.83058 33.5972936,172.168761 40.0118515,176.660023 L500.063052,498.772726 C507.387737,504.409091 516.612263,504.409091 523.936948,498.772726 L980.616813,176.611291 C991.44783,168.97063 994.034125,153.996377 986.393464,143.16536 C981.896834,136.791163 974.582818,133 966.782173,133 Z" id="Shape" fill-rule="nonzero"></path>
        <path d="M500.076089,582.7307 L37.9085973,254.077321 C27.1065102,246.395814 12.1225972,248.925545 4.44109102,259.727632 C1.55221142,263.790108 3.47039079e-12,268.651319 3.47100126e-12,273.63623 L3.41060513e-12,791 C3.47311936e-12,852.855892 50.144108,903 112,903 L912,903 C973.855892,903 1024,852.855892 1024,791 L1024,270.747716 C1024,257.492882 1013.25483,246.747716 1000,246.747716 C994.98198,246.747716 990.090174,248.320593 986.012498,251.245158 L523.889778,582.685915 C516.596622,588.582601 507.392,588.597529 500.076089,582.7307 Z" id="Shape" fill-rule="nonzero"></path>
    </g>
</svg>
`;

/* babel-plugin-inline-import '../icons/email-outline.svg' */
const emailOutline = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 55.2 (78181) - https://sketchapp.com -->\n    <title>Desktop</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"Desktop\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <g id=\"email-outline\" transform=\"translate(0.000000, 127.000000)\" fill-rule=\"nonzero\">\n            <path d=\"M913.365019,72.0228537 C912.911882,72.0076584 912.456836,72 912,72 L112,72 C111.563351,72 111.128337,72.0069965 110.695062,72.0208835 L511.973674,366.935114 L913.365019,72.0228537 Z M952,132.951771 L546.611954,430.621342 C525.877397,445.275581 498.163568,445.292139 477.411516,430.662685 L72,132.903208 L72,658 C72,680.09139 89.90861,698 112,698 L912,698 C934.09139,698 952,680.09139 952,658 L952,132.951771 Z M112,0 L912,0 C973.855892,0 1024,50.144108 1024,112 L1024,658 C1024,719.855892 973.855892,770 912,770 L112,770 C50.144108,770 0,719.855892 0,658 L0,112 C0,50.144108 50.144108,0 112,0 Z\" id=\"Rectangle\"></path>\n        </g>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/eye.svg' */
const eye = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>eye</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"eye\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <path d=\"M512.005815,150 C267.068243,150 61.0308791,303.683591 0,512.5 C61.0308791,721.330175 267.079872,875 511.994185,875 C756.931757,875 962.969121,721.316409 1024,512.5 C962.969121,303.669825 756.931757,150 512.005815,150 Z M512,728 C391.044669,728 293,631.074563 293,511.5 C293,391.925437 391.044669,295 512,295 C632.943754,295 731,391.925437 731,511.5 C731,631.074563 632.943754,728 512,728 Z\" id=\"Shape\" fill-rule=\"nonzero\"></path>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/eye-outline.svg' */
const eyeOutline = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>eye-outline</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"eye-outline\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <path d=\"M511.5,759 C377.570948,759 269,650.429052 269,516.5 C269,382.570948 377.570948,274 511.5,274 C645.429052,274 754,382.570948 754,516.5 C754,650.429052 645.429052,759 511.5,759 Z M511.5,687 C605.66455,687 682,610.66455 682,516.5 C682,422.33545 605.66455,346 511.5,346 C417.33545,346 341,422.33545 341,516.5 C341,610.66455 417.33545,687 511.5,687 Z\" id=\"Oval\" fill-rule=\"nonzero\"></path>\n        <path d=\"M512.005406,152 C751.593655,152 959.19296,300.791426 1021.5382,512.845553 C1023.48733,519.475103 1023.48727,526.525547 1021.53802,533.155063 C959.190436,745.203179 751.585768,894 511.994594,894 C272.413466,894 64.8060394,745.20517 2.46180066,533.154447 C0.512671479,526.524897 0.512734368,519.474453 2.46198182,512.844937 C64.809564,300.796821 272.414232,152 512.005406,152 Z M512.005406,224 C307.691592,224 131.452779,347.559274 74.6735258,523.000331 C131.449904,698.4426 307.690505,822 511.994594,822 C716.308416,822 892.547234,698.440717 949.326481,522.999648 C892.549442,347.553986 716.316343,224 512.005406,224 Z\" id=\"Shape\" fill-rule=\"nonzero\"></path>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/eye-invisible.svg' */
const eyeInvisible = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>eye-invisible</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"eye-invisible\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <path d=\"M829.432594,775.879123 C917.410476,714.557271 985.993482,628.017939 1022.01602,524.284322 C1024.66133,516.659871 1024.66133,508.334599 1022.01602,500.710148 C949.166382,290.922955 744.221927,149.997484 511.995429,149.997484 C421.335667,149.997484 334.966914,171.650442 258.886831,210.340603 L62.4268712,15.6210657 C48.1397607,1.45964477 25.0024434,1.45964477 10.7153329,15.6210657 C-3.57177763,29.7824866 -3.57177763,52.7162553 10.7153329,66.8776763 L961.972055,1008.38672 C976.259166,1022.54814 999.396483,1022.54814 1013.68359,1008.38672 C1027.9707,994.225298 1027.9707,971.291529 1013.68359,957.130108 L829.432594,775.879123 Z M511.995429,294.994968 C632.997015,294.994968 731.422041,392.554108 731.422041,512.491194 C731.422041,559.385797 716.220653,602.752127 690.645262,638.31276 L385.057133,335.413016 C420.933385,310.062623 464.684613,294.994968 511.995429,294.994968 Z M684.387255,837.093593 C687.908947,840.586631 686.458838,846.678296 681.718568,848.189126 C400.22691,937.606069 95.6310024,793.678391 1.98323668,523.928819 C-0.661078893,516.302151 -0.661078893,507.817332 1.98323668,500.190664 C29.133168,421.978033 74.7323793,353.434713 133.163223,298.102087 C135.381036,296.011099 138.939286,296.071532 141.09617,298.210867 L298.353739,454.188922 C299.438274,455.276719 299.864776,456.811722 299.474831,458.286292 C258.67682,615.83561 407.258109,762.688253 565.478355,722.754003 C567.281851,722.294711 568.963489,722.608964 570.279554,723.914321 C583.367089,736.895369 659.650109,812.557719 684.387255,837.093593 Z\" id=\"Shape\" fill-rule=\"nonzero\"></path>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/eye-invisible-outline.svg' */
const eyeInvisibleOutline = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>eye-invisible-outline</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"eye-invisible-outline\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <rect id=\"Rectangle\" transform=\"translate(510.733892, 510.733892) rotate(45.000000) translate(-510.733892, -510.733892)\" x=\"-196.766108\" y=\"474.733892\" width=\"1415\" height=\"72\" rx=\"36\"></rect>\n        <path d=\"M547.060174,756.224188 C388.049261,783.901469 244.724238,642.070806 272.462587,483.924266 L162.226188,374.614717 C122.771071,417.312356 92.398359,467.05677 72.9674682,521.59086 C72.9368907,522.293249 72.9164648,523.083911 72.9107298,523.895168 C72.9050013,524.705495 72.9143394,525.480812 72.9351561,526.159688 C148.12905,737.392356 377.5908,857.67521 602.675132,811.371544 L547.060174,756.224188 Z M276.472641,465.452786 L276.514651,465.2923 C276.500505,465.34578 276.486502,465.399276 276.472641,465.452786 Z M546.981779,682.679147 C560.445691,679.251262 575.036593,682.569163 585.626017,693.069552 L690.529202,797.090728 C712.954481,819.327458 703.792133,857.550279 673.623808,867.162946 C396.00261,955.32629 96.2373906,812.784773 3.81071221,546.625352 C-0.138576748,535.238029 0.024766426,512.13226 3.81503356,501.203466 C30.2587948,425.045994 74.8145965,356.854026 133.729285,301.078597 C149.912002,285.825459 175.31722,286.199459 191.062778,301.81263 L335.63514,445.169451 L335.777554,445.311459 C345.732091,455.293208 349.744676,469.805051 346.156999,483.565975 C315.632349,601.535436 427.783531,712.75606 546.981779,682.679147 Z\" id=\"Path\" fill-rule=\"nonzero\"></path>\n        <path d=\"M951.866351,522.735816 C951.576246,521.329299 951.060818,519.434373 950.319278,517.149335 C948.564086,511.740758 945.794762,504.90742 942.146964,497.100951 C934.146492,479.979543 922.627474,459.633286 909.074431,438.962729 C877.567585,390.909757 839.918398,347.973255 804.449292,321.881909 C718.906346,258.955861 639.3114,230.291487 525.00813,224.965538 C446.192282,221.293123 363.189945,240.090049 275.713482,281.840791 C257.770176,290.404768 236.281778,282.801319 227.717802,264.858013 C219.153826,246.914707 226.757275,225.42631 244.700581,216.862334 C342.417184,170.22418 437.065978,148.789767 528.359326,153.04357 C656.987794,159.037 750.231199,192.616567 847.113208,263.883716 C890.379175,295.710494 933.454192,344.83481 969.285921,399.48392 C1002.15004,449.606948 1024,496.366954 1024,522.781919 C1024,558.401422 994.043597,619.850079 951.360673,678.745038 C903.702251,744.505313 849.960927,793.876193 799.479848,810.176323 C780.559482,816.28563 760.268922,805.900215 754.159615,786.979848 C748.050307,768.059482 758.435723,747.768922 777.356089,741.659615 C809.802723,731.182732 853.591501,690.95502 893.061232,636.493704 C910.75144,612.084316 926.257315,586.556292 937.206533,564.096494 C942.361894,553.52146 946.329803,543.977618 948.912996,536.046409 C950.086534,532.44328 950.935051,529.290208 951.456736,526.687315 C951.76925,525.128062 951.930566,523.943591 951.981676,523.223287 C951.964236,523.221054 951.930617,523.047398 951.866351,522.735816 Z\" id=\"Path-23\" fill-rule=\"nonzero\"></path>\n        <path d=\"M686.36368,682.488509 L660.853605,707.84079 L319.689852,365.215291 L346.223373,339.826293 C390.692048,297.275773 448.977628,273.765654 512.343656,273.765654 C645.983246,273.765654 754.300211,382.226081 754.300211,515.994991 C754.300211,581.966487 731.347648,637.78279 686.36368,682.488509 Z M682.300211,515.994991 C682.300211,421.969265 606.197395,345.765654 512.343656,345.765654 C480.6005,345.765654 451.022523,353.969611 425.412252,369.348922 L658.418347,603.353352 C674.406351,578.322322 682.300211,549.595951 682.300211,515.994991 Z\" id=\"Oval\" fill-rule=\"nonzero\"></path>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/ok-circle.svg' */
const okCircle = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>ok-circle</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"ok-circle\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <path d=\"M512,1024 C229.230208,1024 0,794.769792 0,512 C0,229.230208 229.230208,0 512,0 C794.769792,0 1024,229.230208 1024,512 C1024,794.769792 794.769792,1024 512,1024 Z M430.544156,621.088312 L300.455844,480 C286.39697,465.941125 263.60303,465.941125 249.544156,480 C235.485281,494.058875 235.485281,516.852814 249.544156,530.911688 L405.088312,697.455844 C419.147186,711.514719 441.941125,711.514719 456,697.455844 L825.544156,338.911688 C839.60303,324.852814 839.60303,302.058875 825.544156,288 C811.485281,273.941125 788.691342,273.941125 774.632468,288 L430.544156,621.088312 Z\" id=\"Combined-Shape\"></path>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/calendar.svg' */
const calendar = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>calendar</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"calendar\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <path d=\"M832.312639,96 L906.464963,96 C969.895083,96 1021.79245,147.897371 1021.79245,211.327491 L1021.79245,908.672509 C1021.79245,972.102629 969.895083,1024 906.464963,1024 L110.786471,1024 C47.356351,1024 -4.04372552e-12,972.102629 -4.04372552e-12,908.672509 L-7.67386155e-12,211.327491 C-7.67386155e-12,147.897371 47.356351,96 110.786471,96 L192,96 L192,64 C192,28.653776 220.653776,2.78092781e-14 256,2.13162821e-14 L273.312639,2.84217094e-14 C308.658863,2.19287134e-14 337.312639,28.653776 337.312639,64 L337.312639,96 L687,96 L687,64 C687,28.653776 715.653776,2.78092781e-14 751,2.13162821e-14 L768.312639,2.84217094e-14 C803.658863,2.19287134e-14 832.312639,28.653776 832.312639,64 L832.312639,96 Z M64,352 L64,906.807189 C64,936.169621 87.9393257,960 117.435995,960 L906.564005,960 C936.060674,960 960,936.169621 960,906.807189 L960,352 L64,352 Z\" id=\"Combined-Shape\" fill-rule=\"nonzero\"></path>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/clock-circle-outline.svg' */
const clockCircleOutline = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>clock-circle-outline</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"clock-circle-outline\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <path d=\"M512,72 C268.986902,72 72,268.986902 72,512 C72,755.013098 268.986902,952 512,952 C755.013098,952 952,755.013098 952,512 C952,268.986902 755.013098,72 512,72 Z M512,0 C794.7776,0 1024,229.2224 1024,512 C1024,794.7776 794.7776,1024 512,1024 C229.2224,1024 0,794.7776 0,512 C0,229.2224 229.2224,0 512,0 Z\" id=\"Path\" fill-rule=\"nonzero\"></path>\n        <path d=\"M548,493.237383 L736.822773,685.913682 C750.738929,700.113841 750.508699,722.906618 736.30854,736.822773 C722.108381,750.738929 699.315605,750.508699 685.399449,736.30854 L486.288338,533.133937 C479.693714,526.404729 476,517.358361 476,507.936508 L476,203.174603 C476,183.292352 492.117749,167.174603 512,167.174603 C531.882251,167.174603 548,183.292352 548,203.174603 L548,493.237383 Z\" id=\"Path-3\" fill-rule=\"nonzero\"></path>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/comment-outline.svg' */
const commentOutline = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- generator: sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>comment</title>\n    <desc>created with sketch.</desc>\n    <g id=\"comment\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <g id=\"group\" transform=\"translate(37.000000, 36.000000)\" fill-rule=\"nonzero\">\n            <path d=\"M475,585 C415.353247,585 367,536.646753 367,477 C367,417.353247 415.353247,369 475,369 C534.646753,369 583,417.353247 583,477 C583,536.646753 534.646753,585 475,585 Z M475,513 C494.882251,513 511,496.882251 511,477 C511,457.117749 494.882251,441 475,441 C455.117749,441 439,457.117749 439,477 C439,496.882251 455.117749,513 475,513 Z\" id=\"oval\"></path>\n            <path d=\"M205,585 C145.353247,585 97,536.646753 97,477 C97,417.353247 145.353247,369 205,369 C264.646753,369 313,417.353247 313,477 C313,536.646753 264.646753,585 205,585 Z M205,513 C224.882251,513 241,496.882251 241,477 C241,457.117749 224.882251,441 205,441 C185.117749,441 169,457.117749 169,477 C169,496.882251 185.117749,513 205,513 Z\" id=\"oval\"></path>\n            <path d=\"M745,585 C685.353247,585 637,536.646753 637,477 C637,417.353247 685.353247,369 745,369 C804.646753,369 853,417.353247 853,477 C853,536.646753 804.646753,585 745,585 Z M745,513 C764.882251,513 781,496.882251 781,477 C781,457.117749 764.882251,441 745,441 C725.117749,441 709,457.117749 709,477 C709,496.882251 725.117749,513 745,513 Z\" id=\"oval\"></path>\n            <path d=\"M475,986 C192.782493,986 -36,757.217507 -36,475 C-36,192.782493 192.782493,-36 475,-36 C757.217507,-36 986,192.782493 986,475 C986,568.421504 960.85782,658.22843 914.000089,736.676384 C914.749176,740.929447 916.480521,747.00676 919.195799,754.613082 C924.54731,769.604294 930.861506,783.955917 947.004061,818.858635 C947.151473,819.177365 947.151473,819.177365 947.298942,819.496226 C964.815793,857.371977 972.247213,874.443225 978.592961,893.137733 C983.099164,906.412961 985.888966,917.846103 986.751235,928.289887 C987.340809,935.430804 987.042867,942.22381 985.544593,948.848723 C983.490278,957.932275 979.24496,966.273433 972.432941,973.070027 C965.589057,979.898415 957.195685,984.106449 948.07299,986.097218 C941.466285,987.538944 934.704737,987.784143 927.598183,987.14689 C917.230232,986.217183 905.875156,983.376198 892.679307,978.824607 C874.091471,972.413181 857.10144,964.938012 819.392449,947.332413 C819.078893,947.186018 819.078893,947.186018 818.765461,947.039678 C783.948549,930.783673 769.638407,924.422587 754.698355,919.014609 C747.233936,916.31265 741.251631,914.568734 737.03814,913.783831 C658.508113,960.778668 568.567937,986 475,986 Z M881.949346,849.719235 C881.802177,849.401024 881.802177,849.401024 881.654947,849.082688 C864.492925,811.975721 857.759655,796.671581 851.38681,778.8193 C846.925564,766.321991 843.942287,755.508554 842.53673,745.695675 C840.358966,730.491633 841.640298,716.978927 849.268096,704.572088 C891.382314,636.07207 914,557.244182 914,475 C914,232.546995 717.453005,36 475,36 C232.546995,36 36,232.546995 36,475 C36,717.453005 232.546995,914 475,914 C557.440949,914 636.448073,891.273632 705.057827,848.969026 C717.509135,841.29158 731.028116,840.0721 746.249973,842.334877 C756.0055,843.785066 766.761601,846.809374 779.204698,851.313508 C796.976342,857.746461 812.226212,864.525271 849.225697,881.800318 C849.538742,881.946478 849.538742,881.946478 849.851667,882.092578 C878.382554,895.413097 894.177736,902.508169 907.274761,907.525233 C902.302218,894.344514 895.248466,878.475212 881.949346,849.719235 Z\" id=\"oval\"></path>\n        </g>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/cancel-outline.svg' */
const cancelOutline = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>cancel-outline</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"cancel-outline\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <g id=\"Group\" transform=\"translate(512.000000, 512.000000) rotate(45.000000) translate(-512.000000, -512.000000)\">\n            <rect id=\"Rectangle-4\" x=\"0\" y=\"476\" width=\"1024\" height=\"72\" rx=\"36\"></rect>\n            <rect id=\"Rectangle-4\" transform=\"translate(512.000000, 512.000000) rotate(90.000000) translate(-512.000000, -512.000000)\" x=\"0\" y=\"476\" width=\"1024\" height=\"72\" rx=\"36\"></rect>\n        </g>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/plus-circle-outline.svg' */
const plusCircleOutline = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>plus-circle-outline</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"plus-circle-outline\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <path d=\"M512,72 C268.628502,72 72,268.628502 72,512 C72,755.371498 268.628502,952 512,952 C755.371498,952 952,755.371498 952,512 C952,268.628502 755.371498,72 512,72 Z M512,0 C795.136,0 1024,228.864 1024,512 C1024,795.136 795.136,1024 512,1024 C228.864,1024 0,795.136 0,512 C0,228.864 228.864,0 512,0 Z\" id=\"Path\" fill-rule=\"nonzero\"></path>\n        <path d=\"M548.5,476.5 L781,476.5 C800.882251,476.5 817,492.617749 817,512.5 C817,532.382251 800.882251,548.5 781,548.5 L548.5,548.5 L548.5,781 C548.5,800.882251 532.382251,817 512.5,817 C492.617749,817 476.5,800.882251 476.5,781 L476.5,548.5 L244,548.5 C224.117749,548.5 208,532.382251 208,512.5 C208,492.617749 224.117749,476.5 244,476.5 L476.5,476.5 L476.5,244 C476.5,224.117749 492.617749,208 512.5,208 C532.382251,208 548.5,224.117749 548.5,244 L548.5,476.5 Z\" id=\"Combined-Shape\"></path>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/plus-outline.svg' */
const plusOutline = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>plus-outline</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"plus-outline\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <g id=\"Group\">\n            <rect id=\"Rectangle-4\" x=\"0\" y=\"476\" width=\"1024\" height=\"72\" rx=\"36\"></rect>\n            <rect id=\"Rectangle-4\" transform=\"translate(512.000000, 512.000000) rotate(90.000000) translate(-512.000000, -512.000000)\" x=\"0\" y=\"476\" width=\"1024\" height=\"72\" rx=\"36\"></rect>\n        </g>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/piggy-bank-outline.svg' */
const piggyBankOutline = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 57.1 (83088) - https://sketch.com -->\n    <title>hero-shop-piggy-bank</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"hero-shop-piggy-bank\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <g id=\"Group\" transform=\"translate(1.767008, 91.929607)\" fill-rule=\"nonzero\">\n            <path d=\"M212.691208,633.517322 C122.105036,529.793934 82.3802068,431.448407 96.8776,338.659716 C107.412606,271.231773 130.584899,220.754903 168.991469,180.139571 C201.487421,145.774778 241.983573,120.064151 307.801843,88.3329385 C309.295678,87.6127557 310.837576,86.9953686 312.416642,86.4851397 C422.639508,50.8698598 527.059948,45.8567078 624.912289,71.9024992 L768.523555,3.60139356 C794.969386,-8.97616774 824.726058,13.2126812 819.942571,41.9433421 L801.301188,153.907536 C852.513555,186.970188 886.198393,229.927367 900.932048,282.001242 L994.343622,309.682721 C1009.70244,314.234134 1020.2277,328.262856 1020.2277,344.180927 L1020.2277,475.972696 C1020.2277,491.523226 1010.16866,505.315732 995.293701,510.17147 L887.628571,545.317361 C868.751971,581.69691 833.965914,615.819298 783.865002,648.639649 L783.865002,804.070393 C783.865002,823.952644 767.635986,840.070393 747.616481,840.070393 L603.369709,840.070393 C587.528769,840.070393 573.522583,829.854669 568.782243,814.843255 L546.417159,744.018903 C518.415876,748.136189 489.832465,747.991929 460.777557,743.619098 L435.746298,815.794129 C430.708444,830.320259 416.943493,840.070393 401.473787,840.070393 L248.939729,840.070393 C228.920224,840.070393 212.691208,823.952644 212.691208,804.070393 L212.691208,633.517322 Z M221.837643,229.428967 C193.922554,258.949452 176.904109,296.021219 168.517313,349.699819 C157.393645,420.895419 191.960009,502.887963 275.926004,595.874999 C281.889906,602.479643 285.18825,611.038743 285.18825,619.910236 L285.18825,768.070393 L375.620606,768.070393 L402.588422,690.311499 C408.748442,672.549724 427.624798,662.478094 445.937707,667.182144 C486.425623,677.582305 524.689353,677.582305 561.364291,667.371544 C580.225117,662.120454 599.874657,672.70019 605.736268,691.262374 L629.990889,768.070393 L711.36796,768.070393 L711.36796,628.863361 C711.36796,616.33406 717.92729,604.705953 728.686014,598.162637 C783.723479,564.689567 816.170989,532.450003 827.222325,503.361554 C831.09345,493.172286 839.400835,485.271062 849.818169,481.870458 L947.729786,449.909312 L947.729786,371.006099 L859.909383,344.981501 C846.697069,341.066179 836.865377,330.045559 834.543139,316.547764 C826.466167,269.601105 797.342931,232.591643 744.189434,203.889041 C730.627217,196.565517 723.22327,181.514938 725.741675,166.388849 L737.062381,98.3942318 L643.864074,142.719079 C635.729818,146.587708 626.435569,147.305846 617.796722,144.733223 C531.406529,119.00648 438.161593,121.989955 337.203714,154.195665 C280.066593,181.875147 246.563674,203.280943 221.837643,229.428967 Z\" id=\"Path-24\"></path>\n            <path d=\"M726.984401,296.564154 C709.189223,296.564154 694.763494,310.89162 694.763494,328.564154 C694.763494,346.237754 709.189223,360.564154 726.984401,360.564154 C744.779471,360.564154 759.205308,346.237754 759.205308,328.564154 C759.205308,310.89162 744.779471,296.564154 726.984401,296.564154 Z\" id=\"Shape-path\"></path>\n            <path d=\"M1.07560512,236.025593 C3.36833887,216.27416 21.3492014,202.108345 41.2369855,204.38536 C61.1247697,206.662375 75.3883764,224.51996 73.0956426,244.271393 C70.9871383,262.435727 74.2755914,274.445293 82.2526796,283.109824 C91.6161721,293.280235 109.283468,301.299008 136.26458,305.822672 C156.004769,309.13232 169.305832,327.708191 165.973336,347.313041 C162.64084,366.917891 143.936733,380.127761 124.196544,376.818113 C82.5866301,369.841778 50.434257,355.248567 28.7494367,331.695012 C5.67821218,306.635576 -3.31029095,273.809192 1.07560512,236.025593 Z\" id=\"Path-25\"></path>\n            <path d=\"M579.452828,193.027769 C598.939938,197.582513 611.019524,216.963979 606.433337,236.317486 C601.84715,255.670992 582.331887,267.66776 562.844776,263.113016 C491.187113,246.364392 425.263556,255.102943 363.24347,289.416993 C345.754698,299.093061 323.679093,292.856815 313.936228,275.487946 C304.193362,258.119077 310.472659,236.194823 327.961432,226.518755 C405.906156,183.39403 490.346833,172.200927 579.452828,193.027769 Z\" id=\"Path-26\"></path>\n        </g>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/target-outline.svg' */
const targetOutline = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>target-outline</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"target-outline\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <rect id=\"Rectangle\" transform=\"translate(583.605966, 436.598797) rotate(-44.500000) translate(-583.605966, -436.598797) \" x=\"307.605966\" y=\"400.598797\" width=\"552\" height=\"72\" rx=\"36\"></rect>\n        <path d=\"M794.010641,627.447889 C794.010641,846.704934 616.265305,1024.44789 397.005321,1024.44789 C177.745336,1024.44789 2.84217094e-13,846.704934 2.84217094e-13,627.447889 C2.84217094e-13,408.190843 177.745336,230.447889 397.005321,230.447889 C464.976843,230.447889 528.958699,247.529453 584.892274,277.63402 L529.136645,330.263285 C481.678938,310.237636 451.358163,303.366256 397.005321,303.366256 C218.017578,303.366256 72.9193446,448.462545 72.9193446,627.447889 C72.9193446,806.433232 218.017578,951.529521 397.005321,951.529521 C575.993063,951.529521 721.091297,806.433232 721.091297,627.447889 C721.091297,571.533455 714.264664,527.472449 689.422305,482.016889 L740.469747,428.208726 C774.514012,486.768874 794.010641,554.831571 794.010641,627.447889 Z\" id=\"Path\" fill-rule=\"nonzero\"></path>\n        <path d=\"M459.388802,420.26892 L396.970774,483.009346 C317.630167,483.009346 253.311896,547.476158 253.311896,627 C253.311896,706.523842 317.630167,770.990654 396.970774,770.990654 C476.311382,770.990654 540.629653,706.523842 540.629653,627 C540.629653,623.153287 540.479978,619.329064 540.182575,615.53253 L604.5428,553.91256 C613.470774,581.138797 613.470774,616.858034 613.470774,627 C613.470774,746.845791 516.540423,844 396.970774,844 C277.401126,844 180.470774,746.845791 180.470774,627 C180.470774,507.154209 277.401126,410 396.970774,410 C409.873825,410 435.181539,410 459.388802,420.26892 Z\" id=\"Path\" fill-rule=\"nonzero\"></path>\n        <path d=\"M980.088855,101.773229 C1014.57687,94.5226749 1037.86429,136.02058 1013.70689,161.680142 L890.894385,292.12936 C883.170068,300.33399 872.049614,304.448424 860.845238,303.247182 L786.545434,295.281362 C779.079887,294.480967 772.051423,291.366359 766.443751,286.373463 L740.121485,262.936939 C733.67147,257.194048 729.500881,249.32383 728.370506,240.761953 L719.309959,172.134023 C717.906885,161.50662 721.312825,150.806767 728.601009,142.945934 L850.336753,11.6451531 C874.300227,-14.2011818 917.287466,6.22377301 912.386233,41.1273404 L901.551674,118.284418 L980.088855,101.773229 Z M792.905639,179.487949 L797.998812,218.065525 L805.699898,224.922332 L850.733651,229.750484 L882.670405,195.827841 L834.482677,191.250166 L825.13177,144.729742 L792.905639,179.487949 Z\" id=\"Path-22\" fill-rule=\"nonzero\"></path>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/single-right-outline.svg' */
const singleRightOutline = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>single-right</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"single-right\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <path d=\"M699.141847,512.053535 L248.544156,61.4558441 C234.485281,47.3969696 234.485281,24.6030304 248.544156,10.5441559 C262.60303,-3.51471863 285.39697,-3.51471863 299.455844,10.5441559 L774.044605,485.132916 C788.862441,499.950753 788.887722,523.967405 774.101114,538.816404 L301.509379,1013.4022 C287.480133,1027.49064 264.686244,1027.53862 250.597803,1013.50938 C236.509363,999.480133 236.461375,976.686244 250.490621,962.597803 L699.141847,512.053535 Z\" id=\"Path-15\" fill-rule=\"nonzero\"></path>\n    </g>\n</svg>\n";

/* babel-plugin-inline-import '../icons/more-vertical.svg' */
const moreVertical = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"1024px\" height=\"1024px\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->\n    <title>more-vertical</title>\n    <desc>Created with Sketch.</desc>\n    <g id=\"more-vertical\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n        <circle id=\"Oval-2\" cx=\"512\" cy=\"136\" r=\"136\"></circle>\n        <circle id=\"Oval-2\" cx=\"512\" cy=\"888\" r=\"136\"></circle>\n        <circle id=\"Oval-2\" cx=\"512\" cy=\"512\" r=\"136\"></circle>\n    </g>\n</svg>\n";
const SVG_ICONS = {
  email,
  'email-outline': emailOutline,
  eye,
  'eye-outline': eyeOutline,
  'eye-invisible': eyeInvisible,
  'eye-invisible-outline': eyeInvisibleOutline,
  'ok-circle': okCircle,
  calendar,
  'clock-circle-outline': clockCircleOutline,
  'comment-outline': commentOutline,
  'cancel-outline': cancelOutline,
  'plus-circle-outline': plusCircleOutline,
  'plus-outline': plusOutline,
  'piggy-bank-outline': piggyBankOutline,
  'target-outline': targetOutline,
  'single-right-outline': singleRightOutline,
  'more-vertical': moreVertical
};

const Icon = ({
  icon,
  size = 24,
  color,
  wrapperStyle,
  theme,
  ...props
}) => SVG_ICONS[icon] ? React__default.createElement(View$1, _extends({
  style: StyleSheet.compose({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size
  }, wrapperStyle)
}, props), React__default.createElement(SvgXml, {
  xml: SVG_ICONS[icon],
  override: {
    width: size,
    height: size,
    fill: color || theme.icon.icon.color
  }
})) : null;

Icon.propTypes = {
  /**
   * Name of the icon, in kebab case
   */
  icon: t.string,
  size: t.number,
  color: t.string,
  wrapperStyle: t.object,

  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object
};
var Icon$1 = injectTheme(Icon);

const isNil = val => val == null;

const merge = (obj1, obj2) => isNil(obj2) ? obj1 : Object.keys(obj2).reduce((res, key) => isNil(obj2[key]) ? res : { ...res,
  [key]: obj2[key]
}, obj1);

var composeStyles = ((styles = []) => styles.reduce(merge, {}));

var noop = (() => {});

class TextInput extends React__default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      focused: false
    });

    _defineProperty(this, "handleFocus", () => {
      this.setState({
        focused: true
      });
      this.props.onFocus();
    });

    _defineProperty(this, "handleBlur", () => {
      this.setState({
        focused: false
      });
      this.props.onBlur();
    });
  }

  render() {
    const {
      focused
    } = this.state;
    const {
      testID,
      label,
      value,
      onChange,
      onChangeText,
      onPressIcon,
      rightIcon,
      disabled,
      error,
      autoFocus,
      keyboardType,
      secureTextEntry,
      multiline,
      wrapperStyle = {},
      labelStyle = {},
      inputStyle = {},
      iconStyle = {},
      errorStyle = {},
      theme
    } = this.props;
    return React__default.createElement(View$1, {
      style: StyleSheet.flatten([theme.textInput.wrapper, wrapperStyle])
    }, React__default.createElement(Text$2, {
      style: StyleSheet.flatten([theme.textInput.label, focused ? theme.textInput.activeLabel : null, error ? theme.textInput.errorLabel : null, labelStyle])
    }, focused || value ? label : ''), React__default.createElement(View$1, {
      style: StyleSheet.flatten([theme.textInput.textInput, focused ? theme.textInput.activeTextInput : null, error ? theme.textInput.errorTextInput : null, inputStyle])
    }, React__default.createElement(TextInput$3, {
      testID: testID,
      placeholder: focused ? '' : label,
      value: value,
      onChange: onChange,
      onChangeText: onChangeText,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      editable: !disabled,
      autoFocus: autoFocus,
      keyboardType: keyboardType,
      secureTextEntry: secureTextEntry,
      multiline: multiline,
      scrollEnabled: false,
      placeholderTextColor: composeStyles([theme.textInput.baseTextInput, inputStyle, disabled ? theme.textInput.disabledBaseTextInput : null]).color,
      style: StyleSheet.flatten([theme.textInput.baseTextInput, inputStyle.color ? {
        color: inputStyle.color
      } : null, disabled ? theme.textInput.disabledBaseTextInput : null])
    }), React__default.createElement(TouchableWithoutFeedback, {
      onPress: onPressIcon
    }, React__default.createElement(Icon$1, {
      icon: rightIcon,
      size: 20,
      color: composeStyles([theme.textInput.icon, focused ? theme.textInput.activeIcon : null, error ? theme.textInput.errorIcon : null, iconStyle]).color,
      wrapperStyle: theme.textInput.icon
    }))), React__default.createElement(Text$2, {
      style: StyleSheet.flatten([theme.textInput.errorMessage, errorStyle])
    }, error));
  }

}

TextInput.propTypes = {
  /**
   * The label and placeholder of text input
   */
  label: t.string,
  value: t.string,
  onChange: t.func,
  onChangeText: t.func,
  onPressIcon: t.func,
  rightIcon: t.string,
  disabled: t.bool,
  error: t.string,
  autoFocus: t.bool,
  secureTextEntry: t.bool,
  multiline: t.bool,
  wrapperStyle: t.object,
  labelStyle: t.object,
  inputStyle: t.object,
  iconStyle: t.object,
  errorStyle: t.object,

  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object
};
TextInput.defaultProps = {
  onFocus: noop,
  onBlur: noop
};
var TextInput$1 = injectTheme(TextInput);

const Text = ({
  children,
  size,
  weight,
  color,
  style,
  theme
}) => React__default.createElement(Text$2, {
  style: StyleSheet.flatten([theme.text.text, theme.text[size], {
    fontWeight: weight,
    color
  }, style])
}, children);

Text.propTypes = {
  children: t.string,
  size: t.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
  weight: t.oneOf(['300', '400', '500', '600', '700']),
  color: t.string,
  style: t.object,

  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object
};
var Text$1 = injectTheme(Text);

const ListItem = ({
  title,
  subtitle,
  onPress,
  leftElement,
  rightElement,
  wrapperStyle,
  titleStyle,
  subtitleStyle,
  theme
}) => {
  const Wrapper = onPress ? TouchableOpacity : View$1;
  return React__default.createElement(Wrapper, {
    onPress: onPress,
    style: StyleSheet.flatten([theme.listItem.wrapper, wrapperStyle])
  }, React__default.createElement(View$1, {
    style: theme.listItem.contentWrapper
  }, leftElement, React__default.createElement(View$1, null, React__default.createElement(Text$2, {
    style: StyleSheet.flatten([theme.listItem.title, titleStyle])
  }, title), subtitle ? React__default.createElement(Text$2, {
    style: StyleSheet.flatten([theme.listItem.subtitle, subtitleStyle])
  }, subtitle) : null)), rightElement);
};

ListItem.propTypes = {
  title: t.oneOfType([t.string, t.element]).isRequired,
  subtitle: t.oneOfType([t.string, t.element]),
  onPress: t.func,
  leftElement: t.element,
  rightElement: t.element,
  wrapperStyle: t.object,
  titleStyle: t.object,
  subtitleStyle: t.object,

  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object
};
var ListItem$1 = injectTheme(ListItem);

var hasHomeBar = (() => {
  const {
    width,
    height
  } = Dimensions.get('window');
  const isLandscape = width > height;
  const bottomPadding = getInset('bottom', isLandscape);
  return bottomPadding > 0;
});

class BottomButton extends React__default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      showKeyboard: false
    });

    _defineProperty(this, "handleKeyboardWillShow", () => this.setState({
      showKeyboard: true
    }));

    _defineProperty(this, "handleKeyboardWillHide", () => this.setState({
      showKeyboard: false
    }));
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.handleKeyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.handleKeyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  render() {
    const {
      text,
      onPress,
      disabled = false,
      loading = false,
      forceInset,
      wrapperStyle,
      buttonStyle,
      textStyle,
      theme
    } = this.props;
    const {
      showKeyboard
    } = this.state;
    const Wrapper = loading || disabled ? View$1 : TouchableOpacity;
    let themeWrapperStyle;

    if (forceInset === 'always') {
      themeWrapperStyle = theme.bottomButton.wrapperWithHomeBar;
    } else if (forceInset === 'never') {
      themeWrapperStyle = theme.bottomButton.wrapperWithoutHomeBar;
    } else {
      themeWrapperStyle = !showKeyboard && hasHomeBar() ? theme.bottomButton.wrapperWithHomeBar : theme.bottomButton.wrapperWithoutHomeBar;
    }

    return React__default.createElement(Wrapper, {
      onPress: onPress,
      style: StyleSheet.flatten([theme.bottomButton.wrapper, themeWrapperStyle, disabled ? theme.bottomButton.disabledWrapper : null, wrapperStyle])
    }, React__default.createElement(View$1, {
      style: StyleSheet.flatten([theme.bottomButton.button, buttonStyle])
    }, loading && !disabled ? React__default.createElement(ActivityIndicator, {
      size: "small",
      color: theme.bottomButton.loadingIndicator.color
    }) : React__default.createElement(Text$2, {
      style: StyleSheet.flatten([theme.bottomButton.text, disabled ? theme.bottomButton.disabledText : null, textStyle])
    }, text)));
  }

}

BottomButton.propTypes = {
  text: t.string.isRequired,
  onPress: t.func.isRequired,
  disabled: t.bool,
  loading: t.bool,
  forceInset: t.oneOf(['always', 'never']),
  wrapperStyle: t.object,
  buttonStyle: t.object,
  textStyle: t.object,

  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object
};
var BottomButton$1 = injectTheme(BottomButton);

const isAndroid = Platform$1.OS === 'android';
const isIOS = Platform$1.OS === 'ios';

class DateTimePickerIOS extends React__default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleKeyboardWillShow", () => this.props.onDismiss());

    _defineProperty(this, "handleDismiss", () => this.props.onDismiss());

    _defineProperty(this, "handleChange", () => {
      const {
        pickedDate
      } = this.state;
      const {
        onChange,
        onDismiss
      } = this.props;
      onChange(pickedDate);
      onDismiss();
    });

    _defineProperty(this, "handleDateChange", date => this.setState({
      pickedDate: date
    }));

    this.state = {
      pickedDate: props.value
    };
  }

  componentDidMount() {
    if (this.props.show) Keyboard.dismiss();
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.handleKeyboardWillShow);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
  }

  componentWillReceiveProps({
    value,
    show
  }) {
    const prevShow = this.props.show;
    if (prevShow !== show && show) Keyboard.dismiss();
    this.setState({
      pickedDate: value
    });
  }

  render() {
    const {
      pickedDate
    } = this.state;
    const {
      show,
      mode,
      theme
    } = this.props;
    if (!show) return null;
    return React__default.createElement(SafeAreaView, {
      forceInset: {
        bottom: 'always'
      },
      style: theme.dateTimePicker.wrapper
    }, React__default.createElement(View$1, {
      style: theme.dateTimePicker.actions
    }, React__default.createElement(TouchableOpacity, {
      onPress: this.handleDismiss,
      style: theme.dateTimePicker.action
    }, React__default.createElement(Text$2, {
      style: theme.dateTimePicker.actionText
    }, "Cancel")), React__default.createElement(TouchableOpacity, {
      onPress: this.handleChange,
      style: theme.dateTimePicker.action
    }, React__default.createElement(Text$2, {
      style: StyleSheet.flatten([theme.dateTimePicker.actionText, {
        fontWeight: '600'
      }])
    }, "Done"))), React__default.createElement(DatePickerIOS, {
      mode: mode,
      date: pickedDate,
      onDateChange: this.handleDateChange
    }));
  }

}

class DateTimePickerAndroid extends React__default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "openDateTimePickerAndroid", ({
      mode,
      value,
      onChange,
      onDismiss
    }) => {
      if (mode === 'date') {
        DatePickerAndroid.open({
          date: value
        }).then(({
          action,
          year,
          month,
          day
        }) => {
          if (action === DatePickerAndroid.dateSetAction) onChange(new Date(year, month, day));
          onDismiss();
        });
      }
    });
  }

  componentDidMount() {
    const {
      show,
      mode,
      value,
      onChange,
      onDismiss
    } = this.props;
    if (show) this.openDateTimePickerAndroid({
      mode,
      value,
      onChange,
      onDismiss
    });
  }

  componentWillReceiveProps(nextProps) {
    const prevShow = this.props.show;
    const {
      show,
      mode,
      value,
      onChange,
      onDismiss
    } = nextProps;
    if (prevShow !== show && show) this.openDateTimePickerAndroid({
      mode,
      value,
      onChange,
      onDismiss
    });
  }

  render() {
    return null;
  }

}

const DateTimePicker = props => isAndroid ? React__default.createElement(DateTimePickerAndroid, props) : React__default.createElement(DateTimePickerIOS, props);

DateTimePicker.propTypes = {
  show: t.bool,
  mode: t.oneOf(['date', 'datetime']),
  value: t.object,
  onChange: t.func,
  onDismiss: t.func,

  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object
};
DateTimePicker.defaultProps = {
  mode: 'date'
};
var DateTimePicker$1 = injectTheme(DateTimePicker);

const APPBAR_HEIGHT = isIOS ? 44 : 56;
const STATUSBAR_HEIGHT = isIOS ? 20 : 0;
const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;

const KeyboardAvoidingView = ({
  withNavigation,
  children,
  style
}) => {
  let verticalOffset = 0;

  if (withNavigation) {
    const {
      width,
      height
    } = Dimensions.get('window');
    const isLandscape = width > height;
    const topInset = getInset('top', isLandscape);
    /*
     * If IPX+: topInset = 44, statusBar = 20
     * If IP8-: topInset = 20, statusBar = 20
     */

    verticalOffset = isIOS ? HEADER_HEIGHT + topInset - STATUSBAR_HEIGHT : HEADER_HEIGHT + topInset;
  }

  return React__default.createElement(KeyboardAvoidingView$1, {
    enabled: true,
    behavior: "padding",
    keyboardVerticalOffset: verticalOffset,
    style: style
  }, children);
};

KeyboardAvoidingView.propTypes = {
  withNavigation: t.bool,
  children: t.oneOfType([t.element, t.arrayOf(t.element)]),
  style: t.object
};

const Container = ({
  children,
  fluid = false,
  direction = 'column',
  style,
  theme
}) => React__default.createElement(View$1, {
  style: StyleSheet.flatten([theme.container.container, fluid ? theme.container.fluid : null, {
    flexDirection: direction
  }, style])
}, children);

Container.propTypes = {
  children: t.oneOfType([t.element, t.arrayOf(t.element)]),
  fluid: t.bool,
  direction: t.oneOf(['column', 'row']),
  style: t.object,

  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object
};
var Container$1 = injectTheme(Container);

const Card = ({
  children,
  style,
  theme
}) => React__default.createElement(View$1, {
  style: StyleSheet.flatten([theme.card.card, style])
}, children);

Card.propTypes = {
  children: t.oneOfType([t.element, t.arrayOf(t.element)]),
  style: t.object,

  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object
};
var Card$1 = injectTheme(Card);

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

var isWeb$3 = Platform$1.OS === "web";
var _BLUE = "#1dbeee";
var _FOCUS_BLUE_1 = "#003580";
var _RED = "#de350b";
var _BLACK = "#000000";
var _GREY_3 = "#a3a6ac";
var _GREY_4 = "#d9dbdf";
var _WHITE = "#fcfcfc";

var _BASE_SIZE = isWeb$3 ? 16.0 : normalize(13.0);

var _FONT_SIZE = isWeb$3 ? 16.0 : normalize(13.0);

var _FONT_FAMILY = isWeb$3 ? undefined : "Proxima Nova";

var _SMALL_SIZE = _BASE_SIZE * 0.5;

var _MEDIUM_SIZE = _BASE_SIZE * 1.0;

var _LARGE_SIZE = _BASE_SIZE * 1.5;

var _HEADER_5 = _FONT_SIZE * 0.83;

var _HEADER_4 = _FONT_SIZE * 1.0;

var _HEADER_3 = _FONT_SIZE * 1.17;

var _HEADER_2 = _FONT_SIZE * 1.5;

var _HEADER_1 = _FONT_SIZE * 2.0;
var _GREY_5 = "#f5f6f8";
var _PRIMARY_COLOR = _BLUE;
var _DARK_PRIMARY_COLOR = _FOCUS_BLUE_1;
var _DANGER_COLOR = _RED;
var _TEXT_COLOR = _BLACK;
var _INVERTED_TEXT_COLOR = _WHITE;
var _DISABLED_TEXT_COLOR = _GREY_3;
var _MUTED_TEXT_COLOR = _GREY_3;
var _LINK_TEXT_COLOR = _BLUE;
var _BORDER_COLOR = _GREY_4;
var _DISABLED_BACKGROUND_COLOR = _GREY_4;
/* isWeb Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
var styles$p = {
  icon: {
    color: _TEXT_COLOR
  }
};
var $$default = StyleSheet.create(styles$p);
/* default Not a pure module */

var undefinedHeader =
/* array */
[];

function valFromOption(x) {
  if (x !== null && x[0] === undefinedHeader) {
    var depth = x[1];

    if (depth === 0) {
      return;
    } else {
      return (
        /* tuple */
        [undefinedHeader, depth - 1 | 0]
      );
    }
  } else {
    return x;
  }
}
/* No side effect */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
var tmp = {
  color: _TEXT_COLOR,
  fontSize: _HEADER_4
};

if (_FONT_FAMILY !== undefined) {
  tmp.fontFamily = valFromOption(_FONT_FAMILY);
}

var styles$q = {
  text: tmp,
  h1: {
    fontSize: _HEADER_1
  },
  h2: {
    fontSize: _HEADER_2
  },
  h3: {
    fontSize: _HEADER_3
  },
  h4: {
    fontSize: _HEADER_4
  },
  h5: {
    fontSize: _HEADER_5
  }
};
var $$default$1 = StyleSheet.create(styles$q);
/* default Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

var _WRAPPER_MEDIUM_SIZE = _LARGE_SIZE * 2.0;

var _WRAPPER_MEDIUM_RADIUS = _WRAPPER_MEDIUM_SIZE / 2.0;

var _WRAPPER_LARGE_SIZE = _LARGE_SIZE * 4.0;

var _WRAPPER_LARGE_RADIUS = _WRAPPER_LARGE_SIZE / 2.0;

var _TITLE_LARGE_FONT_SIZE = _HEADER_2 * 2.0;

var tmp$1 = {
  color: _DARK_PRIMARY_COLOR
};

if (_FONT_FAMILY !== undefined) {
  tmp$1.fontFamily = valFromOption(_FONT_FAMILY);
}

var styles$r = {
  wrapper: {},
  titleWrapper: {
    borderColor: _DARK_PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    left: 0.0,
    position: "absolute",
    top: 0.0
  },
  title: tmp$1,
  image: {
    left: 0.0,
    position: "absolute",
    top: 0.0
  },
  mediumWrapper: {
    height: _WRAPPER_MEDIUM_SIZE,
    width: _WRAPPER_MEDIUM_SIZE
  },
  mediumTitleWrapper: {
    borderRadius: _WRAPPER_MEDIUM_RADIUS,
    borderWidth: 1.2,
    height: _WRAPPER_MEDIUM_SIZE,
    width: _WRAPPER_MEDIUM_SIZE
  },
  mediumTitle: {
    fontSize: _HEADER_2,
    fontWeight: "300"
  },
  mediumImage: {
    borderRadius: _WRAPPER_MEDIUM_RADIUS,
    height: _WRAPPER_MEDIUM_SIZE,
    width: _WRAPPER_MEDIUM_SIZE
  },
  largeWrapper: {
    height: _WRAPPER_LARGE_SIZE,
    width: _WRAPPER_LARGE_SIZE
  },
  largeTitleWrapper: {
    borderRadius: _WRAPPER_LARGE_RADIUS,
    borderWidth: 1.5,
    height: _WRAPPER_LARGE_SIZE,
    width: _WRAPPER_LARGE_SIZE
  },
  largeTitle: {
    fontSize: _TITLE_LARGE_FONT_SIZE,
    fontWeight: "200"
  },
  largeImage: {
    borderRadius: _WRAPPER_LARGE_RADIUS,
    height: _WRAPPER_LARGE_SIZE,
    width: _WRAPPER_LARGE_SIZE
  }
};
var $$default$2 = StyleSheet.create(styles$r);
/* default Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

var _WRAPPER_HEIGHT = _HEADER_4 + _MEDIUM_SIZE * 2.0;

var _WRAPPER_BORDER_RADIUS = _WRAPPER_HEIGHT * 0.5;

var tmp$2 = {
  fontSize: _HEADER_4,
  lineHeight: _HEADER_4
};

if (_FONT_FAMILY !== undefined) {
  tmp$2.fontFamily = valFromOption(_FONT_FAMILY);
}

var styles$s = {
  wrapper: {
    borderRadius: _WRAPPER_BORDER_RADIUS,
    alignItems: "center",
    display: "flex",
    height: _WRAPPER_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: _MEDIUM_SIZE
  },
  text: tmp$2,
  filledWrapper: {
    backgroundColor: _PRIMARY_COLOR
  },
  filledText: {
    color: _INVERTED_TEXT_COLOR
  },
  filledLoadingIndicator: {
    color: _INVERTED_TEXT_COLOR
  },
  outlinedWrapper: {
    backgroundColor: "transparent",
    borderColor: _PRIMARY_COLOR,
    borderWidth: 1.2
  },
  outlinedText: {
    color: _PRIMARY_COLOR,
    fontWeight: "500"
  },
  outlinedLoadingIndicator: {
    color: _PRIMARY_COLOR
  },
  disabledWrapper: {
    backgroundColor: _DISABLED_BACKGROUND_COLOR,
    borderWidth: 0.0
  },
  disabledText: {
    color: _INVERTED_TEXT_COLOR
  }
};
var $$default$3 = StyleSheet.create(styles$s);
/* default Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

var _THUMB_SIZE = _BASE_SIZE * 1.5;

var _TRACK_WIDTH = _THUMB_SIZE * 2.0;

var _WRAPPER_WIDTH = _TRACK_WIDTH + 2.0 * 2.0;

var _WRAPPER_HEIGHT$1 = _THUMB_SIZE + 2.0 * 2.0;

var styles$t = {
  track: {
    borderRadius: _WRAPPER_HEIGHT$1 / 2.0,
    height: _WRAPPER_HEIGHT$1,
    padding: 2.0,
    width: _WRAPPER_WIDTH
  },
  trackOn: {
    backgroundColor: _PRIMARY_COLOR
  },
  trackOff: {
    backgroundColor: _DISABLED_BACKGROUND_COLOR
  },
  thumbWrapper: {
    borderRadius: _THUMB_SIZE / 2.0,
    height: _THUMB_SIZE,
    width: _TRACK_WIDTH
  },
  thumb: {
    backgroundColor: _WHITE,
    borderRadius: _THUMB_SIZE / 2.0,
    height: _THUMB_SIZE,
    position: "absolute",
    top: 0.0,
    width: _THUMB_SIZE
  },
  thumbOff: {
    left: 0.0
  },
  thumbOn: {
    left: _TRACK_WIDTH - _THUMB_SIZE
  }
};
var $$default$4 = StyleSheet.create(styles$t);
/* default Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

var _TITLE_LINE_HEIGHT = _HEADER_4 * 1.4;

var _SUBTITLE_LINE_HEIGHT = _HEADER_5 * 1.4;

var _WRAPPER_HEIGHT$2 = _TITLE_LINE_HEIGHT + _SUBTITLE_LINE_HEIGHT + _MEDIUM_SIZE * 2.0;

var tmp$3 = {
  color: _TEXT_COLOR,
  fontSize: _HEADER_4,
  fontWeight: "500",
  lineHeight: _TITLE_LINE_HEIGHT
};

if (_FONT_FAMILY !== undefined) {
  tmp$3.fontFamily = valFromOption(_FONT_FAMILY);
}

var tmp$1$1 = {
  color: _MUTED_TEXT_COLOR,
  fontSize: _HEADER_5,
  fontWeight: "500",
  lineHeight: _SUBTITLE_LINE_HEIGHT
};

if (_FONT_FAMILY !== undefined) {
  tmp$1$1.fontFamily = valFromOption(_FONT_FAMILY);
}

var styles$u = {
  wrapper: {
    borderBottomColor: _BORDER_COLOR,
    borderBottomWidth: 0.8,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: _WRAPPER_HEIGHT$2,
    paddingHorizontal: _MEDIUM_SIZE,
    paddingVertical: _MEDIUM_SIZE
  },
  title: tmp$3,
  subtitle: tmp$1$1,
  contentWrapper: {
    alignItems: "center",
    flexDirection: "row"
  }
};
var $$default$5 = {
  styles: StyleSheet.create(styles$u)
};
/* default Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

var _INPUT_HEIGHT = _HEADER_4 + _MEDIUM_SIZE * 2.0;

var tmp$4 = {
  color: _MUTED_TEXT_COLOR,
  fontSize: _HEADER_5,
  fontWeight: "500",
  lineHeight: _HEADER_5,
  height: _HEADER_5
};

if (_FONT_FAMILY !== undefined) {
  tmp$4.fontFamily = valFromOption(_FONT_FAMILY);
}

var tmp$1$2 = {
  color: _TEXT_COLOR,
  fontSize: _HEADER_4,
  textAlignVertical: "center",
  flex: 1.0,
  paddingBottom: _MEDIUM_SIZE,
  paddingTop: _MEDIUM_SIZE
};

if (_FONT_FAMILY !== undefined) {
  tmp$1$2.fontFamily = valFromOption(_FONT_FAMILY);
}

var tmp$2$1 = {
  color: _DANGER_COLOR,
  fontSize: _HEADER_5,
  fontWeight: "500",
  lineHeight: _HEADER_5,
  height: _HEADER_5,
  marginTop: _SMALL_SIZE
};

if (_FONT_FAMILY !== undefined) {
  tmp$2$1.fontFamily = valFromOption(_FONT_FAMILY);
}

var styles$v = {
  wrapper: {
    marginBottom: _MEDIUM_SIZE
  },
  label: tmp$4,
  textInput: {
    borderBottomColor: _BORDER_COLOR,
    borderBottomWidth: 0.8,
    alignItems: "center",
    flexDirection: "row"
  },
  baseTextInput: tmp$1$2,
  icon: {
    color: _MUTED_TEXT_COLOR,
    height: _INPUT_HEIGHT
  },
  errorMessage: tmp$2$1,
  errorLabel: {
    color: _DANGER_COLOR
  },
  errorTextInput: {
    borderBottomColor: _DANGER_COLOR
  },
  errorIcon: {
    color: _DANGER_COLOR
  },
  activeLabel: {
    color: _PRIMARY_COLOR
  },
  activeTextInput: {
    borderBottomColor: _PRIMARY_COLOR,
    borderBottomWidth: 1.0
  },
  activeIcon: {
    color: _PRIMARY_COLOR
  },
  disabledBaseTextInput: {
    color: _DISABLED_TEXT_COLOR
  }
};
var $$default$6 = StyleSheet.create(styles$v);
/* default Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
var bottomInset$3 = getInset("bottom", undefined);

var _BUTTON_HEIGHT = _HEADER_4 + _MEDIUM_SIZE * 2.0;

var _BUTTON_BORDER_RADIUS = _BUTTON_HEIGHT * 0.5;

var tmp$5 = {
  color: _INVERTED_TEXT_COLOR,
  fontSize: _HEADER_4,
  lineHeight: _HEADER_4
};

if (_FONT_FAMILY !== undefined) {
  tmp$5.fontFamily = valFromOption(_FONT_FAMILY);
}

var styles$w = {
  wrapper: {
    backgroundColor: _PRIMARY_COLOR,
    borderRadius: _BUTTON_BORDER_RADIUS,
    marginHorizontal: _MEDIUM_SIZE
  },
  wrapperWithoutHomeBar: {
    marginBottom: _MEDIUM_SIZE,
    paddingBottom: 0.0
  },
  wrapperWithHomeBar: {
    marginBottom: bottomInset$3,
    paddingBottom: 0.0
  },
  button: {
    alignItems: "center",
    display: "flex",
    height: _BUTTON_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: _MEDIUM_SIZE
  },
  text: tmp$5,
  loadingIndicator: {
    color: _INVERTED_TEXT_COLOR
  },
  disabledWrapper: {
    backgroundColor: _DISABLED_BACKGROUND_COLOR
  },
  disabledText: {
    color: _INVERTED_TEXT_COLOR
  }
};
var $$default$7 = StyleSheet.create(styles$w);
/* bottomInset Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

var _ACTION_HEIGHT = _HEADER_5 + _MEDIUM_SIZE * 2.0;

var styles$x = {
  wrapper: {
    backgroundColor: _GREY_5
  },
  actions: {
    borderBottomColor: _BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  action: {
    height: _ACTION_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: _MEDIUM_SIZE
  },
  actionText: {
    color: _LINK_TEXT_COLOR,
    fontSize: _HEADER_4
  }
};
var $$default$8 = StyleSheet.create(styles$x);
/* styles Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
var $$default$9 = {
  button: $$default$3,
  text: $$default$1,
  listItem: $$default$5,
  textInput: $$default$6,
  icon: $$default,
  _switch: $$default$4,
  avatar: $$default$2,
  bottomButton: $$default$7,
  dateTimePicker: $$default$8
};
/* Hero_Icon Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

function variantFromString(param) {
  switch (param) {
    case "filled":
      return (
        /* filled */
        86969762
      );

    case "outlined":
      return (
        /* outlined */
        613841570
      );

    default:
      return (
        /* filled */
        86969762
      );
  }
}

function getStylesByVariant$1(variant, styles) {
  if (variant >= 613841570) {
    return {
      wrapper: styles.outlinedWrapper,
      text: styles.outlinedText,
      loadingIndicator: styles.outlinedLoadingIndicator
    };
  } else {
    return {
      wrapper: styles.filledWrapper,
      text: styles.filledText,
      loadingIndicator: styles.filledLoadingIndicator
    };
  }
}

function Button$2(Props) {
  var text = Props.text;
  var onPress = Props.onPress;
  var match = Props.loading;
  var loading = match !== undefined ? match : false;
  var match$1 = Props.disabled;
  var disabled = match$1 !== undefined ? match$1 : false;
  var variant = Props.variant;
  var match$2 = Props.theme;
  var theme = match$2 !== undefined ? valFromOption(match$2) : $$default$9;
  var match$3 = Props.wrapperStyle;
  var wrapperStyle = match$3 !== undefined ? valFromOption(match$3) : {};
  var match$4 = Props.textStyle;
  var textStyle = match$4 !== undefined ? valFromOption(match$4) : {};
  var styles = getStylesByVariant$1(variantFromString(variant), theme.button);
  var style = StyleSheet.flatten(
  /* array */
  [theme.button.wrapper, styles.wrapper, disabled ? theme.button.disabledWrapper : {}, wrapperStyle]);

  var Button$1 = function (Props) {
    var children = Props.children;
    var match = loading || disabled;

    if (match) {
      return createElement(View$1, {
        style: style,
        children: children
      });
    } else {
      return createElement(TouchableOpacity, {
        style: style,
        onPress: onPress,
        children: children
      });
    }
  };

  var match$5 = loading && !disabled;
  return createElement(Button$1, {
    children: match$5 ? createElement(ActivityIndicator, {
      color: styles.loadingIndicator.color,
      size: "small"
    }) : createElement(Text$2, {
      style: StyleSheet.flatten(
      /* array */
      [theme.button.text, styles.text, disabled ? theme.button.disabledText : {}, textStyle]),
      children: text
    })
  });
}
var $$default$a = Button$2;
/* react Not a pure module */

var out_of_memory =
/* tuple */
["Out_of_memory", 0];
var sys_error =
/* tuple */
["Sys_error", -1];
var failure =
/* tuple */
["Failure", -2];
var invalid_argument =
/* tuple */
["Invalid_argument", -3];
var end_of_file =
/* tuple */
["End_of_file", -4];
var division_by_zero =
/* tuple */
["Division_by_zero", -5];
var not_found =
/* tuple */
["Not_found", -6];
var match_failure =
/* tuple */
["Match_failure", -7];
var stack_overflow =
/* tuple */
["Stack_overflow", -8];
var sys_blocked_io =
/* tuple */
["Sys_blocked_io", -9];
var assert_failure =
/* tuple */
["Assert_failure", -10];
var undefined_recursive_module =
/* tuple */
["Undefined_recursive_module", -11];
out_of_memory.tag = 248;
sys_error.tag = 248;
failure.tag = 248;
invalid_argument.tag = 248;
end_of_file.tag = 248;
division_by_zero.tag = 248;
not_found.tag = 248;
match_failure.tag = 248;
stack_overflow.tag = 248;
sys_blocked_io.tag = 248;
assert_failure.tag = 248;
undefined_recursive_module.tag = 248;
/*  Not a pure module */

function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;

  while (j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }
  return result;
}
/* No side effect */

function app(_f, _args) {
  while (true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;

    if (d === 0) {
      return f.apply(null, args);
    } else if (d < 0) {
      _args = caml_array_sub(args, arity, -d | 0);
      _f = f.apply(null, caml_array_sub(args, 0, arity));
      continue;
    } else {
      return function (f, args) {
        return function (x) {
          return app(f, args.concat(
          /* array */
          [x]));
        };
      }(f, args);
    }
  }
}

function curry_1(o, a0, arity) {
  switch (arity) {
    case 1:
      return o(a0);

    case 2:
      return function (param) {
        return o(a0, param);
      };

    case 3:
      return function (param, param$1) {
        return o(a0, param, param$1);
      };

    case 4:
      return function (param, param$1, param$2) {
        return o(a0, param, param$1, param$2);
      };

    case 5:
      return function (param, param$1, param$2, param$3) {
        return o(a0, param, param$1, param$2, param$3);
      };

    case 6:
      return function (param, param$1, param$2, param$3, param$4) {
        return o(a0, param, param$1, param$2, param$3, param$4);
      };

    case 7:
      return function (param, param$1, param$2, param$3, param$4, param$5) {
        return o(a0, param, param$1, param$2, param$3, param$4, param$5);
      };

    default:
      return app(o,
      /* array */
      [a0]);
  }
}

function _1(o, a0) {
  var arity = o.length;

  if (arity === 1) {
    return o(a0);
  } else {
    return curry_1(o, a0, arity);
  }
}

function __1(o) {
  var arity = o.length;

  if (arity === 1) {
    return o;
  } else {
    return function (a0) {
      return _1(o, a0);
    };
  }
}
/* No side effect */

function mapWithDefaultU(opt, $$default, f) {
  if (opt !== undefined) {
    return f(valFromOption(opt));
  } else {
    return $$default;
  }
}

function mapWithDefault(opt, $$default, f) {
  return mapWithDefaultU(opt, $$default, __1(f));
}

function flatMapU(opt, f) {
  if (opt !== undefined) {
    return f(valFromOption(opt));
  }
}

function flatMap(opt, f) {
  return flatMapU(opt, __1(f));
}

function getWithDefault(opt, $$default) {
  if (opt !== undefined) {
    return valFromOption(opt);
  } else {
    return $$default;
  }
}
/* No side effect */

function revSearch(len, array, x) {
  var _i = 0;
  var len$1 = len;
  var xs = array;
  var k = x;

  while (true) {
    var i = _i;

    if (i === len$1) {
      return;
    } else {
      var match = xs[i];

      if (match[1] === k) {
        return match[0];
      } else {
        _i = i + 1 | 0;
        continue;
      }
    }
  }
}
/* No side effect */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
var emptyStyle = {};
var jsMapperConstantArray =
/* array */
[
/* tuple */
[-1055161979, "bold"],
/* tuple */
[812216871, "normal"],
/* tuple */
[1055956338, "100"],
/* tuple */
[1056006067, "200"],
/* tuple */
[1056055796, "300"],
/* tuple */
[1056105525, "400"],
/* tuple */
[1056155254, "500"],
/* tuple */
[1056204983, "600"],
/* tuple */
[1056254712, "700"],
/* tuple */
[1056304441, "800"],
/* tuple */
[1056354170, "900"]];

function weightFromJs(param) {
  return revSearch(11, jsMapperConstantArray, param);
}

function $pipe$question(x, y) {
  if (x !== undefined) {
    return valFromOption(x);
  } else {
    return y;
  }
}

function $$Text(Props) {
  var children = Props.children;
  var size = Props.size;
  var weight = Props.weight;
  var color = Props.color;
  var style = Props.style;
  var match = Props.theme;
  var theme = match !== undefined ? valFromOption(match) : $$default$9;
  var tmp = {
    fontWeight: function () {
      switch (getWithDefault(flatMap(weight, weightFromJs),
      /* _400 */
      1056105525)) {
        case 812216871:
          return "normal";

        case -1055161979:
          return "bold";

        case 1055956338:
          return "100";

        case 1056006067:
          return "200";

        case 1056055796:
          return "300";

        case 1056105525:
          return "400";

        case 1056155254:
          return "500";

        case 1056204983:
          return "600";

        case 1056254712:
          return "700";

        case 1056304441:
          return "800";

        case 1056354170:
          return "900";
      }
    }()
  };

  if (color !== undefined) {
    tmp.color = valFromOption(color);
  }

  return createElement(Text$2, {
    style: StyleSheet.flatten(
    /* array */
    [theme.text.text, mapWithDefault(size, emptyStyle, function (size) {
      switch (size) {
        case "h1":
          return theme.text.h1;

        case "h2":
          return theme.text.h2;

        case "h3":
          return theme.text.h3;

        case "h4":
          return theme.text.h4;

        case "h5":
          return theme.text.h5;

        default:
          return emptyStyle;
      }
    }), tmp, $pipe$question(style, emptyStyle)]),
    children: children
  });
}
var $$default$b = $$Text;
/* react Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

function ListItem$Wrapper(Props) {
  var onPress = Props.onPress;
  var style = Props.style;
  var children = Props.children;

  if (onPress !== undefined) {
    return createElement(TouchableOpacity, {
      style: style,
      onPress: onPress,
      children: children
    });
  } else {
    return createElement(View$1, {
      style: style,
      children: children
    });
  }
}
var emptyStyle$1 = {};

function ListItem$2(Props) {
  var title = Props.title;
  var subtitle = Props.subtitle;
  var onPress = Props.onPress;
  var leftElement = Props.leftElement;
  var rightElement = Props.rightElement;
  var wrapperStyle = Props.wrapperStyle;
  var titleStyle = Props.titleStyle;
  var subtitleStyle = Props.subtitleStyle;
  var match = Props.theme;
  var theme = match !== undefined ? valFromOption(match) : $$default$9;
  var tmp = {
    style: StyleSheet.flatten(
    /* array */
    [theme.listItem.styles.wrapper, getWithDefault(wrapperStyle, emptyStyle$1)]),
    children: null
  };

  if (onPress !== undefined) {
    tmp.onPress = valFromOption(onPress);
  }

  return createElement(ListItem$Wrapper, tmp, createElement(View$1, {
    style: theme.listItem.styles.contentWrapper,
    children: null
  }, getWithDefault(leftElement, null), createElement(View$1, {
    children: null
  }, createElement(Text$2, {
    style: StyleSheet.flatten(
    /* array */
    [theme.listItem.styles.title, getWithDefault(titleStyle, emptyStyle$1)]),
    children: title
  }), subtitle !== undefined ? createElement(Text$2, {
    style: StyleSheet.flatten(
    /* array */
    [theme.listItem.styles.subtitle, getWithDefault(subtitleStyle, emptyStyle$1)]),
    children: valFromOption(subtitle)
  }) : null)), getWithDefault(rightElement, null));
}
var $$default$c = ListItem$2;
/* react Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
var email$1 = email;

function xmlFromIcon(icon) {
  if (icon === "email") {
    return email$1;
  }
}

function Icon$2(Props) {
  var icon = Props.icon;
  var size = Props.size;
  var color = Props.color;
  var wrapperStyle = Props.wrapperStyle;
  var match = xmlFromIcon(icon);

  if (match !== undefined) {
    return createElement(View$1, {
      style: StyleSheet.flatten(
      /* array */
      [{
        alignItems: "center",
        display: "flex",
        height: size,
        justifyContent: "center",
        width: size
      }, wrapperStyle]),
      children: createElement(SvgXml, {
        xml: match,
        override: {
          width: size,
          height: size,
          fill: color
        }
      })
    });
  } else {
    return null;
  }
}

var make = Icon$2;
var $$default$d = Icon$2;
/* email Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

var emptyStyle$2 = {};

function noop$1(param) {
  return (
    /* () */
    0
  );
}

function TextInput$2(Props) {
  var match = Props.label;
  var label = match !== undefined ? match : "";
  var match$1 = Props.value;
  var value = match$1 !== undefined ? match$1 : "";
  var match$2 = Props.onChange;
  var onChange = match$2 !== undefined ? match$2 : noop$1;
  var match$3 = Props.onChangeText;
  var onChangeText = match$3 !== undefined ? match$3 : noop$1;
  var match$4 = Props.onFocus;
  var onFocus = match$4 !== undefined ? match$4 : noop$1;
  var match$5 = Props.onBlur;
  var onBlur = match$5 !== undefined ? match$5 : noop$1;
  var match$6 = Props.onPressIcon;
  var onPressIcon = match$6 !== undefined ? match$6 : noop$1;
  var match$7 = Props.rightIcon;
  var rightIcon = match$7 !== undefined ? match$7 : "";
  var match$8 = Props.disabled;
  var disabled = match$8 !== undefined ? match$8 : false;
  var match$9 = Props.error;
  var error = match$9 !== undefined ? match$9 : "";
  var match$10 = Props.autoFocus;
  var autoFocus = match$10 !== undefined ? match$10 : false;
  var match$11 = Props.secureTextEntry;
  var secureTextEntry = match$11 !== undefined ? match$11 : false;
  var match$12 = Props.multiline;
  var multiline = match$12 !== undefined ? match$12 : false;
  var match$13 = Props.wrapperStyle;
  var wrapperStyle = match$13 !== undefined ? valFromOption(match$13) : emptyStyle$2;
  var match$14 = Props.labelStyle;
  var labelStyle = match$14 !== undefined ? valFromOption(match$14) : emptyStyle$2;
  var match$15 = Props.inputStyle;
  var inputStyle = match$15 !== undefined ? valFromOption(match$15) : emptyStyle$2;
  var match$16 = Props.iconStyle;
  var iconStyle = match$16 !== undefined ? valFromOption(match$16) : emptyStyle$2;
  var match$17 = Props.errorStyle;
  var errorStyle = match$17 !== undefined ? valFromOption(match$17) : emptyStyle$2;
  var match$18 = Props.theme;
  var theme = match$18 !== undefined ? valFromOption(match$18) : $$default$9;
  var match$19 = useState(function () {
    return false;
  });
  var setFocused = match$19[1];
  var focused = match$19[0];
  var handleFocus = useCallback(function (param) {
    _1(setFocused, function (param) {
      return true;
    });

    _1(onFocus,
    /* () */
    0);

    return (
      /* () */
      0
    );
  },
  /* tuple */
  [onFocus, setFocused]);
  var handleBlur = useCallback(function (param) {
    _1(setFocused, function (param) {
      return false;
    });

    _1(onBlur,
    /* () */
    0);

    return (
      /* () */
      0
    );
  },
  /* tuple */
  [onBlur, setFocused]);
  var match$20 = error.length !== 0;
  var match$21 = focused || value.length !== 0;
  var match$22 = error.length !== 0;
  var match$23 = !(inputStyle.color == null);
  var match$24 = error.length !== 0;
  return createElement(View$1, {
    style: StyleSheet.flatten(
    /* array */
    [theme.textInput.wrapper, wrapperStyle]),
    children: null
  }, createElement(Text$2, {
    style: StyleSheet.flatten(
    /* array */
    [theme.textInput.label, focused ? theme.textInput.activeLabel : emptyStyle$2, match$20 ? theme.textInput.errorLabel : emptyStyle$2, labelStyle]),
    children: match$21 ? label : ""
  }), createElement(View$1, {
    style: StyleSheet.flatten(
    /* array */
    [theme.textInput.textInput, focused ? theme.textInput.activeTextInput : emptyStyle$2, match$22 ? theme.textInput.errorTextInput : emptyStyle$2, inputStyle]),
    children: null
  }, createElement(TextInput$3, {
    autoFocus: autoFocus,
    editable: !disabled,
    multiline: multiline,
    onBlur: handleBlur,
    onChange: onChange,
    onChangeText: onChangeText,
    onFocus: handleFocus,
    placeholder: focused ? "" : label,
    placeholderTextColor: StyleSheet.flatten(
    /* array */
    [theme.textInput.baseTextInput, inputStyle, disabled ? theme.textInput.disabledBaseTextInput : emptyStyle$2]).color,
    scrollEnabled: false,
    secureTextEntry: secureTextEntry,
    value: value,
    style: StyleSheet.flatten(
    /* array */
    [theme.textInput.baseTextInput, match$23 ? {
      color: inputStyle.color
    } : emptyStyle$2, disabled ? theme.textInput.disabledBaseTextInput : emptyStyle$2])
  }), createElement(TouchableWithoutFeedback, {
    onPress: onPressIcon,
    children: createElement(make, {
      icon: rightIcon,
      size: 20.0,
      color: StyleSheet.flatten(
      /* array */
      [theme.textInput.icon, focused ? theme.textInput.activeIcon : emptyStyle$2, match$24 ? theme.textInput.errorIcon : emptyStyle$2, iconStyle]).color,
      wrapperStyle: theme.textInput.icon
    })
  })), createElement(Text$2, {
    style: StyleSheet.flatten(
    /* array */
    [theme.textInput.errorMessage, errorStyle]),
    children: error
  }));
}
var $$default$e = TextInput$2;
/* Icon Not a pure module */

function timing(prim, prim$1) {
  return Animated.timing(prim, prim$1);
}

function start(prim, prim$1, prim$2) {
  prim.start(prim$1 !== undefined ? valFromOption(prim$1) : undefined);
  return (
    /* () */
    0
  );
}
var make$1 = Animated.createAnimatedComponent(FlatList);
var make$1$1 = Animated.createAnimatedComponent(Image);
var make$2 = Animated.createAnimatedComponent(ScrollView);
var make$3 = Animated.createAnimatedComponent(SectionList);
var make$4 = Animated.createAnimatedComponent(Text$2);
var make$5 = Animated.createAnimatedComponent(View$1);
var View = {
  make: make$5
};
/* make Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

function noop$2(param) {
  return (
    /* () */
    0
  );
}

function Switch(Props) {
  var match = Props.value;
  var value = match !== undefined ? match : false;
  var match$1 = Props.onValueChange;
  var onValueChange = match$1 !== undefined ? match$1 : noop$2;
  var match$2 = Props.theme;
  var theme = match$2 !== undefined ? valFromOption(match$2) : $$default$9;
  var offset = value ? theme._switch.thumbOn.left : theme._switch.thumbOff.left;
  var match$3 = useState(function () {
    return new Animated.Value(offset);
  });
  var animatedOffset = match$3[0];
  useEffect(function () {
    var config = {
      toValue: offset,
      duration: 200.0
    };
    start(timing(animatedOffset, config), undefined);
    return;
  },
  /* array */
  [value]);
  return createElement(TouchableWithoutFeedback, {
    onPress: function (param) {
      return _1(onValueChange, !value);
    },
    children: createElement(View$1, {
      style: StyleSheet.flatten(
      /* array */
      [theme._switch.track, value ? theme._switch.trackOn : theme._switch.trackOff]),
      children: createElement(View$1, {
        style: theme._switch.thumbWrapper,
        children: createElement(View.make, {
          style: StyleSheet.flatten(
          /* array */
          [theme._switch.thumb, value ? theme._switch.thumbOn : theme._switch.thumbOff, {
            left: animatedOffset
          }])
        })
      })
    })
  });
}
var $$default$f = Switch;
/* react Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
var emptyStyle$3 = {};

function getStylesBySize(size, styles) {
  var mediumSizeStyles = {
    wrapper: styles.mediumWrapper,
    titleWrapper: styles.mediumTitleWrapper,
    title: styles.mediumTitle,
    image: styles.mediumImage
  };
  var largeSizeStyles = {
    wrapper: styles.largeWrapper,
    titleWrapper: styles.largeTitleWrapper,
    title: styles.largeTitle,
    image: styles.largeImage
  };
  return mapWithDefault(size, mediumSizeStyles, function (param) {
    if (param === "large") {
      return largeSizeStyles;
    } else {
      return mediumSizeStyles;
    }
  });
}

function Avatar(Props) {
  var source = Props.source;
  var size = Props.size;
  var match = Props.title;
  var title = match !== undefined ? match : "";
  var wrapperStyle = Props.wrapperStyle;
  var titleStyle = Props.titleStyle;
  var match$1 = Props.theme;
  var theme = match$1 !== undefined ? valFromOption(match$1) : $$default$9;
  var styles = getStylesBySize(size, theme.avatar);
  return createElement(View$1, {
    style: StyleSheet.flatten(
    /* array */
    [theme.avatar.wrapper, styles.wrapper, getWithDefault(wrapperStyle, emptyStyle$3)]),
    children: null
  }, createElement(View$1, {
    style: StyleSheet.flatten(
    /* array */
    [theme.avatar.titleWrapper, styles.titleWrapper]),
    children: createElement(Text$2, {
      style: StyleSheet.flatten(
      /* array */
      [theme.avatar.title, styles.title, getWithDefault(titleStyle, emptyStyle$3)]),
      children: title
    })
  }), source !== undefined ? createElement(Image, {
    resizeMode: "cover",
    source: {
      uri: source
    },
    style: StyleSheet.flatten(
    /* array */
    [theme.avatar.image, styles.image])
  }) : null);
}
var $$default$g = Avatar;
/* react Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

function hasHomeBar$1(param) {
  var $$window = Dimensions.get("window");
  var isLandscape = $$window.width > $$window.height;
  var bottomPadding = getInset("bottom", isLandscape);
  return bottomPadding > 0.0;
}

var isAndroid$1 = Platform$1.OS === "android";
var isIOS$1 = Platform$1.OS === "ios";
var Platform = {
  isAndroid: isAndroid$1,
  isIOS: isIOS$1
};
/* isAndroid Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

function BottomButton$Wrapper(Props) {
  var enabled = Props.enabled;
  var onPress = Props.onPress;
  var style = Props.style;
  var children = Props.children;

  if (enabled && onPress !== undefined) {
    return createElement(TouchableOpacity, {
      style: style,
      onPress: onPress,
      children: children
    });
  }

  return createElement(View$1, {
    style: style,
    children: children
  });
}
var emptyStyle$4 = {};

function BottomButton$2(Props) {
  var text = Props.text;
  var onPress = Props.onPress;
  var match = Props.disabled;
  var disabled = match !== undefined ? match : false;
  var match$1 = Props.loading;
  var loading = match$1 !== undefined ? match$1 : false;
  var forceInset = Props.forceInset;
  var match$2 = Props.wrapperStyle;
  var wrapperStyle = match$2 !== undefined ? valFromOption(match$2) : emptyStyle$4;
  var match$3 = Props.buttonStyle;
  var buttonStyle = match$3 !== undefined ? valFromOption(match$3) : emptyStyle$4;
  var match$4 = Props.textStyle;
  var textStyle = match$4 !== undefined ? valFromOption(match$4) : emptyStyle$4;
  var match$5 = Props.theme;
  var theme = match$5 !== undefined ? valFromOption(match$5) : $$default$9;
  var match$6 = useState(function () {
    return false;
  });
  var setShowKeyboard = match$6[1];
  var hasHomeBar = hasHomeBar$1();
  var themeWrapperStyle;
  var exit = 0;

  if (forceInset !== undefined) {
    switch (forceInset) {
      case "always":
        themeWrapperStyle = theme.bottomButton.wrapperWithHomeBar;
        break;

      case "never":
        themeWrapperStyle = theme.bottomButton.wrapperWithoutHomeBar;
        break;

      default:
        exit = 1;
    }
  } else {
    exit = 1;
  }

  if (exit === 1) {
    themeWrapperStyle = match$6[0] || !hasHomeBar ? theme.bottomButton.wrapperWithoutHomeBar : theme.bottomButton.wrapperWithHomeBar;
  }

  useEffect(function () {
    var listener = Keyboard.addListener("keyboardWillShow", function (param) {
      return _1(setShowKeyboard, function (param) {
        return true;
      });
    });
    return function (param) {
      listener.remove();
      return (
        /* () */
        0
      );
    };
  }, []);
  useEffect(function () {
    var listener = Keyboard.addListener("keyboardWillHide", function (param) {
      return _1(setShowKeyboard, function (param) {
        return false;
      });
    });
    return function (param) {
      listener.remove();
      return (
        /* () */
        0
      );
    };
  }, []);
  var tmp;
  var exit$1 = 0;

  if (loading && !disabled) {
    tmp = createElement(ActivityIndicator, {
      color: theme.bottomButton.loadingIndicator.color,
      size: "small"
    });
  } else {
    exit$1 = 1;
  }

  if (exit$1 === 1) {
    tmp = createElement(Text$2, {
      style: StyleSheet.flatten(
      /* array */
      [theme.bottomButton.text, disabled ? theme.bottomButton.disabledText : emptyStyle$4, textStyle]),
      children: text
    });
  }

  var tmp$1 = {
    enabled: !loading && !disabled,
    style: StyleSheet.flatten(
    /* array */
    [theme.bottomButton.wrapper, themeWrapperStyle, disabled ? theme.bottomButton.disabledWrapper : emptyStyle$4, wrapperStyle]),
    children: createElement(View$1, {
      style: StyleSheet.flatten(
      /* array */
      [theme.bottomButton.button, buttonStyle]),
      children: tmp
    })
  };

  if (onPress !== undefined) {
    tmp$1.onPress = valFromOption(onPress);
  }

  return createElement(BottomButton$Wrapper, tmp$1);
}
var $$default$h = BottomButton$2;
/* react Not a pure module */

// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

function noop$3(param) {
  return (
    /* () */
    0
  );
}

function DateTimePicker$DateTimePickerIOS(Props) {
  var show = Props.show;
  var mode = Props.mode;
  var value = Props.value;
  var onChange = Props.onChange;
  var onDismiss = Props.onDismiss;
  var theme = Props.theme;
  var match = useState(function () {
    return value;
  });
  var setPickedDate = match[1];
  var pickedDate = match[0];
  var handleChange = useCallback(function (param) {
    _1(onChange, pickedDate);

    _1(onDismiss,
    /* () */
    0);

    return (
      /* () */
      0
    );
  },
  /* array */
  [pickedDate]);
  var handleDismiss = useCallback(function (param) {
    _1(onDismiss,
    /* () */
    0);

    return (
      /* () */
      0
    );
  });
  var handleKeyboardWillShow = useCallback(function (param) {
    _1(onDismiss,
    /* () */
    0);

    return (
      /* () */
      0
    );
  });
  var handleDateChange = useCallback(function (date) {
    _1(setPickedDate, function (param) {
      return date;
    });

    return (
      /* () */
      0
    );
  });
  useEffect(function () {
    if (show) {
      Keyboard.dismiss();
    }

    var keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", handleKeyboardWillShow);

    _1(setPickedDate, function (param) {
      return value;
    });

    return function (param) {
      keyboardWillShowListener.remove();
      return (
        /* () */
        0
      );
    };
  },
  /* tuple */
  [show, value]);

  if (show) {
    return createElement(SafeAreaView, {
      forceInset: {
        bottom: "always"
      },
      style: theme.dateTimePicker.wrapper,
      children: null
    }, createElement(View$1, {
      style: theme.dateTimePicker.actions,
      children: null
    }, createElement(TouchableOpacity, {
      style: theme.dateTimePicker.action,
      onPress: handleDismiss,
      children: createElement(Text$2, {
        style: theme.dateTimePicker.actionText,
        children: "Cancel"
      })
    }), createElement(TouchableOpacity, {
      style: theme.dateTimePicker.action,
      onPress: handleChange,
      children: createElement(Text$2, {
        style: StyleSheet.flatten(
        /* array */
        [theme.dateTimePicker.actionText, {
          fontWeight: "600"
        }]),
        children: "Done"
      })
    })), createElement(DatePickerIOS, {
      date: pickedDate,
      onDateChange: handleDateChange,
      mode: function () {
        switch (mode) {
          case -1033677266:
            return "date";

          case -855847923:
            return "time";

          case -281947845:
            return "datetime";
        }
      }()
    }));
  } else {
    return null;
  }
}

function DateTimePicker$DateTimePickerAndroid(Props) {
  var show = Props.show;
  var mode = Props.mode;
  var value = Props.value;
  var onChange = Props.onChange;
  var onDismiss = Props.onDismiss;
  useEffect(function () {
    if (show && mode ===
    /* date */
    -1033677266) {
      var datePickerOptions = {
        date: value
      };
      DatePickerAndroid.open(datePickerOptions).then(function (response) {
        if (response.action === DatePickerAndroid.dateSetAction) {
          _1(onChange, new Date(response.year, response.month, response.day));
        }

        _1(onDismiss,
        /* () */
        0);

        return Promise.resolve(
        /* () */
        0);
      });
    }

    return;
  },
  /* array */
  [show]);
  return null;
}

function DateTimePicker$2(Props) {
  var match = Props.show;
  var show = match !== undefined ? match : false;
  var match$1 = Props.mode;
  var mode = match$1 !== undefined ? match$1 :
  /* date */
  -1033677266;
  var match$2 = Props.value;
  var value = match$2 !== undefined ? valFromOption(match$2) : new Date();
  var match$3 = Props.onChange;
  var onChange = match$3 !== undefined ? match$3 : noop$3;
  var match$4 = Props.onDismiss;
  var onDismiss = match$4 !== undefined ? match$4 : noop$3;
  var match$5 = Props.theme;
  var theme = match$5 !== undefined ? valFromOption(match$5) : $$default$9;
  var match$6 = Platform.isAndroid;

  if (match$6) {
    return createElement(DateTimePicker$DateTimePickerAndroid, {
      show: show,
      mode: mode,
      value: value,
      onChange: onChange,
      onDismiss: onDismiss
    });
  } else {
    return createElement(DateTimePicker$DateTimePickerIOS, {
      show: show,
      mode: mode,
      value: value,
      onChange: onChange,
      onDismiss: onDismiss,
      theme: theme
    });
  }
}
var $$default$i = DateTimePicker$2;
/* react Not a pure module */

export { BottomButton$1 as BottomButton, Button$1 as Button, Card$1 as Card, Container$1 as Container, DateTimePicker$1 as DateTimePicker, Icon$1 as Icon, KeyboardAvoidingView, ListItem$1 as ListItem, $$default$g as ReAvatar, $$default$h as ReBottomButton, $$default$a as ReButton, $$default$i as ReDateTimePicker, $$default$d as ReIcon, $$default$c as ReListItem, $$default$f as ReSwitch, $$default$b as ReText, $$default$e as ReTextInput, Text$1 as Text, TextInput$1 as TextInput, injectTheme, themeManager };
