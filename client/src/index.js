import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

ReactDOM.render(
    <BrowserRouter history={createBrowserHistory()}>
    <App />
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
