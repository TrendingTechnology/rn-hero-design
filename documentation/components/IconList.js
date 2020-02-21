import React from 'react';
import { Icon, Text } from 'rn-hero-design';

const IconList = ({ icons = [] }) => (
  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    {icons.map(iconName => (
      <div
        key={iconName}
        title={iconName}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: 80,
          height: 80,
          margin: 12,
        }}
      >
        <Icon icon={iconName} />
        <Text
          size="h5"
          style={{
            width: 80,
            marginTop: 16,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {iconName}
        </Text>
      </div>
    ))}
  </div>
);

export default IconList;
