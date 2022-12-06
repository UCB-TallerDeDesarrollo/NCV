import {render, screen, waitFor} from '@testing-library/react';
import {ShowFixedAsset} from './ShowOneFixedAsset';

import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {act} from 'react-dom/test-utils';

import {MemoryRouter, Route, Routes} from 'react-router-dom'

describe('Show Fixed Asset', () => {
  const fixedAssetUrl ='https://ncv-api.azurewebsites.net/api/fixedAssets/1'  

  function getResponse(url, jsonData=null, code=200, text=null){
    const response = rest.get(url, (req, res, ctx) => {
      if(code!=200) return res(ctx.status(code), ctx.text(text))
      return res(ctx.json(jsonData))
    })
    return response
  }

  const fixedAssetWithAllFields =
  {
      id: 1,
      name: "Teclado",
      price: 200,
      assetStateState: "Obsoleto"
  }

  const fixedAssetOnlyRequiredFields = 
  {
    id: 1,
    name: "cuaderno",
    price: 50,
    assetStateState: "Obsoleto"
  }

	const fixedAssetResponse = getResponse(fixedAssetUrl, fixedAssetWithAllFields)

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

  it('Shows fixed asset data correctly', async () => {
    act(()=>{
      renderWithRouter(<ShowFixedAsset/>,"/activos-fijos/:fixedAssetId","/activos-fijos/1" )
    }) 
    await waitFor(() => {
        expect(screen.getByText('Teclado')).toBeVisible
        expect(screen.getByText('200')).toBeVisible
        expect(screen.getByText('Obsoleto')).toBeVisible
      })  
  })

  it('Shows fixed asset data when non-required fields are null', async () => {    
    const fixedAssetWithOnlyRequiredFields = getResponse(fixedAssetUrl, fixedAssetOnlyRequiredFields)
    server.use(fixedAssetWithOnlyRequiredFields)
    act(()=>{
      renderWithRouter(<ShowFixedAsset/>,"/activos-fijos/:fixedAssetId","/activos-fijos/1" )
    }) 
    await waitFor(() => {
        expect(screen.getByText('cuaderno')).toBeVisible
        expect(screen.getByText('50')).toBeVisible
        expect(screen.getByText('Obsoleto')).toBeVisible
      })  
  })

  it('Shows error when accessing invalid fixed asset id', async () => {
    const fixedAssetInvalidIdResponse = getResponse(fixedAssetUrl, null, 404, "El activo fijo con Id:1 no existe.")
    server.use(fixedAssetInvalidIdResponse)
    act(()=>{
      renderWithRouter(<ShowFixedAsset/>,"/activos-fijos/:fixedAssetId","/activos-fijos/1" )
    }) 
    await waitFor(() => {
        expect(screen.getByText("ERROR 404: El activo fijo con Id:1 no existe.").toBeVisible)
      })  
  })

  it('Shows error when api returns Internal Service Error', async () => {
    const fixedAssetInternalServiceErrorResponse = getResponse(fixedAssetUrl, null, 500, "Lo sentimos, algo sucedió.")
    server.use(fixedAssetInternalServiceErrorResponse)
    act(()=>{
      renderWithRouter(<ShowFixedAsset/>,"/activos-fijos/:fixedAssetId","/activos-fijos/1" )
    }) 
    await waitFor(() => {
        expect(screen.getByText("ERROR 500: Lo sentimos, algo sucedió.").toBeVisible)
      })  
  });
})