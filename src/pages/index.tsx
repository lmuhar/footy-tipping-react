import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Application from '../components/pages/_app';
import store from '../redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Application />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


