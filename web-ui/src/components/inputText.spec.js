import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import InputText from "./InputText.js";

describe('InputText Component', () => {
    it('renders an input for username', () => {
      render(
        <InputText type="text" id="input-text-username" lable="Username:" />
      );

      expect(screen.getByRole('label')).toHaveTextContent('Username:');
      expect(screen.getByRole('input')).toHaveAttribute('type', 'text');
    });
  
    it('renders an input for password', () => {
        render(
          <InputText type="password" id="input-text-password" lable="Password:" /> 
        );
  
        expect(screen.getByRole('label')).toHaveTextContent('Password:');
        expect(screen.getByRole('input')).toHaveAttribute('type', 'password');
      });
  });