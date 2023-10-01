import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator';

const App = () => {
  return (
    <NavigationContainer>
      <Navigator /> {/* Displays the navigator of the screens */}
    </NavigationContainer>
  );
};

export default App;