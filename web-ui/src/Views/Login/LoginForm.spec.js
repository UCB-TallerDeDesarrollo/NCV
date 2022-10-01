import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import '@testing-library/jest-dom'

describe('<LoginForm />', () => {
    it('Should capture E-Mail rendered correctly', () => {
        const {getByLabelText } = render(<LoginForm />);

        const emailLabel = getByLabelText(/E-Mail/i);

        expect(emailLabel).toBeInTheDocument();
    })
    it('Should capture password rendered correctly', () => {
        const {getByLabelText } = render(<LoginForm />);

        const passwordLabel = getByLabelText(/Contraseña/i);

        expect(passwordLabel).toBeInTheDocument();
        expect(passwordLabel).toHaveAttribute('type', 'password');
      })
    it('E-mail should be able to change his values', () => {
        const { getByLabelText } = render(<LoginForm />);

        const emailLabel = getByLabelText(/E-Mail/i);

        emailLabel.value = 'email@test.com';

        expect(emailLabel).toHaveDisplayValue('email@test.com');
    })
    it('Password should be able to change his values', () => {
        const { getByLabelText } = render(<LoginForm />);

        const passwordLabel = getByLabelText(/Contraseña/i);

        passwordLabel.value = 'secreto1234';

        expect(passwordLabel).toHaveDisplayValue('secreto1234');
    })
})