import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Router from './Router';
import itemStore from './store/itemStore';

class App extends Component {
    render() {
        return (
          <Provider itemStore={itemStore}>
            <Router />
          </Provider>
        );
    }
}
export default App;
