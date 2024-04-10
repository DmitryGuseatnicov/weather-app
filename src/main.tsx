import { PrimeReactProvider } from 'primereact/api';
import { ConfirmDialog } from 'primereact/confirmdialog';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from '@/App';
import { ToastContextProvider } from '@/context';
import { store } from '@/store';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import './index.scss';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');

  return worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PrimeReactProvider>
          <ToastContextProvider>
            <App />
            <ConfirmDialog />
          </ToastContextProvider>
        </PrimeReactProvider>
      </Provider>
    </React.StrictMode>,
  );
});
