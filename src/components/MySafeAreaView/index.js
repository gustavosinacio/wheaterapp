import React from 'react';

import { Container } from './styles';

function SafeAreaView({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

export default SafeAreaView;
