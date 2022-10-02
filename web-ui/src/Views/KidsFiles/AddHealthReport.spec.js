import { render } from '@testing-library/react';
import AddHealthReport from './AddHealthReport';
import '@testing-library/jest-dom'

describe('<AddHealthReport />', () => {
    it('Should capture BloodType rendered correctly', () => {
        const {getByLabelText } = render(<AddHealthReport />);
        const bloodTypeLabel = getByLabelText(/Tipo de Sangre/i);
        expect(bloodTypeLabel).toBeInTheDocument();
    })
    
})

