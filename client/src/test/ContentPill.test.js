import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContentPill from '../components/ContentPill';
import '@testing-library/jest-dom/extend-expect';

describe('ContentPill component', () => {
  it('renders properly with the provided props', () => {
    const onClickHandle = jest.fn();
    const category = 'Test Category';
    const total = 1234;
    const active = true;

    const { getByText } = render(
      <ContentPill
        onClickHandle={onClickHandle}
        category={category}
        total={total}
        active={active}
      />
    );

    const categoryElement = getByText(category);
    expect(categoryElement).toBeInTheDocument();

    const totalElement = getByText('$1,234.00');
    expect(totalElement).toBeInTheDocument();
  });

  it('invokes the callback function when clicked', () => {
    const onClickHandle = jest.fn();
    const category = 'Test Category';
    const total = 1234;
    const active = true;

    const { getByTestId } = render(
      <ContentPill
        onClickHandle={onClickHandle}
        category={category}
        total={total}
        active={active}
      />
    );

    const btnContainer = getByTestId('content-pill');
    fireEvent.click(btnContainer);
    expect(onClickHandle).toHaveBeenCalled();
  });
});
