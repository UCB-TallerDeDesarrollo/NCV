import { render } from '@testing-library/react';
import AddHealthReport from './AddHealthReport';
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'

describe('<AddHealthReport />', () => {
    it('Should capture BloodType rendered correctly', () => {
        const {getByLabelText } = render(<Router><AddHealthReport/></Router>);
        const bloodTypeLabel = getByLabelText(/Grupo sanguineo/i);
        expect(bloodTypeLabel).toBeInTheDocument();
    })
    it('Should capture CIDiscapacidad rendered correctly', () => {
        const {getByLabelText } = render(<Router><AddHealthReport /></Router>);
        const cIDiscapacidadLabel = getByLabelText(/CI de Discapacidad/i);
        expect(cIDiscapacidadLabel).toBeInTheDocument();
    })
    it(' Should capture PsychologicalDiagnosis rendered correctly', () => {
        const {getByLabelText } = render(<Router><AddHealthReport /></Router>);
        const psychologicalDiagnosisLabel = getByLabelText(/Diagnostico Fisico/i);
        expect(psychologicalDiagnosisLabel).toBeInTheDocument();

    })
    it(' Should capture NeurologicalDiagnosis rendered correctly', () => {
        const {getByLabelText } = render(<Router><AddHealthReport /></Router>);
        const neurologicalDiagnosisLabel = getByLabelText(/Diagnostico Neurologico/i);
        expect(neurologicalDiagnosisLabel).toBeInTheDocument();

    })
    it(' Should capture SpecialDiagnosis rendered correctly', () => {
        const {getByLabelText } = render(<Router><AddHealthReport /></Router>);
        const specialDiagnosisLabel = getByLabelText(/Diagnostico Especial/i);
        expect(specialDiagnosisLabel).toBeInTheDocument();

    })
    it('Should capture HealthProblemsrendered correctly', () => {
        const {getByLabelText } = render(<Router><AddHealthReport /></Router>);
        const healthProblemsLabel = getByLabelText(/Problemas de Salud/i);
        expect(healthProblemsLabel).toBeInTheDocument();

    })
    
})

