import {render, screen, waitFor} from '@testing-library/react';
import {ShowOneKidFile} from './ShowOneKidFile';

import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {act} from 'react-dom/test-utils';

import {MemoryRouter, Route, Routes, BrowserRouter} from 'react-router-dom'

describe('Show One Kid File', () => {
  const fileKidUrl =process.env.REACT_APP_BACKEND_URL + '/api/kids/1';
  const HealthReportUrl = process.env.REACT_APP_BACKEND_URL + '/api/kids/1/healthreports'

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
    
  const healthReportResponse = rest.get(HealthReportUrl, (req, res, ctx) => {
    return res(
      ctx.json(
        {"id":1,
        "kidId":1,
        "bloodType":"ABRH-",
        "ciDiscapacidad":"15678234",
        "psychologicalDiagnosis":"Diagnostico fisico de ejemplo",
        "neurologicalDiagnosis":"Diagnostico neurologico de ejemplo",
        "specialDiagnosis":"Diagnostico especial de ejemplo",
        "healthProblems":"Problemas de salud de ejemplo"}
        ),
    )
  })
  const healthReportIncompletedResponse = rest.get(HealthReportUrl, (req, res, ctx) => {
    return res(ctx.json(
      {}
      ))})

  const handlers = [fileKidResponse , healthReportResponse];

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
        expect(screen.getByText('Pato Oward')).toBeVisible
        expect(screen.getByText('3434582')).toBeVisible
        expect(screen.getByText('3/3/2003')).toBeVisible
        expect(screen.getByText('Av. Cualquier cosa #153')).toBeVisible
        expect(screen.getByText('Mexico')).toBeVisible
        expect(screen.getByText('Masculino')).toBeVisible
      })  
  })
/*
// ya no debido que se quito los guiones
  it('Shows kid file data when is null', async () => {
    server.use(fileKidIncompletedResponse)
    act(()=>{render( 
     <MemoryRouter initialEntries={["/ninos/1"]}>
        <Routes>
            <Route path="/ninos/:kidId" element={<ShowOneKidFile />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
      expect(screen.getByText('Invalid Date')).toBeVisible
      expect(screen.getAllByText(' ----- ')).toHaveLength(4)
      })  
  })
*/

  it('Show health report data correctly', async () => {
    server.use(healthReportResponse)
    act(()=>{render( 
     <MemoryRouter initialEntries={["/ninos/1"]}>
        <Routes>
            <Route path="/ninos/:kidId" element={<ShowOneKidFile />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText('ABRH-')).toBeVisible
        expect(screen.getByText('15678234')).toBeVisible
        expect(screen.getByText('Diagnostico fisico de ejemplo')).toBeVisible
        expect(screen.getByText('Diagnostico neurologico de ejemplo')).toBeVisible
        expect(screen.getByText('Diagnostico especial de ejemplo')).toBeVisible
        expect(screen.getByText('Problemas de salud de ejemplo')).toBeVisible
      })  
  })
/*
// ya no debido que se quito los guiones
  it('Shows health report data when is null', async () => {
    server.use(healthReportIncompletedResponse)
    act(()=>{render( 
     <MemoryRouter initialEntries={["/ninos/1"]}>
        <Routes>
            <Route path="/ninos/:kidId" element={<ShowOneKidFile />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
      expect(screen.getAllByText(" ----- ")).toHaveLength(6)
      })  
  })*/
})