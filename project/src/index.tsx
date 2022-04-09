import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import browserHistory from './browse-history';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import HistoryRouter from './components/history-route/history-route';
import { checkAuthAction, fetchFavoriteListAction, fetchFilmsAction, fetchPromoFilmAction } from './store/actions/api-actions';
import { store } from './store/store';

store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchFavoriteListAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ErrorMessage />
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
