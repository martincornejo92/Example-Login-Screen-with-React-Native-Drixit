import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const appNavigator = createSwitchNavigator(
  {
    LoginScreen,
    HomeScreen,
  },
  {
    initialRouteName: 'LoginScreen',
  },
);
const appContainer = createAppContainer(appNavigator);
export default appContainer;
