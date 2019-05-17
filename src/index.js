import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './HomePage';

ReactDOM.render(
    <BrowserRouter>
        <div>
        <Route exact path="/" component={App} />
            <Route path="/HomePage" component={HomePage} />


            </div>

</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();