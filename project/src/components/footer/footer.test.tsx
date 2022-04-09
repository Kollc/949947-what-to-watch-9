import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
  it('Footer should render is success', () => {
    render(<Footer/>);
    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });
});
