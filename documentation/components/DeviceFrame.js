import React from 'react';
import './devices.min.css';

const IPhoneX = ({ children }) => (
  <div className="marvel-device iphone-x">
    <div className="notch">
      <div className="camera"></div>
      <div className="speaker"></div>
    </div>
    <div className="top-bar"></div>
    <div className="sleep"></div>
    <div className="bottom-bar"></div>
    <div className="volume"></div>
    <div
      className="screen"
      style={{ boxSizing: 'border-box', padding: 16, paddingTop: 48 }}
    >
      {children}
    </div>
  </div>
);

export { IPhoneX };
