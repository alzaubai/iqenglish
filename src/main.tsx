import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

// Register PWA Service Worker for standalone install
if ('serviceWorker' in navigator && !window.location.host.includes('localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/iqenglish/sw.js')
      .then((reg) => console.log('PWA Service Worker registered:', reg.scope))
      .catch((err) => console.log('PWA Service Worker registration failed:', err));
  });
}
