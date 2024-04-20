import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import rootReducer from './hooks/redux/rootReducer';

const store: any = createStore(
	rootReducer,
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.Fragment>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>

	</React.Fragment>,
);
