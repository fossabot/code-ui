import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from 'src/reducers/index'

export default (state = {}) => {
	const middlewares = []
	middlewares.push(thunkMiddleware)
	if (process.browser && process.env.NODE_ENV !== 'production') {
		// eslint-disable-next-line global-require
		const { createLogger } = require('redux-logger')
		middlewares.push(createLogger({
			collapsed : true,
			diff      : true
		}))
	}

	const store = createStore(
		reducer,
		state,
		compose(applyMiddleware(...middlewares))
	)

	if (module.hot) {
		module.hot.accept('./reducers/index', () => {
			/* eslint-disable global-require */
			store.replaceReducer(require('./reducers/index').default)
			/* eslint-enable global-require */
		})
	}
	return store
}
