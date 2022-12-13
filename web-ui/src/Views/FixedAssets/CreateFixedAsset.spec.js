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
  const programHousesUrl =process.env.REACT_APP_BACKEND_URL + '/api/programHouses'
  const categoriesUrl =process.env.REACT_APP_BACKEND_URL + '/api/AssetCategories'  
  const statesUrl =process.env.REACT_APP_BACKEND_URL + '/api/AssetStates' 
  const responsiblesUrl =process.env.REACT_APP_BACKEND_URL + '/api/AssetResponsibles' 

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

  const assetStates = 
  [
    {
        "id": 3,
        "state": "Malo",
        "fixedAssets": []
    },
    {
        "id": 4,
        "state": "Obsoleto",
        "fixedAssets": []
    },
    {
        "id": 5,
        "state": "Verificar",
        "fixedAssets": []
    },
    {
        "id": 2,
        "state": "Regular",
        "fixedAssets": []
    },
    {
        "id": 1,
        "state": "Bueno",
        "fixedAssets": []
    }
  ]

  const assetResponsibles = 
  [
    {
        "id": 21,
        "name": "Diego Delgadillo",
        "fixedAssets": []
    },
    {
        "id": 22,
        "name": "Tiara Rojas",
        "fixedAssets": []
    },
    {
        "id": 23,
        "name": "Javier Ferrel",
        "fixedAssets": []
    },
    {
        "id": 24,
        "name": "Franklin Rosembluth",
        "fixedAssets": []
    },
    {
        "id": 25,
        "name": "Juan Pablo Carrasco",
        "fixedAssets": []
    }
  ]

  const programHousesResponse = getResponse(programHousesUrl, programHouses)
  const categoriesResponse = getResponse(categoriesUrl, assetCategories)
  const statesResponse = getResponse(statesUrl, assetStates)
  const responsiblesResponse = getResponse(responsiblesUrl, assetResponsibles)

  const handlers = [programHousesResponse, categoriesResponse, statesResponse, responsiblesResponse]

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
            expect(screen.getByLabelText(/Detalle/i)).toHaveDisplayValue('')
        })
    })
    it('Doesnt show any result in the beginning at Price space', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />, "/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Valor/i)).toHaveDisplayValue('')
        })
    })
})
describe('Validating inputs from CreateFixedAssets component', () => {
    it('Price Input cant receive characters', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const priceInput = screen.getByLabelText(/Valor/i)
            priceInput.value = 'test'
            expect(priceInput).toHaveDisplayValue('')
        })
    })
})

