import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router'
import { Provider } from 'react-redux'
import configStore from './redux/store/configStore';
import registerServiceWorker from './registerServiceWorker';
const store=configStore()
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>
  ,
    document.getElementById('root')
);
registerServiceWorker()

