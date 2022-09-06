import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import InputWithLabel from './InputWithLabel';

describe('InputWithLabel Component', () => {
  it('renders a label associated to an input', () => {
    render(<InputWithLabel id="input-id">Etiqueta del input</InputWithLabel>);
    //getByLabelText gets the input associated to the label
    expect(screen.getByLabelText('Etiqueta del input')).toHaveDisplayValue('');
    expect(screen.getByLabelText('Etiqueta del input')).toHaveAttribute(
      'id',
      'input-id',
    );
  });
});
