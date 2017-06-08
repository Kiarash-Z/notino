import { Navigation } from 'react-native-navigation';
import Categories from './components/pages/Categories';

export default () => {
  Navigation.registerComponent('Categories', () => Categories);
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'Categories',
      navigatorStyle: {},
      title:'search',
      navigatorButtons: {}
    },
    passProps: {},
    animationType: 'slide-down'
  });
};
