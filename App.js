import React from 'react';

import { Provider } from 'react-redux';
import stores from './src/stores';
import AppNavigator from './src/navigators';


// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
  render() {
    return (
      <Provider store={stores}>
        <AppNavigator />
      </Provider>
    );
  }
}
