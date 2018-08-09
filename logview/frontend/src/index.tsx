import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import App from './containers/App/App';
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
	const store = createStore<StoreState, any, {}, {}>(
		reducer,
		composeWithDevTools(applyMiddleware(sagaMiddleware))
	);

	sagaMiddleware.run(sagas);

	ReactDOM.render(
		<Provider store={store}>
			<App msg="Hello World" />
		</Provider>,
		document.getElementById('root')
	);
}
