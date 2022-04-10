import {render, screen} from '@testing-library/react';
import PlayerPreview from './player-preview';

describe('PlayerPreview', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });


  it('PlayerPreview should render correctly', () => {
    render(
      <PlayerPreview  src={'/src'} poster={'/poster'} isActive/>,
    );

    expect(screen.getByTestId('video-preview')).toBeInTheDocument();
    expect(window.HTMLVideoElement.prototype.play).toBeCalled();
  });

  it('Click to play work is correctly', () => {
    render(
      <PlayerPreview src={'/src'} poster={'/poster'} isActive={false}/>,
    );

    expect(window.HTMLVideoElement.prototype.pause).toBeCalled();
  });
});
