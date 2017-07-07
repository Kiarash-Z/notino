import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Category from './components/pages/Category';
import Categories from './components/pages/Categories';
import ItemCreate from './components/pages/ItemCreate';
import ItemEdit from './components/pages/ItemEdit';
import ItemSearch from './components/pages/ItemSearch';

const RouterComponent = () => {
  return (
    <Router>
        <Scene
          key="category"
          component={Category}
          hideNavBar
                    initial
        />
        <Scene
          key="categories"
          component={Categories}
          hideNavBar
        />
        <Scene
          key="itemCreate"
          component={ItemCreate}
          hideNavBar
        />
        <Scene
          key="itemEdit"
          component={ItemEdit}
          hideNavBar
        />
        <Scene
          key="itemSearch"
          component={ItemSearch}
          hideNavBar
        />
    </Router>
  );
};

export default RouterComponent;
