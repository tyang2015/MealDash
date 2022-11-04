import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import ToggleCartProvider from './context/ToggleCartContext';
import OrderStartedProvider from './context/OrderStartedContext';
import TriggerCountdownProvider from './context/TriggerCountdown';
import RatingDropdownProvider from './context/RatingDropdown';
import PriceDropdownProvider from './context/PriceDropdown';
import { ModalProvider } from './context/Modal';
import CancelTimerProvider from './context/CancelTimer';
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <CancelTimerProvider>
            <TriggerCountdownProvider>
              <RatingDropdownProvider>
                <PriceDropdownProvider>
                  <ToggleCartProvider>
                    <App />
                  </ToggleCartProvider>
                </PriceDropdownProvider>
              </RatingDropdownProvider>
            </TriggerCountdownProvider>
        </CancelTimerProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
