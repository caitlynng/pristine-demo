import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FullscreenToggle from '../components/FullscreenToggle';
import '@testing-library/jest-dom/extend-expect';

describe('FullscreenToggle component', () => {
  it('renders the enter fullscreen icon and invokes the callback when clicked', () => {
    const screenSize = 1000;
    const fullscreenActive = false;
    const enterFullscreen = jest.fn();
    const exitFullscreen = jest.fn();

    const { getByTestId } = render(
      <FullscreenToggle
        screenSize={screenSize}
        fullscreenActive={fullscreenActive}
        enterFullscreen={enterFullscreen}
        exitFullscreen={exitFullscreen}
      />
    );

    const enterFullscreenIcon = getByTestId('enter-fullscreen-icon');
    fireEvent.click(enterFullscreenIcon);
    expect(enterFullscreen).toHaveBeenCalled();
  });

  it('renders the exit fullscreen icon and invokes the callback when clicked', () => {
    const screenSize = 1000;
    const fullscreenActive = true;
    const enterFullscreen = jest.fn();
    const exitFullscreen = jest.fn();

    const { getByTestId } = render(
      <FullscreenToggle
        screenSize={screenSize}
        fullscreenActive={fullscreenActive}
        enterFullscreen={enterFullscreen}
        exitFullscreen={exitFullscreen}
      />
    );

    const exitFullscreenIcon = getByTestId('exit-fullscreen-icon');
    fireEvent.click(exitFullscreenIcon);
    expect(exitFullscreen).toHaveBeenCalled();
  });
});
