import {render, screen, waitFor} from '@testing-library/react';
import {ShowOneKidFile} from './ShowOneKidFile';

import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {act} from 'react-dom/test-utils';

import {MemoryRouter, Route, Routes} from 'react-router-dom'

describe('Show One Kid File', () => {
  const fileKidUrl ='https://ncv-api.herokuapp.com/api/kids/1';

  const fileKidResponse = rest.get(fileKidUrl, (req, res, ctx) => {
    return res(
      ctx.json(
        {
        "id":1,
        "firstName":"Pato",
        "lastName":"Oward",
        "ci":"3434582",
        "birthDate":"2003-03-03T00:00:00",
        "programHouse":"Av. Cualquier cosa #153",
        "birthPlace":"Mexico",
        "gender":"Masculino"}
        ),
    )
  })
  
  const fileKidIncompletedResponse = rest.get(fileKidUrl, (req, res, ctx) => {
    return res(ctx.json(
      {}
      ))})

  const handlers = [fileKidResponse];

  const server = new setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Show file kid data correctly', async () => {
    act(()=>{render( 
     <MemoryRouter initialEntries={["/ninos/1"]}>
        <Routes>
            <Route path="/ninos/:kidId" element={<ShowOneKidFile />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText('Pato')).toBeVisible
        expect(screen.getByText('Oward')).toBeVisible
        expect(screen.getByText('3434582')).toBeVisible
        expect(screen.getByText('3/3/2003')).toBeVisible
        expect(screen.getByText('Av. Cualquier cosa #153')).toBeVisible
        expect(screen.getByText('Mexico')).toBeVisible
        expect(screen.getByText('Masculino')).toBeVisible
      })  
  })

  it('Shows kid file data when is null', async () => {
    server.use(fileKidIncompletedResponse)
    act(()=>{render( 
     <MemoryRouter initialEntries={["/activos-fijos/1"]}>
        <Routes>
            <Route path="/activos-fijos/:fixedAssetId" element={<ShowOneKidFile />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
      expect(screen.getByText('Invalid Date')).toBeVisible
      expect(screen.getAllByText('-----')).toHaveLength(6)
      })  
  })
})