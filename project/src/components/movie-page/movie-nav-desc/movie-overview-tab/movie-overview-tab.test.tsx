import { render, screen } from '@testing-library/react';
import { testPromoFilm } from '../../../../test-mock/films';
import MovieOverviewTab from './movie-overview-tab';

describe('MovieOverviewTab', () => {
  it('MovieOverviewTab should render is success', () => {
    render(<MovieOverviewTab film={testPromoFilm}/>);
    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
  });
});
