// Einstiegspunkt des Tisch-Konfigurators (eigenständige App).

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './styles/globals.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root-Element #root fehlt — index.html prüfen.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
