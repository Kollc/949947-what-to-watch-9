import { render, screen } from '@testing-library/react';
import { testPromoFilm } from '../../../../test-mock/films';
import MovieDetailsTab from './movie-details-tab';

describe('MovieDetailsTab', () => {
  it('MovieDetailsTab should render is success', () => {
    render(<MovieDetailsTab film={testPromoFilm}/>);
    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(/Released/i)).toBeInTheDocument();
  });
});
