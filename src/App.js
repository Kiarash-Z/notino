import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Router from './Router';
import { itemStore, itemImageStore, itemVoiceStore } from './store';


class App extends Component {
    render() {
        return (
          <Provider
            itemStore={itemStore}
            itemImageStore={itemImageStore}
            itemVoiceStore={itemVoiceStore}
          >
            <Router />
          </Provider>
        );
    }
}
export default App;
