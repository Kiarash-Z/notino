import { Navigation } from 'react-native-navigation';
import Category from './components/pages/Category';

export default () => {
  Navigation.registerComponent('Category', () => Category);
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'Category',
      navigatorStyle: {},
      navigatorButtons: {}
    },
    passProps: {},
    animationType: 'slide-down'
  });
};
