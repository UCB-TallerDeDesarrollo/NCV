import {render, screen, waitFor} from '@testing-library/react'
import ShowAssetStates from './ShowAssetStates'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {act} from 'react-dom/test-utils'

import {MemoryRouter, Route, Routes} from 'react-router-dom'

const getAssetStatesUrl ='https://ncv-api.azurewebsites.net/api/assetStates'  
const oneAssetStatesUrl ='https://ncv-api.azurewebsites.net/api/assetStates/1'   

const assetStates =
  [
    {
        "id": 23,
        "state": "Dañado",
        "fixedAssets": []
    },
    {
        "id": 5,
        "state": "Verificar-estado",
        "fixedAssets": []
    },
    {
        "id": 20,
        "state": "en proceso",
        "fixedAssets": []
    },
    {
        "id": 13,
        "state": "Bueno",
        "fixedAssets": []
    },
    {
        "id": 3,
        "state": "Malo",
        "fixedAssets": []
    },
    {
        "id": 2,
        "state": "Regular",
        "fixedAssets": []
    }    
]

const assetStatesResponse = getResponse(getAssetStatesUrl, assetStates)
const assetStateResponse = getResponse(oneAssetStatesUrl, assetStates[0])
const handlers = [assetStatesResponse, assetStateResponse]
const server = new setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function renderWithRouter(componentToRender, pathToElement, mockedPath){
render( 
    <MemoryRouter initialEntries={[mockedPath]}>
        <Routes>
            <Route path={pathToElement} element={componentToRender}></Route>
        </Routes>
    </MemoryRouter>
)
}

function getResponse(url, jsonData=null, code=200, text=null){
    const response = rest.get(url, (req, res, ctx) => {
      if(code!=200) return res(ctx.status(code), ctx.text(text))
      return res(ctx.json(jsonData))
    })
    return response
}

describe('CRUD asset states', () => {  
   it('Shows all fixed asset states available', async () => {
     act(()=>{
       renderWithRouter(<ShowAssetStates/>,"/activos-fijos/estados","/activos-fijos/estados" )
     }) 
     await waitFor(() => {
         expect(screen.queryByText('Lista de Estados de Activos Fijos')).toBeVisible
         expect(screen.queryByText('Regular')).toBeVisible
         expect(screen.queryByText('Malo')).toBeVisible
         expect(screen.queryByText('en proceso')).toBeVisible
         expect(screen.queryByText('Verificar-estado')).toBeVisible
         expect(screen.queryByText('Dañado')).toBeVisible
         expect(screen.queryByText('Bueno')).toBeVisible
       })  
   })
   
  it('Shows error when api does not return any data. Should return error 500', async () => {
    const assetStatesInternalServiceErrorResponse = getResponse(getAssetStatesUrl, null, 500, "Lo sentimos, algo sucedió.")
    server.use(assetStatesInternalServiceErrorResponse)
    act(()=>{
      renderWithRouter(<ShowAssetStates/>,"/activos-fijos/estados","/activos-fijos/estados" )
    }) 
    await waitFor(() => {
        expect(screen.getByText("ERROR 500: Lo sentimos, algo sucedió.").toBeVisible)
      })  
  });
})