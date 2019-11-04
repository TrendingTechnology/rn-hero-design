import React from 'react';

const SvgXml = ({ xml, override }) => (
  <img src={xml} width={override.width} height={override.height} />
);

export { SvgXml };
