/* TypeScript file generated from MentionTextInput.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const MentionTextInputBS = require('./MentionTextInput.bs');

import {Style_t as ReactNative_Style_t} from '../../src/shims/ReactNative.shim';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class textBlock { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type message = textBlock[];

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly autoFocus: boolean; 
  readonly disabled: boolean; 
  readonly error?: string; 
  readonly highlightTextStyle?: ReactNative_Style_t; 
  readonly onBlur: () => void; 
  readonly onChange: (_1:message) => void; 
  readonly onFocus: () => void; 
  readonly placeholder: string; 
  readonly renderSuggestionList: (_1:string, _2:((_1:string, _2:string) => void)) => JSX.Element; 
  readonly rightIcon: string; 
  readonly testID: string; 
  readonly theme?: {
    readonly _switch: {
      readonly thumb: ReactNative_Style_t; 
      readonly thumbOff: ReactNative_Style_t; 
      readonly thumbOn: ReactNative_Style_t; 
      readonly thumbWrapper: ReactNative_Style_t; 
      readonly track: ReactNative_Style_t; 
      readonly trackOff: ReactNative_Style_t; 
      readonly trackOn: ReactNative_Style_t
    }; 
    readonly avatar: {
      readonly image: ReactNative_Style_t; 
      readonly largeImage: ReactNative_Style_t; 
      readonly largeTitle: ReactNative_Style_t; 
      readonly largeTitleWrapper: ReactNative_Style_t; 
      readonly largeWrapper: ReactNative_Style_t; 
      readonly mediumImage: ReactNative_Style_t; 
      readonly mediumTitle: ReactNative_Style_t; 
      readonly mediumTitleWrapper: ReactNative_Style_t; 
      readonly mediumWrapper: ReactNative_Style_t; 
      readonly smallImage: ReactNative_Style_t; 
      readonly smallTitle: ReactNative_Style_t; 
      readonly smallTitleWrapper: ReactNative_Style_t; 
      readonly smallWrapper: ReactNative_Style_t; 
      readonly title: ReactNative_Style_t; 
      readonly titleWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly badge: {
      readonly content: ReactNative_Style_t; 
      readonly errorContent: ReactNative_Style_t; 
      readonly errorWrapper: ReactNative_Style_t; 
      readonly infoContent: ReactNative_Style_t; 
      readonly infoWrapper: ReactNative_Style_t; 
      readonly successContent: ReactNative_Style_t; 
      readonly successWrapper: ReactNative_Style_t; 
      readonly warningContent: ReactNative_Style_t; 
      readonly warningWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly bottomButton: {
      readonly button: ReactNative_Style_t; 
      readonly disabledText: ReactNative_Style_t; 
      readonly disabledWrapper: ReactNative_Style_t; 
      readonly loadingIndicator: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t; 
      readonly wrapperWithHomeBar: ReactNative_Style_t; 
      readonly wrapperWithoutHomeBar: ReactNative_Style_t
    }; 
    readonly button: {
      readonly disabledText: ReactNative_Style_t; 
      readonly disabledWrapper: ReactNative_Style_t; 
      readonly filledLoadingIndicator: ReactNative_Style_t; 
      readonly filledText: ReactNative_Style_t; 
      readonly filledWrapper: ReactNative_Style_t; 
      readonly outlinedLoadingIndicator: ReactNative_Style_t; 
      readonly outlinedText: ReactNative_Style_t; 
      readonly outlinedWrapper: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly buttonGroup: {
      readonly activeButton: ReactNative_Style_t; 
      readonly activeText: ReactNative_Style_t; 
      readonly button: ReactNative_Style_t; 
      readonly group: ReactNative_Style_t; 
      readonly inactiveButton: ReactNative_Style_t; 
      readonly inactiveText: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly calendar: {
      readonly blurredDayText: ReactNative_Style_t; 
      readonly currentDayText: ReactNative_Style_t; 
      readonly day: ReactNative_Style_t; 
      readonly dayName: ReactNative_Style_t; 
      readonly dayNameSunday: ReactNative_Style_t; 
      readonly dayText: ReactNative_Style_t; 
      readonly header: ReactNative_Style_t; 
      readonly headerButton: ReactNative_Style_t; 
      readonly headerTitle: ReactNative_Style_t; 
      readonly hiddenDay: ReactNative_Style_t; 
      readonly mark: ReactNative_Style_t; 
      readonly markedDay: ReactNative_Style_t; 
      readonly monthView: ReactNative_Style_t; 
      readonly selectedDay: ReactNative_Style_t; 
      readonly selectedDayText: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly card: {
      readonly card: ReactNative_Style_t
    }; 
    readonly container: {
      readonly container: ReactNative_Style_t; 
      readonly fluid: ReactNative_Style_t
    }; 
    readonly dateTimePicker: {
      readonly action: ReactNative_Style_t; 
      readonly actionText: ReactNative_Style_t; 
      readonly actions: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly errorScreen: {
      readonly actionsWrapper: ReactNative_Style_t; 
      readonly closeButton: ReactNative_Style_t; 
      readonly container: ReactNative_Style_t; 
      readonly image: ReactNative_Style_t; 
      readonly subtitleWrapper: ReactNative_Style_t; 
      readonly titleWrapper: ReactNative_Style_t
    }; 
    readonly icon: {
      readonly icon: ReactNative_Style_t
    }; 
    readonly listItem: {
      readonly contentWrapper: ReactNative_Style_t; 
      readonly subtitle: ReactNative_Style_t; 
      readonly textWrapper: ReactNative_Style_t; 
      readonly title: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly mentionTextInput: {
      readonly disabledText: ReactNative_Style_t; 
      readonly highlightText: ReactNative_Style_t; 
      readonly suggestionWrapper: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly message: {
      readonly content: ReactNative_Style_t; 
      readonly errorContent: ReactNative_Style_t; 
      readonly errorWrapper: ReactNative_Style_t; 
      readonly infoContent: ReactNative_Style_t; 
      readonly infoWrapper: ReactNative_Style_t; 
      readonly successContent: ReactNative_Style_t; 
      readonly successWrapper: ReactNative_Style_t; 
      readonly warningContent: ReactNative_Style_t; 
      readonly warningWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly radio: {
      readonly activeIcon: ReactNative_Style_t; 
      readonly inactiveIcon: ReactNative_Style_t; 
      readonly label: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly richTextEditor: {
      readonly editor: ReactNative_Style_t; 
      readonly errorMessage: ReactNative_Style_t; 
      readonly errorWebview: ReactNative_Style_t; 
      readonly separator: ReactNative_Style_t; 
      readonly suggestionList: ReactNative_Style_t; 
      readonly toolbar: ReactNative_Style_t; 
      readonly toolbarButton: ReactNative_Style_t; 
      readonly webview: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly select: {
      readonly action: ReactNative_Style_t; 
      readonly actionText: ReactNative_Style_t; 
      readonly actions: ReactNative_Style_t; 
      readonly dialog: ReactNative_Style_t; 
      readonly optionText: ReactNative_Style_t; 
      readonly optionWrapper: ReactNative_Style_t; 
      readonly overlay: ReactNative_Style_t; 
      readonly selectedOptionText: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly tabBar: {
      readonly content: ReactNative_Style_t; 
      readonly navigator: ReactNative_Style_t; 
      readonly selectedTab: ReactNative_Style_t; 
      readonly tab: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly text: {
      readonly h1: ReactNative_Style_t; 
      readonly h2: ReactNative_Style_t; 
      readonly h3: ReactNative_Style_t; 
      readonly h4: ReactNative_Style_t; 
      readonly h5: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t
    }; 
    readonly textInput: {
      readonly activeIcon: ReactNative_Style_t; 
      readonly activeLabel: ReactNative_Style_t; 
      readonly activeTextInput: ReactNative_Style_t; 
      readonly baseTextInput: ReactNative_Style_t; 
      readonly disabledBaseTextInput: ReactNative_Style_t; 
      readonly errorIcon: ReactNative_Style_t; 
      readonly errorLabel: ReactNative_Style_t; 
      readonly errorMessage: ReactNative_Style_t; 
      readonly errorTextInput: ReactNative_Style_t; 
      readonly icon: ReactNative_Style_t; 
      readonly label: ReactNative_Style_t; 
      readonly placeholder: ReactNative_Style_t; 
      readonly textInput: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly variables: {
      readonly BACKGROUND_BLUE_1: string; 
      readonly BACKGROUND_BLUE_2: string; 
      readonly BACKGROUND_BLUE_3: string; 
      readonly BACKGROUND_COLOR: string; 
      readonly BASE_SIZE: number; 
      readonly BLACK: string; 
      readonly BLUE: string; 
      readonly BORDER_COLOR: string; 
      readonly DANGER_COLOR: string; 
      readonly DARK_GREEN: string; 
      readonly DARK_ORANGE: string; 
      readonly DARK_PINK: string; 
      readonly DARK_PRIMARY_COLOR: string; 
      readonly DARK_RED: string; 
      readonly DARK_YELLOW: string; 
      readonly DISABLED_BACKGROUND_COLOR: string; 
      readonly DISABLED_TEXT_COLOR: string; 
      readonly ERROR_COLOR: string; 
      readonly FOCUS_BLUE_1: string; 
      readonly FOCUS_BLUE_2: string; 
      readonly FOCUS_BLUE_3: string; 
      readonly FONT_FAMILY?: string; 
      readonly FONT_SIZE: number; 
      readonly GREEN: string; 
      readonly GREY_1: string; 
      readonly GREY_2: string; 
      readonly GREY_3: string; 
      readonly GREY_4: string; 
      readonly GREY_5: string; 
      readonly HEADER_1: number; 
      readonly HEADER_2: number; 
      readonly HEADER_3: number; 
      readonly HEADER_4: number; 
      readonly HEADER_5: number; 
      readonly INFO_COLOR: string; 
      readonly INVERTED_TEXT_COLOR: string; 
      readonly LARGE_SIZE: number; 
      readonly LIGHT_PRIMARY_COLOR: string; 
      readonly LINK_TEXT_COLOR: string; 
      readonly MAGENTA: string; 
      readonly MEDIUM_SIZE: number; 
      readonly MUTED_TEXT_COLOR: string; 
      readonly ORANGE: string; 
      readonly PINK: string; 
      readonly PRIMARY_COLOR: string; 
      readonly RED: string; 
      readonly SMALL_SIZE: number; 
      readonly SOFT_GREEN: string; 
      readonly SOFT_ORANGE: string; 
      readonly SOFT_PINK: string; 
      readonly SOFT_RED: string; 
      readonly SOFT_YELLOW: string; 
      readonly SUCCESS_COLOR: string; 
      readonly TEXT_COLOR: string; 
      readonly WARNING_COLOR: string; 
      readonly WHITE: string; 
      readonly YELLOW: string
    }
  }; 
  readonly value: message
};

export const make: React.ComponentType<{
  readonly autoFocus: boolean; 
  readonly disabled: boolean; 
  readonly error?: string; 
  readonly highlightTextStyle?: ReactNative_Style_t; 
  readonly onBlur: () => void; 
  readonly onChange: (_1:message) => void; 
  readonly onFocus: () => void; 
  readonly placeholder: string; 
  readonly renderSuggestionList: (_1:string, _2:((_1:string, _2:string) => void)) => JSX.Element; 
  readonly rightIcon: string; 
  readonly testID: string; 
  readonly theme?: {
    readonly _switch: {
      readonly thumb: ReactNative_Style_t; 
      readonly thumbOff: ReactNative_Style_t; 
      readonly thumbOn: ReactNative_Style_t; 
      readonly thumbWrapper: ReactNative_Style_t; 
      readonly track: ReactNative_Style_t; 
      readonly trackOff: ReactNative_Style_t; 
      readonly trackOn: ReactNative_Style_t
    }; 
    readonly avatar: {
      readonly image: ReactNative_Style_t; 
      readonly largeImage: ReactNative_Style_t; 
      readonly largeTitle: ReactNative_Style_t; 
      readonly largeTitleWrapper: ReactNative_Style_t; 
      readonly largeWrapper: ReactNative_Style_t; 
      readonly mediumImage: ReactNative_Style_t; 
      readonly mediumTitle: ReactNative_Style_t; 
      readonly mediumTitleWrapper: ReactNative_Style_t; 
      readonly mediumWrapper: ReactNative_Style_t; 
      readonly smallImage: ReactNative_Style_t; 
      readonly smallTitle: ReactNative_Style_t; 
      readonly smallTitleWrapper: ReactNative_Style_t; 
      readonly smallWrapper: ReactNative_Style_t; 
      readonly title: ReactNative_Style_t; 
      readonly titleWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly badge: {
      readonly content: ReactNative_Style_t; 
      readonly errorContent: ReactNative_Style_t; 
      readonly errorWrapper: ReactNative_Style_t; 
      readonly infoContent: ReactNative_Style_t; 
      readonly infoWrapper: ReactNative_Style_t; 
      readonly successContent: ReactNative_Style_t; 
      readonly successWrapper: ReactNative_Style_t; 
      readonly warningContent: ReactNative_Style_t; 
      readonly warningWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly bottomButton: {
      readonly button: ReactNative_Style_t; 
      readonly disabledText: ReactNative_Style_t; 
      readonly disabledWrapper: ReactNative_Style_t; 
      readonly loadingIndicator: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t; 
      readonly wrapperWithHomeBar: ReactNative_Style_t; 
      readonly wrapperWithoutHomeBar: ReactNative_Style_t
    }; 
    readonly button: {
      readonly disabledText: ReactNative_Style_t; 
      readonly disabledWrapper: ReactNative_Style_t; 
      readonly filledLoadingIndicator: ReactNative_Style_t; 
      readonly filledText: ReactNative_Style_t; 
      readonly filledWrapper: ReactNative_Style_t; 
      readonly outlinedLoadingIndicator: ReactNative_Style_t; 
      readonly outlinedText: ReactNative_Style_t; 
      readonly outlinedWrapper: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly buttonGroup: {
      readonly activeButton: ReactNative_Style_t; 
      readonly activeText: ReactNative_Style_t; 
      readonly button: ReactNative_Style_t; 
      readonly group: ReactNative_Style_t; 
      readonly inactiveButton: ReactNative_Style_t; 
      readonly inactiveText: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly calendar: {
      readonly blurredDayText: ReactNative_Style_t; 
      readonly currentDayText: ReactNative_Style_t; 
      readonly day: ReactNative_Style_t; 
      readonly dayName: ReactNative_Style_t; 
      readonly dayNameSunday: ReactNative_Style_t; 
      readonly dayText: ReactNative_Style_t; 
      readonly header: ReactNative_Style_t; 
      readonly headerButton: ReactNative_Style_t; 
      readonly headerTitle: ReactNative_Style_t; 
      readonly hiddenDay: ReactNative_Style_t; 
      readonly mark: ReactNative_Style_t; 
      readonly markedDay: ReactNative_Style_t; 
      readonly monthView: ReactNative_Style_t; 
      readonly selectedDay: ReactNative_Style_t; 
      readonly selectedDayText: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly card: {
      readonly card: ReactNative_Style_t
    }; 
    readonly container: {
      readonly container: ReactNative_Style_t; 
      readonly fluid: ReactNative_Style_t
    }; 
    readonly dateTimePicker: {
      readonly action: ReactNative_Style_t; 
      readonly actionText: ReactNative_Style_t; 
      readonly actions: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly errorScreen: {
      readonly actionsWrapper: ReactNative_Style_t; 
      readonly closeButton: ReactNative_Style_t; 
      readonly container: ReactNative_Style_t; 
      readonly image: ReactNative_Style_t; 
      readonly subtitleWrapper: ReactNative_Style_t; 
      readonly titleWrapper: ReactNative_Style_t
    }; 
    readonly icon: {
      readonly icon: ReactNative_Style_t
    }; 
    readonly listItem: {
      readonly contentWrapper: ReactNative_Style_t; 
      readonly subtitle: ReactNative_Style_t; 
      readonly textWrapper: ReactNative_Style_t; 
      readonly title: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly mentionTextInput: {
      readonly disabledText: ReactNative_Style_t; 
      readonly highlightText: ReactNative_Style_t; 
      readonly suggestionWrapper: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly message: {
      readonly content: ReactNative_Style_t; 
      readonly errorContent: ReactNative_Style_t; 
      readonly errorWrapper: ReactNative_Style_t; 
      readonly infoContent: ReactNative_Style_t; 
      readonly infoWrapper: ReactNative_Style_t; 
      readonly successContent: ReactNative_Style_t; 
      readonly successWrapper: ReactNative_Style_t; 
      readonly warningContent: ReactNative_Style_t; 
      readonly warningWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly radio: {
      readonly activeIcon: ReactNative_Style_t; 
      readonly inactiveIcon: ReactNative_Style_t; 
      readonly label: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly richTextEditor: {
      readonly editor: ReactNative_Style_t; 
      readonly errorMessage: ReactNative_Style_t; 
      readonly errorWebview: ReactNative_Style_t; 
      readonly separator: ReactNative_Style_t; 
      readonly suggestionList: ReactNative_Style_t; 
      readonly toolbar: ReactNative_Style_t; 
      readonly toolbarButton: ReactNative_Style_t; 
      readonly webview: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly select: {
      readonly action: ReactNative_Style_t; 
      readonly actionText: ReactNative_Style_t; 
      readonly actions: ReactNative_Style_t; 
      readonly dialog: ReactNative_Style_t; 
      readonly optionText: ReactNative_Style_t; 
      readonly optionWrapper: ReactNative_Style_t; 
      readonly overlay: ReactNative_Style_t; 
      readonly selectedOptionText: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly tabBar: {
      readonly content: ReactNative_Style_t; 
      readonly navigator: ReactNative_Style_t; 
      readonly selectedTab: ReactNative_Style_t; 
      readonly tab: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly text: {
      readonly h1: ReactNative_Style_t; 
      readonly h2: ReactNative_Style_t; 
      readonly h3: ReactNative_Style_t; 
      readonly h4: ReactNative_Style_t; 
      readonly h5: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t
    }; 
    readonly textInput: {
      readonly activeIcon: ReactNative_Style_t; 
      readonly activeLabel: ReactNative_Style_t; 
      readonly activeTextInput: ReactNative_Style_t; 
      readonly baseTextInput: ReactNative_Style_t; 
      readonly disabledBaseTextInput: ReactNative_Style_t; 
      readonly errorIcon: ReactNative_Style_t; 
      readonly errorLabel: ReactNative_Style_t; 
      readonly errorMessage: ReactNative_Style_t; 
      readonly errorTextInput: ReactNative_Style_t; 
      readonly icon: ReactNative_Style_t; 
      readonly label: ReactNative_Style_t; 
      readonly placeholder: ReactNative_Style_t; 
      readonly textInput: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly variables: {
      readonly BACKGROUND_BLUE_1: string; 
      readonly BACKGROUND_BLUE_2: string; 
      readonly BACKGROUND_BLUE_3: string; 
      readonly BACKGROUND_COLOR: string; 
      readonly BASE_SIZE: number; 
      readonly BLACK: string; 
      readonly BLUE: string; 
      readonly BORDER_COLOR: string; 
      readonly DANGER_COLOR: string; 
      readonly DARK_GREEN: string; 
      readonly DARK_ORANGE: string; 
      readonly DARK_PINK: string; 
      readonly DARK_PRIMARY_COLOR: string; 
      readonly DARK_RED: string; 
      readonly DARK_YELLOW: string; 
      readonly DISABLED_BACKGROUND_COLOR: string; 
      readonly DISABLED_TEXT_COLOR: string; 
      readonly ERROR_COLOR: string; 
      readonly FOCUS_BLUE_1: string; 
      readonly FOCUS_BLUE_2: string; 
      readonly FOCUS_BLUE_3: string; 
      readonly FONT_FAMILY?: string; 
      readonly FONT_SIZE: number; 
      readonly GREEN: string; 
      readonly GREY_1: string; 
      readonly GREY_2: string; 
      readonly GREY_3: string; 
      readonly GREY_4: string; 
      readonly GREY_5: string; 
      readonly HEADER_1: number; 
      readonly HEADER_2: number; 
      readonly HEADER_3: number; 
      readonly HEADER_4: number; 
      readonly HEADER_5: number; 
      readonly INFO_COLOR: string; 
      readonly INVERTED_TEXT_COLOR: string; 
      readonly LARGE_SIZE: number; 
      readonly LIGHT_PRIMARY_COLOR: string; 
      readonly LINK_TEXT_COLOR: string; 
      readonly MAGENTA: string; 
      readonly MEDIUM_SIZE: number; 
      readonly MUTED_TEXT_COLOR: string; 
      readonly ORANGE: string; 
      readonly PINK: string; 
      readonly PRIMARY_COLOR: string; 
      readonly RED: string; 
      readonly SMALL_SIZE: number; 
      readonly SOFT_GREEN: string; 
      readonly SOFT_ORANGE: string; 
      readonly SOFT_PINK: string; 
      readonly SOFT_RED: string; 
      readonly SOFT_YELLOW: string; 
      readonly SUCCESS_COLOR: string; 
      readonly TEXT_COLOR: string; 
      readonly WARNING_COLOR: string; 
      readonly WHITE: string; 
      readonly YELLOW: string
    }
  }; 
  readonly value: message
}> = function MentionTextInput(Arg1: any) {
  const $props = {autoFocus:Arg1.autoFocus, disabled:Arg1.disabled, error:Arg1.error, highlightTextStyle:Arg1.highlightTextStyle, onBlur:Arg1.onBlur, onChange:Arg1.onChange, onFocus:Arg1.onFocus, placeholder:Arg1.placeholder, renderSuggestionList:function (Arg11: any, Arg2: any) {
      const result1 = Arg1.renderSuggestionList(Arg11, function (Arg12: any, Arg21: any) {
          const result2 = Curry._2(Arg2, Arg12, Arg21);
          return result2
        });
      return result1
    }, rightIcon:Arg1.rightIcon, testID:Arg1.testID, theme:Arg1.theme, value:Arg1.value};
  const result = React.createElement(MentionTextInputBS.make, $props);
  return result
};

// tslint:disable-next-line:interface-over-type-literal
export type $$default_Props = {
  readonly autoFocus: boolean; 
  readonly disabled: boolean; 
  readonly error?: string; 
  readonly highlightTextStyle?: ReactNative_Style_t; 
  readonly onBlur: () => void; 
  readonly onChange: (_1:message) => void; 
  readonly onFocus: () => void; 
  readonly placeholder: string; 
  readonly renderSuggestionList: (_1:string, _2:((_1:string, _2:string) => void)) => JSX.Element; 
  readonly rightIcon: string; 
  readonly testID: string; 
  readonly theme?: {
    readonly _switch: {
      readonly thumb: ReactNative_Style_t; 
      readonly thumbOff: ReactNative_Style_t; 
      readonly thumbOn: ReactNative_Style_t; 
      readonly thumbWrapper: ReactNative_Style_t; 
      readonly track: ReactNative_Style_t; 
      readonly trackOff: ReactNative_Style_t; 
      readonly trackOn: ReactNative_Style_t
    }; 
    readonly avatar: {
      readonly image: ReactNative_Style_t; 
      readonly largeImage: ReactNative_Style_t; 
      readonly largeTitle: ReactNative_Style_t; 
      readonly largeTitleWrapper: ReactNative_Style_t; 
      readonly largeWrapper: ReactNative_Style_t; 
      readonly mediumImage: ReactNative_Style_t; 
      readonly mediumTitle: ReactNative_Style_t; 
      readonly mediumTitleWrapper: ReactNative_Style_t; 
      readonly mediumWrapper: ReactNative_Style_t; 
      readonly smallImage: ReactNative_Style_t; 
      readonly smallTitle: ReactNative_Style_t; 
      readonly smallTitleWrapper: ReactNative_Style_t; 
      readonly smallWrapper: ReactNative_Style_t; 
      readonly title: ReactNative_Style_t; 
      readonly titleWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly badge: {
      readonly content: ReactNative_Style_t; 
      readonly errorContent: ReactNative_Style_t; 
      readonly errorWrapper: ReactNative_Style_t; 
      readonly infoContent: ReactNative_Style_t; 
      readonly infoWrapper: ReactNative_Style_t; 
      readonly successContent: ReactNative_Style_t; 
      readonly successWrapper: ReactNative_Style_t; 
      readonly warningContent: ReactNative_Style_t; 
      readonly warningWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly bottomButton: {
      readonly button: ReactNative_Style_t; 
      readonly disabledText: ReactNative_Style_t; 
      readonly disabledWrapper: ReactNative_Style_t; 
      readonly loadingIndicator: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t; 
      readonly wrapperWithHomeBar: ReactNative_Style_t; 
      readonly wrapperWithoutHomeBar: ReactNative_Style_t
    }; 
    readonly button: {
      readonly disabledText: ReactNative_Style_t; 
      readonly disabledWrapper: ReactNative_Style_t; 
      readonly filledLoadingIndicator: ReactNative_Style_t; 
      readonly filledText: ReactNative_Style_t; 
      readonly filledWrapper: ReactNative_Style_t; 
      readonly outlinedLoadingIndicator: ReactNative_Style_t; 
      readonly outlinedText: ReactNative_Style_t; 
      readonly outlinedWrapper: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly buttonGroup: {
      readonly activeButton: ReactNative_Style_t; 
      readonly activeText: ReactNative_Style_t; 
      readonly button: ReactNative_Style_t; 
      readonly group: ReactNative_Style_t; 
      readonly inactiveButton: ReactNative_Style_t; 
      readonly inactiveText: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly calendar: {
      readonly blurredDayText: ReactNative_Style_t; 
      readonly currentDayText: ReactNative_Style_t; 
      readonly day: ReactNative_Style_t; 
      readonly dayName: ReactNative_Style_t; 
      readonly dayNameSunday: ReactNative_Style_t; 
      readonly dayText: ReactNative_Style_t; 
      readonly header: ReactNative_Style_t; 
      readonly headerButton: ReactNative_Style_t; 
      readonly headerTitle: ReactNative_Style_t; 
      readonly hiddenDay: ReactNative_Style_t; 
      readonly mark: ReactNative_Style_t; 
      readonly markedDay: ReactNative_Style_t; 
      readonly monthView: ReactNative_Style_t; 
      readonly selectedDay: ReactNative_Style_t; 
      readonly selectedDayText: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly card: {
      readonly card: ReactNative_Style_t
    }; 
    readonly container: {
      readonly container: ReactNative_Style_t; 
      readonly fluid: ReactNative_Style_t
    }; 
    readonly dateTimePicker: {
      readonly action: ReactNative_Style_t; 
      readonly actionText: ReactNative_Style_t; 
      readonly actions: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly errorScreen: {
      readonly actionsWrapper: ReactNative_Style_t; 
      readonly closeButton: ReactNative_Style_t; 
      readonly container: ReactNative_Style_t; 
      readonly image: ReactNative_Style_t; 
      readonly subtitleWrapper: ReactNative_Style_t; 
      readonly titleWrapper: ReactNative_Style_t
    }; 
    readonly icon: {
      readonly icon: ReactNative_Style_t
    }; 
    readonly listItem: {
      readonly contentWrapper: ReactNative_Style_t; 
      readonly subtitle: ReactNative_Style_t; 
      readonly textWrapper: ReactNative_Style_t; 
      readonly title: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly mentionTextInput: {
      readonly disabledText: ReactNative_Style_t; 
      readonly highlightText: ReactNative_Style_t; 
      readonly suggestionWrapper: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly message: {
      readonly content: ReactNative_Style_t; 
      readonly errorContent: ReactNative_Style_t; 
      readonly errorWrapper: ReactNative_Style_t; 
      readonly infoContent: ReactNative_Style_t; 
      readonly infoWrapper: ReactNative_Style_t; 
      readonly successContent: ReactNative_Style_t; 
      readonly successWrapper: ReactNative_Style_t; 
      readonly warningContent: ReactNative_Style_t; 
      readonly warningWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly radio: {
      readonly activeIcon: ReactNative_Style_t; 
      readonly inactiveIcon: ReactNative_Style_t; 
      readonly label: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly richTextEditor: {
      readonly editor: ReactNative_Style_t; 
      readonly errorMessage: ReactNative_Style_t; 
      readonly errorWebview: ReactNative_Style_t; 
      readonly separator: ReactNative_Style_t; 
      readonly suggestionList: ReactNative_Style_t; 
      readonly toolbar: ReactNative_Style_t; 
      readonly toolbarButton: ReactNative_Style_t; 
      readonly webview: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly select: {
      readonly action: ReactNative_Style_t; 
      readonly actionText: ReactNative_Style_t; 
      readonly actions: ReactNative_Style_t; 
      readonly dialog: ReactNative_Style_t; 
      readonly optionText: ReactNative_Style_t; 
      readonly optionWrapper: ReactNative_Style_t; 
      readonly overlay: ReactNative_Style_t; 
      readonly selectedOptionText: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly tabBar: {
      readonly content: ReactNative_Style_t; 
      readonly navigator: ReactNative_Style_t; 
      readonly selectedTab: ReactNative_Style_t; 
      readonly tab: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly text: {
      readonly h1: ReactNative_Style_t; 
      readonly h2: ReactNative_Style_t; 
      readonly h3: ReactNative_Style_t; 
      readonly h4: ReactNative_Style_t; 
      readonly h5: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t
    }; 
    readonly textInput: {
      readonly activeIcon: ReactNative_Style_t; 
      readonly activeLabel: ReactNative_Style_t; 
      readonly activeTextInput: ReactNative_Style_t; 
      readonly baseTextInput: ReactNative_Style_t; 
      readonly disabledBaseTextInput: ReactNative_Style_t; 
      readonly errorIcon: ReactNative_Style_t; 
      readonly errorLabel: ReactNative_Style_t; 
      readonly errorMessage: ReactNative_Style_t; 
      readonly errorTextInput: ReactNative_Style_t; 
      readonly icon: ReactNative_Style_t; 
      readonly label: ReactNative_Style_t; 
      readonly placeholder: ReactNative_Style_t; 
      readonly textInput: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly variables: {
      readonly BACKGROUND_BLUE_1: string; 
      readonly BACKGROUND_BLUE_2: string; 
      readonly BACKGROUND_BLUE_3: string; 
      readonly BACKGROUND_COLOR: string; 
      readonly BASE_SIZE: number; 
      readonly BLACK: string; 
      readonly BLUE: string; 
      readonly BORDER_COLOR: string; 
      readonly DANGER_COLOR: string; 
      readonly DARK_GREEN: string; 
      readonly DARK_ORANGE: string; 
      readonly DARK_PINK: string; 
      readonly DARK_PRIMARY_COLOR: string; 
      readonly DARK_RED: string; 
      readonly DARK_YELLOW: string; 
      readonly DISABLED_BACKGROUND_COLOR: string; 
      readonly DISABLED_TEXT_COLOR: string; 
      readonly ERROR_COLOR: string; 
      readonly FOCUS_BLUE_1: string; 
      readonly FOCUS_BLUE_2: string; 
      readonly FOCUS_BLUE_3: string; 
      readonly FONT_FAMILY?: string; 
      readonly FONT_SIZE: number; 
      readonly GREEN: string; 
      readonly GREY_1: string; 
      readonly GREY_2: string; 
      readonly GREY_3: string; 
      readonly GREY_4: string; 
      readonly GREY_5: string; 
      readonly HEADER_1: number; 
      readonly HEADER_2: number; 
      readonly HEADER_3: number; 
      readonly HEADER_4: number; 
      readonly HEADER_5: number; 
      readonly INFO_COLOR: string; 
      readonly INVERTED_TEXT_COLOR: string; 
      readonly LARGE_SIZE: number; 
      readonly LIGHT_PRIMARY_COLOR: string; 
      readonly LINK_TEXT_COLOR: string; 
      readonly MAGENTA: string; 
      readonly MEDIUM_SIZE: number; 
      readonly MUTED_TEXT_COLOR: string; 
      readonly ORANGE: string; 
      readonly PINK: string; 
      readonly PRIMARY_COLOR: string; 
      readonly RED: string; 
      readonly SMALL_SIZE: number; 
      readonly SOFT_GREEN: string; 
      readonly SOFT_ORANGE: string; 
      readonly SOFT_PINK: string; 
      readonly SOFT_RED: string; 
      readonly SOFT_YELLOW: string; 
      readonly SUCCESS_COLOR: string; 
      readonly TEXT_COLOR: string; 
      readonly WARNING_COLOR: string; 
      readonly WHITE: string; 
      readonly YELLOW: string
    }
  }; 
  readonly value: message
};

export const $$default: React.ComponentType<{
  readonly autoFocus: boolean; 
  readonly disabled: boolean; 
  readonly error?: string; 
  readonly highlightTextStyle?: ReactNative_Style_t; 
  readonly onBlur: () => void; 
  readonly onChange: (_1:message) => void; 
  readonly onFocus: () => void; 
  readonly placeholder: string; 
  readonly renderSuggestionList: (_1:string, _2:((_1:string, _2:string) => void)) => JSX.Element; 
  readonly rightIcon: string; 
  readonly testID: string; 
  readonly theme?: {
    readonly _switch: {
      readonly thumb: ReactNative_Style_t; 
      readonly thumbOff: ReactNative_Style_t; 
      readonly thumbOn: ReactNative_Style_t; 
      readonly thumbWrapper: ReactNative_Style_t; 
      readonly track: ReactNative_Style_t; 
      readonly trackOff: ReactNative_Style_t; 
      readonly trackOn: ReactNative_Style_t
    }; 
    readonly avatar: {
      readonly image: ReactNative_Style_t; 
      readonly largeImage: ReactNative_Style_t; 
      readonly largeTitle: ReactNative_Style_t; 
      readonly largeTitleWrapper: ReactNative_Style_t; 
      readonly largeWrapper: ReactNative_Style_t; 
      readonly mediumImage: ReactNative_Style_t; 
      readonly mediumTitle: ReactNative_Style_t; 
      readonly mediumTitleWrapper: ReactNative_Style_t; 
      readonly mediumWrapper: ReactNative_Style_t; 
      readonly smallImage: ReactNative_Style_t; 
      readonly smallTitle: ReactNative_Style_t; 
      readonly smallTitleWrapper: ReactNative_Style_t; 
      readonly smallWrapper: ReactNative_Style_t; 
      readonly title: ReactNative_Style_t; 
      readonly titleWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly badge: {
      readonly content: ReactNative_Style_t; 
      readonly errorContent: ReactNative_Style_t; 
      readonly errorWrapper: ReactNative_Style_t; 
      readonly infoContent: ReactNative_Style_t; 
      readonly infoWrapper: ReactNative_Style_t; 
      readonly successContent: ReactNative_Style_t; 
      readonly successWrapper: ReactNative_Style_t; 
      readonly warningContent: ReactNative_Style_t; 
      readonly warningWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly bottomButton: {
      readonly button: ReactNative_Style_t; 
      readonly disabledText: ReactNative_Style_t; 
      readonly disabledWrapper: ReactNative_Style_t; 
      readonly loadingIndicator: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t; 
      readonly wrapperWithHomeBar: ReactNative_Style_t; 
      readonly wrapperWithoutHomeBar: ReactNative_Style_t
    }; 
    readonly button: {
      readonly disabledText: ReactNative_Style_t; 
      readonly disabledWrapper: ReactNative_Style_t; 
      readonly filledLoadingIndicator: ReactNative_Style_t; 
      readonly filledText: ReactNative_Style_t; 
      readonly filledWrapper: ReactNative_Style_t; 
      readonly outlinedLoadingIndicator: ReactNative_Style_t; 
      readonly outlinedText: ReactNative_Style_t; 
      readonly outlinedWrapper: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly buttonGroup: {
      readonly activeButton: ReactNative_Style_t; 
      readonly activeText: ReactNative_Style_t; 
      readonly button: ReactNative_Style_t; 
      readonly group: ReactNative_Style_t; 
      readonly inactiveButton: ReactNative_Style_t; 
      readonly inactiveText: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly calendar: {
      readonly blurredDayText: ReactNative_Style_t; 
      readonly currentDayText: ReactNative_Style_t; 
      readonly day: ReactNative_Style_t; 
      readonly dayName: ReactNative_Style_t; 
      readonly dayNameSunday: ReactNative_Style_t; 
      readonly dayText: ReactNative_Style_t; 
      readonly header: ReactNative_Style_t; 
      readonly headerButton: ReactNative_Style_t; 
      readonly headerTitle: ReactNative_Style_t; 
      readonly hiddenDay: ReactNative_Style_t; 
      readonly mark: ReactNative_Style_t; 
      readonly markedDay: ReactNative_Style_t; 
      readonly monthView: ReactNative_Style_t; 
      readonly selectedDay: ReactNative_Style_t; 
      readonly selectedDayText: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly card: {
      readonly card: ReactNative_Style_t
    }; 
    readonly container: {
      readonly container: ReactNative_Style_t; 
      readonly fluid: ReactNative_Style_t
    }; 
    readonly dateTimePicker: {
      readonly action: ReactNative_Style_t; 
      readonly actionText: ReactNative_Style_t; 
      readonly actions: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly errorScreen: {
      readonly actionsWrapper: ReactNative_Style_t; 
      readonly closeButton: ReactNative_Style_t; 
      readonly container: ReactNative_Style_t; 
      readonly image: ReactNative_Style_t; 
      readonly subtitleWrapper: ReactNative_Style_t; 
      readonly titleWrapper: ReactNative_Style_t
    }; 
    readonly icon: {
      readonly icon: ReactNative_Style_t
    }; 
    readonly listItem: {
      readonly contentWrapper: ReactNative_Style_t; 
      readonly subtitle: ReactNative_Style_t; 
      readonly textWrapper: ReactNative_Style_t; 
      readonly title: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly mentionTextInput: {
      readonly disabledText: ReactNative_Style_t; 
      readonly highlightText: ReactNative_Style_t; 
      readonly suggestionWrapper: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly message: {
      readonly content: ReactNative_Style_t; 
      readonly errorContent: ReactNative_Style_t; 
      readonly errorWrapper: ReactNative_Style_t; 
      readonly infoContent: ReactNative_Style_t; 
      readonly infoWrapper: ReactNative_Style_t; 
      readonly successContent: ReactNative_Style_t; 
      readonly successWrapper: ReactNative_Style_t; 
      readonly warningContent: ReactNative_Style_t; 
      readonly warningWrapper: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly radio: {
      readonly activeIcon: ReactNative_Style_t; 
      readonly inactiveIcon: ReactNative_Style_t; 
      readonly label: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly richTextEditor: {
      readonly editor: ReactNative_Style_t; 
      readonly errorMessage: ReactNative_Style_t; 
      readonly errorWebview: ReactNative_Style_t; 
      readonly separator: ReactNative_Style_t; 
      readonly suggestionList: ReactNative_Style_t; 
      readonly toolbar: ReactNative_Style_t; 
      readonly toolbarButton: ReactNative_Style_t; 
      readonly webview: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly select: {
      readonly action: ReactNative_Style_t; 
      readonly actionText: ReactNative_Style_t; 
      readonly actions: ReactNative_Style_t; 
      readonly dialog: ReactNative_Style_t; 
      readonly optionText: ReactNative_Style_t; 
      readonly optionWrapper: ReactNative_Style_t; 
      readonly overlay: ReactNative_Style_t; 
      readonly selectedOptionText: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly tabBar: {
      readonly content: ReactNative_Style_t; 
      readonly navigator: ReactNative_Style_t; 
      readonly selectedTab: ReactNative_Style_t; 
      readonly tab: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly text: {
      readonly h1: ReactNative_Style_t; 
      readonly h2: ReactNative_Style_t; 
      readonly h3: ReactNative_Style_t; 
      readonly h4: ReactNative_Style_t; 
      readonly h5: ReactNative_Style_t; 
      readonly text: ReactNative_Style_t
    }; 
    readonly textInput: {
      readonly activeIcon: ReactNative_Style_t; 
      readonly activeLabel: ReactNative_Style_t; 
      readonly activeTextInput: ReactNative_Style_t; 
      readonly baseTextInput: ReactNative_Style_t; 
      readonly disabledBaseTextInput: ReactNative_Style_t; 
      readonly errorIcon: ReactNative_Style_t; 
      readonly errorLabel: ReactNative_Style_t; 
      readonly errorMessage: ReactNative_Style_t; 
      readonly errorTextInput: ReactNative_Style_t; 
      readonly icon: ReactNative_Style_t; 
      readonly label: ReactNative_Style_t; 
      readonly placeholder: ReactNative_Style_t; 
      readonly textInput: ReactNative_Style_t; 
      readonly wrapper: ReactNative_Style_t
    }; 
    readonly variables: {
      readonly BACKGROUND_BLUE_1: string; 
      readonly BACKGROUND_BLUE_2: string; 
      readonly BACKGROUND_BLUE_3: string; 
      readonly BACKGROUND_COLOR: string; 
      readonly BASE_SIZE: number; 
      readonly BLACK: string; 
      readonly BLUE: string; 
      readonly BORDER_COLOR: string; 
      readonly DANGER_COLOR: string; 
      readonly DARK_GREEN: string; 
      readonly DARK_ORANGE: string; 
      readonly DARK_PINK: string; 
      readonly DARK_PRIMARY_COLOR: string; 
      readonly DARK_RED: string; 
      readonly DARK_YELLOW: string; 
      readonly DISABLED_BACKGROUND_COLOR: string; 
      readonly DISABLED_TEXT_COLOR: string; 
      readonly ERROR_COLOR: string; 
      readonly FOCUS_BLUE_1: string; 
      readonly FOCUS_BLUE_2: string; 
      readonly FOCUS_BLUE_3: string; 
      readonly FONT_FAMILY?: string; 
      readonly FONT_SIZE: number; 
      readonly GREEN: string; 
      readonly GREY_1: string; 
      readonly GREY_2: string; 
      readonly GREY_3: string; 
      readonly GREY_4: string; 
      readonly GREY_5: string; 
      readonly HEADER_1: number; 
      readonly HEADER_2: number; 
      readonly HEADER_3: number; 
      readonly HEADER_4: number; 
      readonly HEADER_5: number; 
      readonly INFO_COLOR: string; 
      readonly INVERTED_TEXT_COLOR: string; 
      readonly LARGE_SIZE: number; 
      readonly LIGHT_PRIMARY_COLOR: string; 
      readonly LINK_TEXT_COLOR: string; 
      readonly MAGENTA: string; 
      readonly MEDIUM_SIZE: number; 
      readonly MUTED_TEXT_COLOR: string; 
      readonly ORANGE: string; 
      readonly PINK: string; 
      readonly PRIMARY_COLOR: string; 
      readonly RED: string; 
      readonly SMALL_SIZE: number; 
      readonly SOFT_GREEN: string; 
      readonly SOFT_ORANGE: string; 
      readonly SOFT_PINK: string; 
      readonly SOFT_RED: string; 
      readonly SOFT_YELLOW: string; 
      readonly SUCCESS_COLOR: string; 
      readonly TEXT_COLOR: string; 
      readonly WARNING_COLOR: string; 
      readonly WHITE: string; 
      readonly YELLOW: string
    }
  }; 
  readonly value: message
}> = function MentionTextInput(Arg1: any) {
  const $props = {autoFocus:Arg1.autoFocus, disabled:Arg1.disabled, error:Arg1.error, highlightTextStyle:Arg1.highlightTextStyle, onBlur:Arg1.onBlur, onChange:Arg1.onChange, onFocus:Arg1.onFocus, placeholder:Arg1.placeholder, renderSuggestionList:function (Arg11: any, Arg2: any) {
      const result1 = Arg1.renderSuggestionList(Arg11, function (Arg12: any, Arg21: any) {
          const result2 = Curry._2(Arg2, Arg12, Arg21);
          return result2
        });
      return result1
    }, rightIcon:Arg1.rightIcon, testID:Arg1.testID, theme:Arg1.theme, value:Arg1.value};
  const result = React.createElement(MentionTextInputBS.default, $props);
  return result
};

export default $$default;
