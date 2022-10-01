import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CreateFixedAssetForm from './CreateFixedAssetForm'

describe('Inputs from CreateFixedAsset component must be empty in the beginning', () => {
    it('Doesnt show any result in the beginning at the Name space', () => {
        render(<CreateFixedAssetForm />)
        expect(screen.getByPlaceholderText('Nombre')).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at the Description space', () => {
        render(<CreateFixedAssetForm />)
        expect(screen.getByPlaceholderText('Descripción')).toHaveDisplayValue(
            ''
        )
    })
    it('Doesnt show any result in the beginning at EntryDate space', () => {
        render(<CreateFixedAssetForm />)
        expect(
            screen.getByPlaceholderText('Fecha de Entrada')
        ).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at Price space', () => {
        render(<CreateFixedAssetForm />)
        expect(screen.getByPlaceholderText('Precio')).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at Features', () => {
        render(<CreateFixedAssetForm />)
        expect(
            screen.getByPlaceholderText('Características')
        ).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at Quantity space', () => {
        render(<CreateFixedAssetForm />)
        expect(screen.getByPlaceholderText('Cantidad')).toHaveDisplayValue('')
    })
})
describe('Validating inputs from CreateFixedAssets component', () => {
    it('Price Input cant receive characters', () => {
        render(<CreateFixedAssetForm />)
        const priceInput = screen.getByPlaceholderText('Precio')
        priceInput.value = 'test'
        expect(priceInput).toHaveDisplayValue('')
    })
    it('Quantity Input cant receive characters', () => {
        render(<CreateFixedAssetForm />)
        const quantityInput = screen.getByPlaceholderText('Cantidad')
        quantityInput.value = 'test'
        expect(quantityInput).toHaveDisplayValue('')
    })
    it('EntryDate Input cant have more than 32 days', () => {
        render(<CreateFixedAssetForm />)
        const entryDateInput =
            screen.getByPlaceholderText('Fecha de Entrada')
        entryDateInput.value = '2022-09-33'
        expect(entryDateInput).toHaveDisplayValue('')
    })
    it('EntryDate Input cant have more than 12 months', () => {
        render(<CreateFixedAssetForm />)
        const entryDateInput =
            screen.getByPlaceholderText('Fecha de Entrada')
        entryDateInput.value = '2022-13-03'
        expect(entryDateInput).toHaveDisplayValue('')
    })
})

