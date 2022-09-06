import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>TextoDeBoton</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('TextoDeBoton');
  });

  it('executes the onClick event', () => {
    let botonPresionado = false;
    function handleClick() {
      botonPresionado = true;
    }
    render(<Button onClick={handleClick}>MiBoton</Button>);
    fireEvent.click(screen.getByText('MiBoton'));
    expect(botonPresionado).toEqual(true);
  });
});
