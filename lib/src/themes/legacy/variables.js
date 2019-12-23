import { Platform, Dimensions } from 'react-native';

const IP6_WIDTH = 375;
const IP6_HEIGHT = 667;
const isWeb = Platform.OS === 'web';
const { height, width } = Dimensions.get('window');

const scaleByWidth = (size, baseWidth = IP6_WIDTH) =>
  Math.floor((width / baseWidth) * size);

const scaleByHeight = (size, baseHeight = IP6_HEIGHT) =>
  Math.floor((height / baseHeight) * size);

const scale = size => {
  const phoneRatio = height / width;
  if (phoneRatio > 1.6) return scaleByWidth(size);
  return scaleByHeight(size);
};

export const BLUE = '#1dbeee';
export const FOCUS_BLUE_1 = '#003580';
export const FOCUS_BLUE_2 = '#40679f';
export const FOCUS_BLUE_3 = '#5d7ead';
export const BACKGROUND_BLUE_1 = '#347ab7';
export const BACKGROUND_BLUE_2 = '#b5eeff';
export const BACKGROUND_BLUE_3 = '#e6f7ff';
export const RED = '#de350b';
export const ORANGE = '#ffa234';

export const BLACK = '#000000';
export const GREY_1 = '#2b2b2b';
export const GREY_2 = '#71767c';
export const GREY_3 = '#a3a6ac';
export const GREY_4 = '#d9dbdf';
export const GREY_5 = '#f5f6f8';
export const WHITE = '#fcfcfc';

export const BASE_SIZE = isWeb ? 16 : scale(16);
export const FONT_SIZE = isWeb ? 16 : scale(16);

// Edit these 👇

export const FONT_FAMILY = isWeb ? undefined : 'Proxima Nova';

export const PRIMARY_COLOR = BLUE;
export const DANGER_COLOR = RED;

export const TEXT_COLOR = BLACK;
export const INVERTED_TEXT_COLOR = WHITE;
export const DISABLED_TEXT_COLOR = GREY_3;
export const MUTED_TEXT_COLOR = GREY_3;
export const LINK_TEXT_COLOR = BLUE;

export const BORDER_COLOR = GREY_4;
export const BACKGROUND_COLOR = WHITE;
export const DISABLED_BACKGROUND_COLOR = GREY_4;

export const SMALL_SIZE = BASE_SIZE * 0.5;
export const MEDIUM_SIZE = BASE_SIZE * 1;
export const LARGE_SIZE = BASE_SIZE * 1.5;

export const HEADER_5 = FONT_SIZE * 0.83;
export const HEADER_4 = FONT_SIZE * 1;
export const HEADER_3 = FONT_SIZE * 1.17;
export const HEADER_2 = FONT_SIZE * 1.5;
export const HEADER_1 = FONT_SIZE * 2;
