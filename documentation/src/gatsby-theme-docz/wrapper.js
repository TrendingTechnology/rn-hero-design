import * as React from 'react';
import { Helmet } from 'react-helmet';
import ico from './images/eh_icon.ico';

const Wrapper = ({ children }) => (
  <React.Fragment>
    <Helmet>
      <meta charSet="utf-8" />
      <title>RN Hero Design</title>
      <link rel="icon" href={ico} />
    </Helmet>
    {children}
  </React.Fragment>
);

export default Wrapper;
