import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowMore from './show-more';

describe('ShowMore', () => {
  const setCountFilmShow = jest.fn();

  it('ShowMore should render is success', () => {
    render(<ShowMore countFilmShow={10} setCountFilmShow={setCountFilmShow}/>);
    expect(screen.getByTestId('show-more-wrapper')).toBeInTheDocument();
  });

  it('click ShowMore button work is correct', () => {
    render(<ShowMore countFilmShow={10} setCountFilmShow={setCountFilmShow}/>);

    userEvent.click(screen.getByTestId('show-more-button'));
    expect(setCountFilmShow).toBeCalled();
  });
});
