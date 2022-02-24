import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  COUNT_CARDS: 20,
};

const promoFilm = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  dataRelease: new Date(2014, 4, 4),// mock date
};

ReactDOM.render(
  <React.StrictMode>
    <App countCards={Setting.COUNT_CARDS} promoFilm={promoFilm}/>
  </React.StrictMode>,
  document.getElementById('root'));
