import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';


describe('LoadingScreen', () => {
  it('LoadingScreen should render is success', () => {
    render(<LoadingScreen/>);
    expect(screen.getByTestId('film-loader')).toBeInTheDocument();
  });
});
