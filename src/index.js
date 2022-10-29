import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
    <React.StrictMode>
        <AlertProvider template={AlertTemplate}>
            <App/>
        </AlertProvider>
    </React.StrictMode>
);
