import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import VehicleList from './components/VehicleList';
import store from './redux/store';
import './global-styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <VehicleList />
    </Provider>
  </React.StrictMode>,
  document.querySelector('.root')
);
