import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

const onClickMock = jest.fn();

describe('<Button /> component', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Button onClick={onClickMock}>Text</Button>);
    const buttonElement = getByText('Text');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button primary');
    expect(buttonElement).not.toBeDisabled();
  });

  it('renders with secondary class', () => {
    const { getByText } = render(
      <Button onClick={onClickMock} type="secondary">
        Text
      </Button>,
    );
    const buttonElement = getByText('Text');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button secondary');
    expect(buttonElement).not.toBeDisabled();
  });

  it('renders disabled button', () => {
    const { getByText } = render(
      <Button onClick={onClickMock} disabled>
        Text
      </Button>,
    );
    const buttonElement = getByText('Text');

    expect(buttonElement).toHaveClass('button primary');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });

  it('triggers onClick event', () => {
    const { getByText } = render(
      <Button onClick={onClickMock}>Clickable Button</Button>,
    );
    const buttonElement = getByText('Clickable Button');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
