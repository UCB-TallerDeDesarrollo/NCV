import { render } from '@testing-library/react';
import AddHealthReport from './AddHealthReport';
import '@testing-library/jest-dom'

describe('<AddHealthReport />', () => {
    it('Should capture BloodType rendered correctly', () => {
        const {getByLabelText } = render(<AddHealthReport />);
        const bloodTypeLabel = getByLabelText(/Tipo de Sangre/i);
        expect(bloodTypeLabel).toBeInTheDocument();
    })
    it('Should capture CIDiscapacidad rendered correctly', () => {
        const {getByLabelText } = render(<AddHealthReport />);
        const cIDiscapacidadLabel = getByLabelText(/CI Discapacidad/i);
        expect(cIDiscapacidadLabel).toBeInTheDocument();
    })
    it(' Should capture PsychologicalDiagnosis rendered correctly', () => {
        const {getByLabelText } = render(<AddHealthReport />);
        const psychologicalDiagnosisLabel = getByLabelText(/Diagnostico Fisico/i);
        expect(psychologicalDiagnosisLabel).toBeInTheDocument();

    })
    it(' Should capture NeurologicalDiagnosis rendered correctly', () => {
        const {getByLabelText } = render(<AddHealthReport />);
        const neurologicalDiagnosisLabel = getByLabelText(/Diagnostico Neurologico/i);
        expect(neurologicalDiagnosisLabel).toBeInTheDocument();

    })
    it(' Should capture SpecialDiagnosis rendered correctly', () => {
        const {getByLabelText } = render(<AddHealthReport />);
        const specialDiagnosisLabel = getByLabelText(/Diagnostico Especial/i);
        expect(specialDiagnosisLabel).toBeInTheDocument();

    })
    
})

