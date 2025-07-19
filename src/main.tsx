import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Error from './error/Error.tsx';
import ErrorBoundary from './utils/ErrorBoundary.ts';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary fallback={<Error />}>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}
