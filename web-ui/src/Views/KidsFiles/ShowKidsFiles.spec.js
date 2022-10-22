import {render, screen, waitFor} from '@testing-library/react';
import { ShowKidsFiles } from './ShowKidsFiles'

import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {act} from 'react-dom/test-utils';

import {MemoryRouter, Route, Routes, Router} from 'react-router-dom'
import '@testing-library/jest-dom'

describe('Show Kids Files', () => {
    const filesKidsUrl ='https://ncv-api.herokuapp.com/api/kids';

    function getResponse(url, jsonData=null, code=200, text=null){
      const response = rest.get(url, (req, res, ctx) => {
        if(code!=200) return res(ctx.status(code), ctx.text(text))
        return res(ctx.json(jsonData))
      })
      return response
    }

    const filesKids =
  [
    {
      "id":42,
      "firstName":"Elizabeth",
      "lastName":"Ortega Lara",
      "ci":"79235642","birthDate":"2002-09-12T00:00:00",
      "programHouse":"SDE",
      "birthPlace":"Cochabamba - Cercado",
      "gender":"F"
    },
    {
      "id":45,
      "firstName":"Julieta",
      "lastName":"Venegas",
      "ci":"533846112",
      "birthDate":"2003-11-04T00:00:00",
      "programHouse":"SDE",
      "birthPlace":"Salta - Argentina",
      "gender":"F"
    },
    {
      "id":43,
      "firstName":"Sergio",
      "lastName":"Perez Ramirez",
      "ci":"1356746",
      "birthDate":"2008-09-27T00:00:00",
      "programHouse":"SDE",
      "birthPlace":"Guadalajara - Mexico",
      "gender":"M"
    }
  ]

  
  const filesKidsResponse = getResponse(filesKidsUrl, filesKids);
  const handlers = [filesKidsResponse];
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

  it('Show files kids data correctly', async () => {
    act(()=>{
      renderWithRouter(<ShowKidsFiles/>,"/ninos","/ninos" )
    }) 
      await waitFor(() => {
          expect(screen.getByText('Julieta Venegas')).toBeVisible
          expect(screen.getByText('Sergio Perez Ramirez')).toBeVisible
          expect(screen.getByText('Elizabeth Ortega Lara')).toBeVisible
        })  
  })

  it('Should capture searcher rendered correctly', () => {
    const {getByLabelText } = render(<Router><ShowKidsFiles/></Router>);
    const searcher = getByLabelText(/Buscador/i);
    expect(searcher).toBeInTheDocument();
  })


    

})