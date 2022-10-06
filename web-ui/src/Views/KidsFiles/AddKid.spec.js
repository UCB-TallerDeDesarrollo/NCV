import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AddKid from './AddKid'

describe('Inputs from AddKid component must be empty in the beginning', () => {
    it('Doesnt show any result in the beginning at the firstName space', () => {
        render(<AddKid />)
        expect(screen.getByLabelText(/Nombre/i)).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at the lastName space', () => {
        render(<AddKid />)
        expect(screen.getByLabelText(/Apellido/i)).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at birthDate space', () => {
        render(<AddKid />)
        expect(screen.getByLabelText(/Fecha de Nacimiento/i)).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at programHouse', () => {
        render(<AddKid />)
        expect(
            screen.getByLabelText(/Casa/i)
        ).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at birthPlace', () => {
        render(<AddKid />)
        expect(screen.getByLabelText(/Lugar de Nacimiento/i)).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at gender space', () => {
        render(<AddKid />)
        expect(screen.getByLabelText(/Genero/i)).toHaveDisplayValue('')
    })
})

