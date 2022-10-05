import {render, screen, waitFor} from '@testing-library/react';
import {ShowFixedAsset} from './ShowOneFixedAsset';

import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {act} from 'react-dom/test-utils';

import {MemoryRouter, Route, Routes} from 'react-router-dom'

describe('Show Fixed Asset', () => {
  const fixedAssetUrl ='https://ncv-api.herokuapp.com/api/fixedAssets/1';

  const fixedAssetResponse = rest.get(fixedAssetUrl, (req, res, ctx) => {
    return res(
      ctx.json(
            {
                id: 1,
                name: "Teclado",
                description: "Es un teclado razer",
                entryDate: "2022-09-30T00:00:00",
                price: 200,
                features: "Color negro a medio uso",
                quantity: 2
            }
        ),
    )
  })

  const fixedAssetWithOnlyRequiredFields = rest.get(fixedAssetUrl, (req, res, ctx) => {
    return res(
        ctx.json(
            {
                id: 1,
                name: "cuaderno",
                description: null,
                entryDate: null,
                price: 50,
                features: null,
                quantity: 2
            }
          ),
      )
  })
  
  const fixedAssetInvalidIdResponse = rest.get(fixedAssetUrl, (req, res, ctx) => {
    return res(ctx.status(404), 
                ctx.text("El activo fijo con Id:1 no existe.")
               )
  })

  const fixedAssetInternalServiceErrorResponse = rest.get(fixedAssetUrl, (req, res, ctx) => {
    return res(ctx.status(500), 
                ctx.text("Lo sentimos, algo sucedió.")
               )
  })
  const handlers = [fixedAssetResponse];

  const server = new setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const renderWithRouter = ({children}) => (
    render(
      <MemoryRouter initialEntries={['activos-fijos/1']}>
        <Route path='activos-fijos/fixedAssetId'>
          {children}
        </Route>
      </MemoryRouter>
    )
  )

  it('Shows fixed asset data correctly', async () => {
    act(()=>{render( 
     <MemoryRouter initialEntries={["/activos-fijos/1"]}>
        <Routes>
            <Route path="/activos-fijos/:fixedAssetId" element={<ShowFixedAsset />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText('Teclado')).toBeVisible
        expect(screen.getByText('Es un teclado razer')).toBeVisible
        expect(screen.getByText('2022-09-30')).toBeVisible
        expect(screen.getByText('200')).toBeVisible
        expect(screen.getByText('Color negro a medio uso')).toBeVisible
        expect(screen.getByText('2')).toBeVisible
      })  
  })

  it('Shows fixed asset data when non-required fields are null', async () => {
    server.use(fixedAssetWithOnlyRequiredFields)
    act(()=>{render( 
     <MemoryRouter initialEntries={["/activos-fijos/1"]}>
        <Routes>
            <Route path="/activos-fijos/:fixedAssetId" element={<ShowFixedAsset />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText('cuaderno')).toBeVisible
        expect(screen.getByText('50')).toBeVisible
        expect(screen.getByText('2')).toBeVisible
        expect(screen.getAllByText('-----')).toHaveLength(3)
      })  
  })

  it('Shows error when accessing invalid fixed asset id', async () => {
    server.use(fixedAssetInvalidIdResponse)
    act(()=>{render( 
     <MemoryRouter initialEntries={["/activos-fijos/1"]}>
        <Routes>
            <Route path="/activos-fijos/:fixedAssetId" element={<ShowFixedAsset />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText("ERROR 404: El activo fijo con Id:1 no existe.").toBeVisible)
      })  
  })

  it('Shows error when accessing invalid fixed asset id', async () => {
    server.use(fixedAssetInvalidIdResponse)
    act(()=>{render( 
     <MemoryRouter initialEntries={["/activos-fijos/1"]}>
        <Routes>
            <Route path="/activos-fijos/:fixedAssetId" element={<ShowFixedAsset />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText("ERROR 404: El activo fijo con Id:1 no existe.").toBeVisible)
      })  
  });

  it('Shows error when api returns Internal Service Error', async () => {
    server.use(fixedAssetInternalServiceErrorResponse)
    act(()=>{render( 
     <MemoryRouter initialEntries={["/activos-fijos/1"]}>
        <Routes>
            <Route path="/activos-fijos/:fixedAssetId" element={<ShowFixedAsset />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText("ERROR 500: Lo sentimos, algo sucedió.").toBeVisible)
      })  
  });
})