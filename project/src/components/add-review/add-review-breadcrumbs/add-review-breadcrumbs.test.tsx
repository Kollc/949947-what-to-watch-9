import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { testPromoFilm } from '../../../test-mock/films';
import HistoryRouter from '../../history-route/history-route';
import AddReviewBreadcrumbs from './add-review-breadcrumbs';

describe('AddReviewBreadcrumbs', () => {
  const history = createMemoryHistory();

  it('should render "AddReviewBreadcrumbs" is success', () => {
    render(
      <HistoryRouter history={history}>
        <AddReviewBreadcrumbs film={testPromoFilm}/>
      </HistoryRouter>);

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText('War of the Worlds')).toBeInTheDocument();
  });
});

