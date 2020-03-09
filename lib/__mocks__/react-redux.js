import React from 'react';

const connect = mapStateToProps => WrappedComponent => {
  const Component = props => (
    <WrappedComponent
      {...props}
      {...mapStateToProps({ __theme: 'default' }, props)}
    />
  );

  Object.keys(WrappedComponent).forEach(key => {
    Component[key] = WrappedComponent[key];
  });

  return Component;
};

export { connect };
