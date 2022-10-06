import {render, screen, waitFor} from '@testing-library/react';
import {ShowKidsFiles} from './ShowOneKidFile';

import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {act} from 'react-dom/test-utils';

import {MemoryRouter, Route, Routes} from 'react-router-dom'
import ShowKidsFiles from './ShowKidsFiles';

describe('Show Kids Files', () => {
  const fixedAssetUrl ='https://ncv-api.herokuapp.com/api/kids'  

  function getResponse(url, jsonData=null, code=200, text=null){
    const response = rest.get(url, (req, res, ctx) => {
      if(code!=200) return res(ctx.status(code), ctx.text(text))
      return res(ctx.json(jsonData))
    })
    return response
  }

  const kidsFiles =
  [
    {
      "id":7,
      "firstName":"Pepe",
      "lastName":"Trueno",
      "ci":"23546897",
      "birthDate":"2003-03-03T00:00:00",
      "programHouse":"Av. Cualquier cosa #11",
      "birthPlace":"España",
      "gender":"Masculino"
    },
    {
      "id":8,
      "firstName":"a",
      "lastName":"Papaya",
      "ci":"147896325",
      "birthDate":"2022-10-05T00:00:00",
      "programHouse":"Av Licuado",
      "birthPlace":"Coconut Tree",
      "gender":"Masculino"
    },
    {
      "id":9,
      "firstName":"a",
      "lastName":"Almendra",
      "ci":"123",
      "birthDate":"2022-10-05T00:00:00",
      "programHouse":"Casa Maluma",
      "birthPlace":"Bolivia",
      "gender":"Femenino"
    },
    {
      "id":10,
      "firstName":"Ejemplo",
      "lastName":"Perez",
      "ci":"13546865",
      "birthDate":"2005-10-10T00:00:00",
      "programHouse":"Casa de ejemplo",
      "birthPlace":"En el cerro",
      "gender":"Masculino"
    },
    {
      "id":11,
      "firstName":"Pedrulas",
      "lastName":"Permutacion",
      "ci":"1356746",
      "birthDate":"2009-02-02T00:00:00",
      "programHouse":"Casa de ejemplo",
      "birthPlace":"En el cerro",
      "gender":"Masculino"
    }
  ]

  const fixedAssetsOnlyRequiredFields =
  [
    {
       "id":1,
       "name":"Asset name 1",
       "description":null,
       "entryDate":null,
       "price":100,
       "features":null,
       "quantity":1
    },
    {
       "id":2,
       "name":"Asset name 2",
       "description":null,
       "entryDate":null,
       "price":100,
       "features":null,
       "quantity":1
    },
    {
       "id":3,
       "name":"Asset name 3",
       "description":null,
       "entryDate":null,
       "price":100,
       "features":null,
       "quantity":1
    },
    {
       "id":4,
       "name":"Asset name 4",
       "description":null,
       "entryDate":null,
       "price":100,
       "features":null,
       "quantity":1
    },
    {
       "id":5,
       "name":"Asset name 5",
       "description":null,
       "entryDate":null,
       "price":100,
       "features":null,
       "quantity":1
    }
  ]

	const fixedAssetResponse = getResponse(fixedAssetUrl, fixedAssets)

  const handlers = [fixedAssetResponse];

  const server = new setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  function renderWithRouter(componentToRender, pathToElement, mockedPath){
    render( 
      <MemoryRouter initialEntries={[mockedPath]}>
          <Routes>
              <Route path={pathToElement} element={componentToRender}></Route>
          </Routes>
      </MemoryRouter>
    )
  }

  it('Shows a list of fixed assets data correctly', async () => {
    act(()=>{
      renderWithRouter(<ShowFixedAssets/>,"/activos-fijos","/activos-fijos" )
    }) 
    await waitFor(() => {
        expect(screen.getByText('Lista de activos fijos')).toBeVisible
        expect(screen.getByText('Crear activo fijo')).toBeVisible
        expect(screen.getByText('Asset name 1')).toBeVisible
        expect(screen.getByText('Descripción: Description from asset 1')).toBeVisible
        expect(screen.getByText('Asset name 2')).toBeVisible
        expect(screen.getByText('Descripción: Description from asset 2')).toBeVisible
        expect(screen.getByText('Asset name 3')).toBeVisible
        expect(screen.getByText('Descripción: Description from asset 3')).toBeVisible
        expect(screen.getByText('Asset name 4')).toBeVisible
        expect(screen.getByText('Descripción: Description from asset 4')).toBeVisible
        expect(screen.getByText('Asset name 5')).toBeVisible
        expect(screen.getByText('Descripción: Description from asset 5')).toBeVisible
      })  
  })
  
  it('Shows fixed assets data when non-required fields are null', async () => {    
    const fixedAssestWithOnlyRequiredFields = getResponse(fixedAssetUrl, fixedAssetsOnlyRequiredFields)
    server.use(fixedAssestWithOnlyRequiredFields)
    act(()=>{
      renderWithRouter(<ShowFixedAssets/>,"/activos-fijos","/activos-fijos" )
    }) 
    await waitFor(() => {
      expect(screen.getByText('Asset name 1')).toBeVisible
      expect(screen.getByText('Asset name 2')).toBeVisible
      expect(screen.getByText('Asset name 3')).toBeVisible
      expect(screen.getByText('Asset name 4')).toBeVisible
      expect(screen.getByText('Asset name 5')).toBeVisible
      expect(screen.getAllByText('Descripción: *Sin descripción*')).toHaveLength(5)
      })  
  })
  it('Shows error when api does not return any data. Should return error 500', async () => {
    const fixedAssetInternalServiceErrorResponse = getResponse(fixedAssetUrl, null, 500, "Lo sentimos, algo sucedió.")
    server.use(fixedAssetInternalServiceErrorResponse)
    act(()=>{
      renderWithRouter(<ShowFixedAssets/>,"/activos-fijos","/activos-fijos" )
    }) 
    await waitFor(() => {
        expect(screen.getByText("ERROR 500: Lo sentimos, algo sucedió.").toBeVisible)
      })  
  });
})