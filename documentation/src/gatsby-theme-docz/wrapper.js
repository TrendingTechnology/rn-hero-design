import * as React from 'react';
import { Helmet } from 'react-helmet';
import ico from './images/eh_icon.ico';

const Wrapper = ({ children }) => (
  <React.Fragment>
    <Helmet>
      <meta charSet="utf-8" />
      <title>EH Hero Design</title>
      <link rel="icon" href={ico} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700&display=swap"
      />
    </Helmet>
    {children}
  </React.Fragment>
);
export default Wrapper;
