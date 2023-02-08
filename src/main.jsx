import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from '@src/components/GlobalStyles';
import Notification from '@src/utils/Notification';
import './assets/css/index.css';
// import '@assets/js/blocked.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalStyles>
            <Notification>
                <App />
            </Notification>
        </GlobalStyles>
    </React.StrictMode>,
);
