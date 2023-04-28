import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import store from 'redux/store';
import GlobalStyle from 'styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
export let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <GlobalStyle/>
    </PersistGate>
  </Provider>
);
