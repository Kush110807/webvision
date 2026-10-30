import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// Original SARATHI clone styles (used on /original)
import './styles/original/bootstrap-theme.min.css';
import './styles/original/bootstrap.min.css';
import './styles/original/custom.css';
import './styles/original/sarathi_parivahan.css';
import './styles/original/sarathi_parivahan_layout.css';
import './styles/original/sow4.css';
import './styles/original/inline-from-page.css';
import './styles/react-additions.css';
// SARATHI ONE styles (loaded after bootstrap so they take precedence)
import './styles/one/global.css';
import './styles/one/components.css';
import './styles/one/pages.css';
// Focused WebVision redesign overrides; original /original page is unaffected.
import './styles/one/redesign.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
