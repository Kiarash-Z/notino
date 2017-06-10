import { Navigation } from 'react-native-navigation';
import Category from './components/pages/Category';
import Categories from './components/pages/Categories';
import ItemCreate from './components/pages/ItemCreate';

export default () => {
  Navigation.registerComponent('Category', () => Category);
  Navigation.registerComponent('Categories', () => Categories);
  Navigation.registerComponent('ItemCreate', () => ItemCreate);
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
