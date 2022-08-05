import React from 'react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

import './utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Suspense fallback='...is loading'>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Suspense>
);
