import { Navigation } from 'react-native-navigation';
import Category from './components/pages/Category';
import Categories from './components/pages/Categories';

export default () => {
  Navigation.registerComponent('Category', () => Category);
  Navigation.registerComponent('Categories', () => Categories);
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'Category',
      navigatorStyle: {
        screenBackgroundColor: 'white'
      },
      navigatorButtons: {}
    },
    passProps: {},
    animationType: 'slide-down'
  });
};
