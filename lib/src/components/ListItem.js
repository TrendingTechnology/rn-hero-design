import React from 'react';
import t from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import injectTheme from '../helpers/injectTheme';

const ListItem = ({
  title,
  subtitle,
  onPress,
  leftElement,
  rightElement,
  wrapperStyle,
  titleStyle,
  subtitleStyle,
  theme,
}) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      style={StyleSheet.flatten([theme.listItem.wrapper, wrapperStyle])}
    >
      <View style={theme.listItem.contentWrapper}>
        {leftElement}
        <View>
          <Text style={StyleSheet.flatten([theme.listItem.title, titleStyle])}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={StyleSheet.flatten([
                theme.listItem.subtitle,
                subtitleStyle,
              ])}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      {rightElement}
    </Wrapper>
  );
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
  theme: t.object,
};

export default injectTheme(ListItem);
