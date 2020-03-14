import React from 'react';
import { Text } from 'rn-hero-design';

const IconList = ({ colors = [] }) => (
  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    {colors.map(([name, code]) => (
      <div
        key={name}
        title={name}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: 120,
          height: 80,
          margin: 12,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 4,
            background: code,
          }}
        />
        <Text
          size="h5"
          style={{
            width: 120,
            marginTop: 16,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {name}
        </Text>
      </div>
    ))}
  </div>
);

export default IconList;
