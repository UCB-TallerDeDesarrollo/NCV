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
    );
  });

  const fixedAssetInvalidIdResponse = rest.get(fixedAssetUrl, (req, res, ctx) => {
    return res(ctx.status(404));
  });

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
        expect(screen.getByText('DESCRIPCIÓN: Es un teclado razer')).toBeVisible
        expect(screen.getByText('FECHA DE ENTRADA: 2022-09-30')).toBeVisible
        expect(screen.getByText('PRECIO: 200')).toBeVisible
        expect(screen.getByText('CARACTERÍSTICAS: Color negro a medio uso')).toBeVisible
        expect(screen.getByText('CANTIDAD: 2')).toBeVisible
      })  
  });
});