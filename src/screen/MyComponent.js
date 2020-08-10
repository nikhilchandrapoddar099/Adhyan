import * as React from 'react';
import { Text } from 'react-native';
import { Portal } from 'react-native-paper';

const MyComponent = () => (
  <Portal.Host>
    <Text>Content of the app</Text>
  </Portal.Host>
);

export default MyComponent;