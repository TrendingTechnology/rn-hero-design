import React, { useMemo } from 'react';
import { Icon, Container, injectTheme } from 'rn-hero-design';

const filledIcons = [
  'email',
  'eye',
  'eye-invisible',
  'ok-circle',
  'calendar',
  'more-vertical',
  'warning-circle',
  'radio-active',
  'radio-inactive',
];

const outlinedIcons = [
  'email-outline',
  'eye-outline',
  'eye-invisible-outline',
  'cancel-outline',
  'clock-circle-outline',
  'comment-outline',
  'plus-circle-outline',
  'plus-outline',
  'piggy-bank-outline',
  'target-outline',
  'single-right-outline',
  'single-left-outline',
  'calendar-outline',
  'phone-outline',
  'face-id',
  'arrow-down',
  'camera-outline',
  'paperclip',
  'image-outline',
  'file-outline',
  'warning-circle-outline',
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
          <Icon key={icon} icon={icon} size={24} wrapperStyle={iconStyle} />
        ))}
      </Container>

      <Container direction="row" style={{ flexWrap: 'wrap' }}>
        {outlinedIcons.map((icon) => (
          <Icon key={icon} icon={icon} size={24} wrapperStyle={iconStyle} />
        ))}
      </Container>
    </>
  );
};

export default injectTheme(IconScreen);
