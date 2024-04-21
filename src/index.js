// IMPORT: React
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// IMPORT: Styles
import './index.css';
import './styles/App.css';
import './styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
