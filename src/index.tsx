import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Application from './Application';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Application />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


