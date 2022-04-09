import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Player from './player';

describe('Player', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('Player should render correctly', () => {
    render(
      <Player/>,
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('player__play');
  });

  it('Click to play work is correctly', () => {
    render(
      <Player/>,
    );

    const playButton = screen.getByTestId('play');
    userEvent.click(playButton);

    expect(window.HTMLVideoElement.prototype.play).toBeCalled();
  });
});
