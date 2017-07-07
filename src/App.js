import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Router from './Router';
import { itemStore,
        itemImageStore,
        itemVoiceStore,
        itemLocationStore,
        categoryStore } from './store';


class App extends Component {
    render() {
        return (
          <Provider
            itemStore={itemStore}
            itemImageStore={itemImageStore}
            itemVoiceStore={itemVoiceStore}
            itemLocationStore={itemLocationStore}
            categoryStore={categoryStore}
          >
            <Router />
          </Provider>
        );
    }
}
export default App;
