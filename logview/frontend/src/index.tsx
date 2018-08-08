import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import Router from './router/routes';
import createSagaMiddleware from 'redux-saga';
import history from './router/history';

import reducer from './redux/reducer';
import { StoreState } from './types/StoreState';
import sagas from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

if (typeof Storage === 'undefined') {
	ReactDOM.render(
		<p>
			{' '}
			Your browser does not support Web Storage API. Please update your
			browser or use another one.
		</p>,
		document.getElementById('root')
	);
} else {
	const middleware = [sagaMiddleware, routerMiddleware(history)];

	const store = createStore<StoreState, any, {}, {}>(
		connectRouter(history)(reducer),
		composeWithDevTools(applyMiddleware(sagaMiddleware))
	);

	sagaMiddleware.run(sagas);

	ReactDOM.render(
		<Provider store={store}>
			<Router />
		</Provider>,
		document.getElementById('root')
	);
}
