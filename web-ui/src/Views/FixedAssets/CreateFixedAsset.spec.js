import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CreateFixedAssetForm from './CreateFixedAssetForm'
import {MemoryRouter, Route, Routes} from 'react-router-dom'

function renderWithRouter(componentToRender, pathToElement, mockedPath){
    render( 
      <MemoryRouter initialEntries={[mockedPath]}>
          <Routes>
              <Route path={pathToElement} element={componentToRender}></Route>
          </Routes>
      </MemoryRouter>
    )
  }

describe('Inputs from CreateFixedAsset component must be empty in the beginning', () => {
    it('Doesnt show any result in the beginning at the Name space', () => {
        renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        expect(screen.getByLabelText(/Nombre/i)).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at the Description space', () => {
        renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        expect(screen.getByLabelText(/Descripción/i)).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at EntryDate space', () => {
        renderWithRouter(<CreateFixedAssetForm />, "/crear-activo-fijo","/crear-activo-fijo")
        expect(
            screen.getByLabelText(/Fecha de Entrada/i)
        ).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at Price space', () => {
        renderWithRouter(<CreateFixedAssetForm />, "/crear-activo-fijo","/crear-activo-fijo")
        expect(screen.getByLabelText(/Precio/i)).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at Features', () => {
        renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        expect(
            screen.getByLabelText(/Características/i)
        ).toHaveDisplayValue('')
    })
    it('Doesnt show any result in the beginning at Quantity space', () => {
        renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        expect(screen.getByLabelText(/Cantidad/i)).toHaveDisplayValue('')
    })
})
describe('Validating inputs from CreateFixedAssets component', () => {
    it('Price Input cant receive characters', () => {
        renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        const priceInput = screen.getByLabelText(/Precio/i)
        priceInput.value = 'test'
        expect(priceInput).toHaveDisplayValue('')
    })
    it('Quantity Input cant receive characters', () => {
        renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        const quantityInput = screen.getByLabelText(/Cantidad/i)
        quantityInput.value = 'test'
        expect(quantityInput).toHaveDisplayValue('')
    })
    it('EntryDate Input cant have more than 32 days', () => {
        renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        const entryDateInput =
            screen.getByLabelText(/Fecha de Entrada/i)
        entryDateInput.value = '2022-09-33'
        expect(entryDateInput).toHaveDisplayValue('')
    })
    it('EntryDate Input cant have more than 12 months', () => {
        renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        const entryDateInput =
            screen.getByLabelText(/Fecha de Entrada/i)
        entryDateInput.value = '2022-13-03'
        expect(entryDateInput).toHaveDisplayValue('')
    })
})

