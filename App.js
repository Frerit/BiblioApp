/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppNavigator from "./src/navigation";


const App = () => {
    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    return (
      <AppNavigator/>
    );
}

export default App;