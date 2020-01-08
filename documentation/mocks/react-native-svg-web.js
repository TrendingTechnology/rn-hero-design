import React from 'react';

const SvgXml = ({ xml, override }) => (
  <img
    src={`data:image/svg+xml;utf8,${xml.replace('\n', '')}`}
    width={override.width}
    height={override.height}
  />
);

export { SvgXml };
