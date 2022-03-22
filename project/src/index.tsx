import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { films } from './mocks/films';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App films={films} promoFilm={films[0]}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
