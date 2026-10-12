import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

// Register PWA Service Worker for standalone install & offline media caching
if ('serviceWorker' in navigator && !window.location.host.includes('localhost')) {
  window.addEventListener('load', () => {
    const swPath = window.location.pathname.startsWith('/iqenglish') ? '/iqenglish/sw.js' : '/sw.js';
    navigator.serviceWorker
      .register(swPath)
      .then((reg) => {
        console.log('PWA Service Worker registered:', reg.scope);
        reg.update();
      })
      .catch((err) => console.log('PWA Service Worker registration failed:', err));
  });
}
