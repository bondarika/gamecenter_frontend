import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorBoundary } from './shared/ui/error-boundary';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
  // </React.StrictMode>,
);
