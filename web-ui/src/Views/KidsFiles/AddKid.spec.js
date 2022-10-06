import { render } from '@testing-library/react';
import AddKid from './AddKid';
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'

describe('<AddKid />', () => {
    it('Should capture Name rendered correctly', () => {
        const {getByLabelText } = render(<Router><AddKid/></Router>);
        const nameTypeLabel = getByLabelText(/Nombres/i);
        expect(nameTypeLabel).toBeInTheDocument();
    })
    it('Should capture LastName rendered correctly', () => {
        const {getByLabelText } = render(<Router><AddKid /></Router>);
        const lastNameLabel = getByLabelText(/Apellidos/i);
        expect(lastNameLabel).toBeInTheDocument();
    })
    it(' Should capture birthDate rendered correctly', () => {
        const {getByLabelText } = render(<Router><AddKid /></Router>);
        const birthDateLabel = getByLabelText(/Fecha de nacimiento/i);
        expect(birthDateLabel).toBeInTheDocument();

    })
    it(' Should capture  programHouse rendered correctly', () => {
        const {getByLabelText } = render(<Router><AddKid /></Router>);
        const programHouseLabel = getByLabelText(/Casa/i);
        expect(programHouseLabel).toBeInTheDocument();

    })
    it(' Should capture birthPlace rendered correctly', () => {
        const {getByLabelText } = render(<Router><AddKid/></Router>);
        const birthPlaceLabel = getByLabelText(/Lugar de Nacimiento/i);
        expect(birthPlaceLabel).toBeInTheDocument();

    })
    it('Should capture gender correctly', () => {
        const {getByLabelText } = render(<Router><AddKid /></Router>);
        const genderLabel = getByLabelText(/Genero/i);
        expect(genderLabel).toBeInTheDocument();

    })
    
})

