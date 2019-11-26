import React from 'react';

const connect = mapStateToProps => WrappedComponent => props => (
  <WrappedComponent
    {...props}
    {...mapStateToProps({ __theme: 'default' }, props)}
  />
);

export { connect };
