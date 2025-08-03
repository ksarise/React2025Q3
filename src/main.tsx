import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Error from './error/Error.tsx';
import ErrorBoundary from './utils/ErrorBoundary.ts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/404/404.tsx';
import About from './components/About/About.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <ThemeProvider>
        <StrictMode>
          <Router>
            <ErrorBoundary fallback={<Error />}>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </Router>
        </StrictMode>
      </ThemeProvider>
    </Provider>
  );
}
