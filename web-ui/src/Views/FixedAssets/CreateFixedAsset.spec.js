import {render, screen, waitFor} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import '@testing-library/jest-dom'
import CreateFixedAssetForm from './CreateFixedAssetForm'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import {act} from 'react-dom/test-utils';

function renderWithRouter(componentToRender, pathToElement, mockedPath){
    render( 
      <MemoryRouter initialEntries={[mockedPath]}>
          <Routes>
              <Route path={pathToElement} element={componentToRender}></Route>
          </Routes>
      </MemoryRouter>
    )
  }
  const programHousesUrl ='https://ncv-api.herokuapp.com/api/programHouses'
  const categoriesUrl ='https://ncv-api.herokuapp.com/api/AssetCategories'  

  function getResponse(url, jsonData=null, code=200, text=null){
      const response = rest.get(url, (req, res, ctx) => {
        if(code!=200) return res(ctx.status(code), ctx.text(text))
        return res(ctx.json(jsonData))
      })
      return response
  }

  const programHouses =
  [
      {
          id: 1,
          acronym:"SDE"
      },
      {
          id: 1,
          acronym:"CAC"
      }
  ]

  const assetCategories =
  [
    {
        "id": 1,
        "category": "Equipos y Herramientas",
        "fixedAssets": []
    },
    {
        "id": 2,
        "category": "Muebles y Enseres",
        "fixedAssets": []
    },
    {
        "id": 4,
        "category": "Herramientas",
        "fixedAssets": []
    },
    {
        "id": 3,
        "category": "Maquinaria",
        "fixedAssets": []
    }
  ]

  const programHousesResponse = getResponse(programHousesUrl, programHouses)
  const categoriesResponse = getResponse(categoriesUrl, assetCategories)

  const handlers = [programHousesResponse, categoriesResponse]

  const server = new setupServer(...handlers)

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

describe('Inputs from CreateFixedAsset component must be empty in the beginning', () => {    

    it('Doesnt show any result in the beginning at the Name space', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Nombre/i)).toHaveDisplayValue('')
        })
    })
    it('Doesnt show any result in the beginning at the Description space', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Descripción/i)).toHaveDisplayValue('')
        })
    })
    it('Doesnt show any result in the beginning at EntryDate space', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />, "/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Fecha de Entrada/i)).toHaveDisplayValue('')
        })
    })
    it('Doesnt show any result in the beginning at Price space', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />, "/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Precio/i)).toHaveDisplayValue('')
        })
    })
    it('Doesnt show any result in the beginning at Features', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Características/i)).toHaveDisplayValue('')
        })
    })
    it('Doesnt show any result in the beginning at Quantity space', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Cantidad/i)).toHaveDisplayValue('')
        })
    })
})
describe('Validating inputs from CreateFixedAssets component', () => {
    it('Price Input cant receive characters', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const priceInput = screen.getByLabelText(/Precio/i)
            priceInput.value = 'test'
            expect(priceInput).toHaveDisplayValue('')
        })
    })
    it('Quantity Input cant receive characters', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const quantityInput = screen.getByLabelText(/Cantidad/i)
            quantityInput.value = 'test'
            expect(quantityInput).toHaveDisplayValue('')
        })
    })
    it('EntryDate Input cant have more than 32 days', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })       
        await waitFor(() => {
            const entryDateInput =screen.getByLabelText(/Fecha de Entrada/i)
            entryDateInput.value = '2022-09-33'
            expect(entryDateInput).toHaveDisplayValue('')
        })
    })
    it('EntryDate Input cant have more than 12 months', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")            
        })        
        await waitFor(() => {
            const entryDateInput = screen.getByLabelText(/Fecha de Entrada/i)
            entryDateInput.value = '2022-13-03'
            expect(entryDateInput).toHaveDisplayValue('')
        })
    })
})

