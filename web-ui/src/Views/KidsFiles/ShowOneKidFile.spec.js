import {render, screen, waitFor} from '@testing-library/react';
import {ShowOneKidFile} from './ShowOneKidFile';

import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {act} from 'react-dom/test-utils';

import {MemoryRouter, Route, Routes, BrowserRouter} from 'react-router-dom'

describe('Show One Kid File', () => {
  const fileKidUrl ='https://ncv-api.azurewebsites.net/api/kids/1';
  const HealthReportUrl = 'https://ncv-api.azurewebsites.net/api/kids/1/healthreports'
  const legalReportUrl = 'https://ncv-api.azurewebsites.net/api/kids/1/legalreports'
  const contactsReportUrl = 'https://ncv-api.azurewebsites.net/api/kids/1/contacts'
  const educationReportUrl = 'https://ncv-api.azurewebsites.net/api/kids/1/educationreports'
  const familyReportUrl = 'https://ncv-api.azurewebsites.net/api/kids/1/familyreports'

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

  const legalReportResponse = rest.get(legalReportUrl, (req, res, ctx) => {
    return res(
      ctx.json(
        {"id":1,
        "kidId":1,
        "courtNumber":"12",
        "dna":"1234",
        "nurej":"12345667",
        "legalProcesses":"1234"}
        ),
    )
  })
  const legalReportIncompletedResponse = rest.get(legalReportUrl, (req, res, ctx) => {
    return res(ctx.json(
      {}
      ))})
  
const contactsReportResponse = rest.get(contactsReportUrl, (req, res, ctx) => {
    return res(
      ctx.json(
        {"name":"Chucho",
        "relationship":"tío",
        "contactNumber":"442411359",
        "address":"Av. Chucheria #55"}
        ),
    )
  })
  const contactsReportIncompletedResponse = rest.get(contactsReportUrl, (req, res, ctx) => {
    return res(ctx.json(
      {}
      ))})
  
const educationReportResponse = rest.get(educationReportUrl, (req, res, ctx) => {
    return res(
      ctx.json(
        {"id":1,
        "kidId":1,
        "grade":"Bachiller",
        "school":"Domingo Dominguero",
        "rude":"12354645138"}
        ),
    )
  })
  const educationReportIncompletedResponse = rest.get(educationReportUrl, (req, res, ctx) => {
    return res(ctx.json(
      {}
      ))})

const familyReportResponse = rest.get(familyReportUrl, (req, res, ctx) => {
    return res(
      ctx.json(
        {"siblingsInFoundation":2,
        "siblingsOutside":2,
        "hasExtendedFamily":true,
        "hasOriginFamily":true}
        ),
    )
  })
  const familyReportIncompletedResponse = rest.get(familyReportUrl, (req, res, ctx) => {
    return res(ctx.json(
      {}
      ))})

  const handlers = [fileKidResponse , healthReportResponse, legalReportResponse, contactsReportResponse, educationReportResponse, familyReportResponse];

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

  it('Show legal data correctly', async () => {
    act(()=>{render( 
     <MemoryRouter initialEntries={["/ninos/1"]}>
        <Routes>
            <Route path="/ninos/:kidId" element={<ShowOneKidFile />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText('12')).toBeVisible
        expect(screen.getByText('1234')).toBeVisible
        expect(screen.getByText('12345667')).toBeVisible
        expect(screen.getByText('1234')).toBeVisible
      })  
  })

  it('Show contact data correctly', async () => {
    act(()=>{render( 
     <MemoryRouter initialEntries={["/ninos/1"]}>
        <Routes>
            <Route path="/ninos/:kidId" element={<ShowOneKidFile />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText('Chucho')).toBeVisible
        expect(screen.getByText('tío')).toBeVisible
        expect(screen.getByText('442411359')).toBeVisible
        expect(screen.getByText('Av. Chucheria #55')).toBeVisible
      })  
  })

  it('Show education data correctly', async () => {
    act(()=>{render( 
     <MemoryRouter initialEntries={["/ninos/1"]}>
        <Routes>
            <Route path="/ninos/:kidId" element={<ShowOneKidFile />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText('Bachiller')).toBeVisible
        expect(screen.getByText('Domingo Dominguero')).toBeVisible
        expect(screen.getByText('12354645138')).toBeVisible
      })  
  })

  it('Show family data correctly', async () => {
    act(()=>{render( 
     <MemoryRouter initialEntries={["/ninos/1"]}>
        <Routes>
            <Route path="/ninos/:kidId" element={<ShowOneKidFile />}></Route>
        </Routes>
    </MemoryRouter>
    )})
    await waitFor(() => {
        expect(screen.getByText('2')).toBeVisible
        expect(screen.getByText('2')).toBeVisible
      })  
  })

})