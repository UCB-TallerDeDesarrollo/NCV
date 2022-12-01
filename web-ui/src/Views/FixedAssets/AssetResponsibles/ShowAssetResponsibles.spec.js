import {render, screen, waitFor} from '@testing-library/react'
import ShowAssetResponsibles from './ShowAssetResponsibles'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {act} from 'react-dom/test-utils'

import {MemoryRouter, Route, Routes} from 'react-router-dom'

const getAssetResponsiblesUrl ='https://ncv-api.azurewebsites.net/api/assetResponsibles'  
const oneAssetResponsiblesUrl ='https://ncv-api.azurewebsites.net/api/assetResponsibles/1'   

const assetResponsibles =
  [
    {
        "id": 25,
        "name": "Diego Delgadillo",
        "fixedAssets": []
    },
    {
        "id": 24,
        "name": "Javier Ferrel",
        "fixedAssets": []
    },
    {
        "id": 23,
        "name": "Tiara Rojas",
        "fixedAssets": []
    },
    {
        "id": 22,
        "name": "Franklin Rosembluth",
        "fixedAssets": []
    },
    {
        "id": 21,
        "name": "Juan Pablo Carrasco",
        "fixedAssets": []
    },
    {
        "id": 20,
        "name": "Pedro Marquez",
        "fixedAssets": []
    }    
]

const assetResponsiblesResponse = getResponse(getAssetResponsiblesUrl, assetResponsibles)
const assetResponsibleResponse = getResponse(oneAssetResponsiblesUrl, assetResponsibles[0])
const handlers = [assetResponsiblesResponse, assetResponsibleResponse]
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
   it('Shows all fixed asset responsibles available', async () => {
     act(()=>{
       renderWithRouter(<ShowAssetResponsibles/>,"/activos-fijos/estados","/activos-fijos/responsables" )
     }) 
     await waitFor(() => {
         expect(screen.queryByText('Lista de Responsables de Activos Fijos')).toBeVisible
         expect(screen.queryByText('Diego Delgadillo')).toBeVisible
         expect(screen.queryByText('Javier Ferrel')).toBeVisible
         expect(screen.queryByText('Tiara Rojas')).toBeVisible
         expect(screen.queryByText('Franklin Rosembluth')).toBeVisible
         expect(screen.queryByText('Juan Pablo Carrasco')).toBeVisible
         expect(screen.queryByText('Pedro Marquez')).toBeVisible
       })  
   })
   
  it('Shows error when api does not return any data. Should return error 500', async () => {
    const assetResponsiblesInternalServiceErrorResponse = getResponse(getAssetResponsiblesUrl, null, 500, "Lo sentimos, algo sucedió.")
    server.use(assetResponsiblesInternalServiceErrorResponse)
    act(()=>{
      renderWithRouter(<ShowAssetResponsibles/>,"/activos-fijos/responsables","/activos-fijos/responsables" )
    }) 
    await waitFor(() => {
        expect(screen.getByText("ERROR 500: Lo sentimos, algo sucedió.").toBeVisible)
      })  
  });
})