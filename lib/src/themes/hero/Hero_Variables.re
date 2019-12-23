[@bs.module "../../helpers/normalizeText.js"]
external normalizeText: float => float = "default";

let isWeb = ReactNative.(Platform.os == Platform.web);

let _BLUE = "#1dbeee";
let _FOCUS_BLUE_1 = "#003580";
let _FOCUS_BLUE_2 = "#40679f";
let _FOCUS_BLUE_3 = "#5d7ead";
let _BACKGROUND_BLUE_1 = "#347ab7";
let _BACKGROUND_BLUE_2 = "#b5eeff";
let _BACKGROUND_BLUE_3 = "#e6f7ff";
let _RED = "#de350b";
let _ORANGE = "#ffa234";

let _BLACK = "#000000";
let _GREY_1 = "#2b2b2b";
let _GREY_2 = "#71767c";
let _GREY_3 = "#a3a6ac";
let _GREY_4 = "#d9dbdf";
let _GREY_5 = "#f5f6f8";
let _WHITE = "#fcfcfc";

let _BASE_SIZE = isWeb ? 16.0 : normalizeText(13.0);
let _FONT_SIZE = isWeb ? 16.0 : normalizeText(13.0);

/* Edit these 👇 */

let _FONT_FAMILY = isWeb ? None : Some("Proxima Nova");

let _PRIMARY_COLOR = _BLUE;
let _DARK_PRIMARY_COLOR = _FOCUS_BLUE_1;
let _DANGER_COLOR = _RED;

let _TEXT_COLOR = _BLACK;
let _INVERTED_TEXT_COLOR = _WHITE;
let _DISABLED_TEXT_COLOR = _GREY_3;
let _MUTED_TEXT_COLOR = _GREY_3;
let _LINK_TEXT_COLOR = _BLUE;

let _BORDER_COLOR = _GREY_4;
let _BACKGROUND_COLOR = _WHITE;
let _DISABLED_BACKGROUND_COLOR = _GREY_4;

let _SMALL_SIZE = _BASE_SIZE *. 0.5;
let _MEDIUM_SIZE = _BASE_SIZE *. 1.0;
let _LARGE_SIZE = _BASE_SIZE *. 1.5;

let _HEADER_5 = _FONT_SIZE *. 0.83;
let _HEADER_4 = _FONT_SIZE *. 1.0;
let _HEADER_3 = _FONT_SIZE *. 1.17;
let _HEADER_2 = _FONT_SIZE *. 1.5;
let _HEADER_1 = _FONT_SIZE *. 2.0;
