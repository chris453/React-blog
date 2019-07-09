import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './HomePage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './Reducer/index';
import Test from './test';

const store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>

                <Route exact path="/" component={App} />
                <Route path="/Test" component={Test} />
                <Route path="/HomePage" component={HomePage} />

            </div>

        </BrowserRouter>
    </Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
