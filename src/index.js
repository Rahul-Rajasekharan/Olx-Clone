import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContext } from './Store/Context';
import { firebase } from './Firebase/Config';
import Context from './Store/Context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
