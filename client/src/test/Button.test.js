import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../components/Button.js';
import '@testing-library/jest-dom/extend-expect';

describe('Button component', () => {
  it('renders properly with the provided props', () => {
    const title = 'Click me';
    const classList = 'btn-primary';
    const id = 'test-button';
    const onSetActive = jest.fn();

    const { getByText, getByTestId } = render(
      <Button
        title={title}
        onSetActive={onSetActive}
        classList={classList}
        id={id}
      />
    );

    const button = getByTestId('button-component');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass(classList);
    expect(button).toHaveClass(id);
    expect(getByText(title)).toBeInTheDocument();
  });

  it('invokes the callback function when clicked', () => {
    const title = 'Click me';
    const classList = 'btn-primary';
    const id = 'test-button';
    const onSetActive = jest.fn();

    const { getByTestId } = render(
      <Button
        title={title}
        onSetActive={onSetActive}
        classList={classList}
        id={id}
      />
    );

    const button = getByTestId('button-component');
    fireEvent.mouseDown(button);
    expect(onSetActive).toHaveBeenCalled();
  });

  it('renders with the disabled class when disabled', () => {
    const title = 'Click me';
    const classList = 'btn-primary';
    const id = 'test-button';
    const onSetActive = jest.fn();
    const disabled = true;

    const { getByTestId } = render(
      <Button
        title={title}
        onSetActive={onSetActive}
        classList={classList}
        id={id}
        disabled={disabled}
      />
    );

    const button = getByTestId('button-component');
    expect(button).toHaveClass('disabled');
  });
});
