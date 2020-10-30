import React, { useMemo } from 'react';
import { Icon, Container, injectTheme } from 'rn-hero-design';

const filledIcons = [
  'ok-circle',
  'cancel-circle',
  'plus-circle',
  'warning-circle',
  'email',
  'eye',
  'eye-invisible',
  'folder',
  'stopwatch',
  'calendar',
  'globe',
  'suitcase',
  'level',

  'more-vertical',
  'radio-active',
  'radio-inactive',
];

const outlinedIcons = [
  'ok-circle-outline',
  'cancel-circle-outline',
  'plus-circle-outline',
  'warning-circle-outline',
  'email-outline',
  'eye-outline',
  'eye-invisible-outline',
  'folder-outline',
  'stopwatch-outline',
  'calendar-outline',
  'globe-outline',
  'suitcase-outline',
  'level-outline',

  'plus-outline',
  'cancel-outline',
  'single-right-outline',
  'single-left-outline',
  'arrow-down',
  'clock-circle-outline',
  'comment-outline',
  'piggy-bank-outline',
  'target-outline',
  'phone-outline',
  'face-id',
  'camera-outline',
  'paperclip',
  'image-outline',
  'file-outline',
];

const IconScreen = ({ theme }) => {
  const iconStyle = useMemo(
    () => ({
      width: theme.variables.LARGE_SIZE * 2,
      height: theme.variables.LARGE_SIZE * 2,
    }),
    [theme],
  );

  return (
    <>
      <Container direction="row" style={{ flexWrap: 'wrap' }}>
        {filledIcons.map((icon) => (
          <Icon
            key={icon}
            icon={icon}
            size={24}
            color={theme.variables.FOCUS_BLUE_1}
            wrapperStyle={iconStyle}
          />
        ))}
      </Container>

      <Container direction="row" style={{ flexWrap: 'wrap' }}>
        {outlinedIcons.map((icon) => (
          <Icon
            key={icon}
            icon={icon}
            size={24}
            color={theme.variables.FOCUS_BLUE_1}
            wrapperStyle={iconStyle}
          />
        ))}
      </Container>
    </>
  );
};

export default injectTheme(IconScreen);
