import React from 'react';
import ehLogo from '../../images/eh_logo.png';

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={ehLogo} width="40" height="40" />
    <h2 style={{ margin: '0 0 0 16px' }}>React Native Hero Design</h2>
  </div>
);

export { Logo };
