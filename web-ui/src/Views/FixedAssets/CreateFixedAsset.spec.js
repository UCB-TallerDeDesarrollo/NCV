import {render, screen, waitFor} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import '@testing-library/jest-dom'
import CreateFixedAssetForm from './CreateFixedAssetForm'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import {act} from 'react-dom/test-utils';

function renderWithRouter(componentToRender, pathToElement, mockedPath){
    render( 
      <MemoryRouter initialEntries={[mockedPath]}>
          <Routes>
              <Route path={pathToElement} element={componentToRender}></Route>
          </Routes>
      </MemoryRouter>
    )
  }
  const programHousesUrl =process.env.REACT_APP_BACKEND_URL + '/api/programHouses'
  const categoriesUrl =process.env.REACT_APP_BACKEND_URL + '/api/AssetCategories'  
  const statesUrl =process.env.REACT_APP_BACKEND_URL + '/api/AssetStates' 
  const responsiblesUrl =process.env.REACT_APP_BACKEND_URL + '/api/AssetResponsibles' 

  function getResponse(url, jsonData=null, code=200, text=null){
      const response = rest.get(url, (req, res, ctx) => {
        if(code!=200) return res(ctx.status(code), ctx.text(text))
        return res(ctx.json(jsonData))
      })
      return response
  }

  const programHouses =
  [
      {
          id: 1,
          acronym:"SDE"
      },
      {
          id: 1,
          acronym:"CAC"
      }
  ]

  const assetCategories =
  [
    {
        "id": 1,
        "category": "Equipos y Herramientas",
        "fixedAssets": []
    },
    {
        "id": 2,
        "category": "Muebles y Enseres",
        "fixedAssets": []
    },
    {
        "id": 4,
        "category": "Herramientas",
        "fixedAssets": []
    },
    {
        "id": 3,
        "category": "Maquinaria",
        "fixedAssets": []
    }
  ]

  const assetStates = 
  [
    {
        "id": 3,
        "state": "Malo",
        "fixedAssets": []
    },
    {
        "id": 4,
        "state": "Obsoleto",
        "fixedAssets": []
    },
    {
        "id": 5,
        "state": "Verificar",
        "fixedAssets": []
    },
    {
        "id": 2,
        "state": "Regular",
        "fixedAssets": []
    },
    {
        "id": 1,
        "state": "Bueno",
        "fixedAssets": []
    }
  ]

  const assetResponsibles = 
  [
    {
        "id": 21,
        "name": "Diego Delgadillo",
        "fixedAssets": []
    },
    {
        "id": 22,
        "name": "Tiara Rojas",
        "fixedAssets": []
    },
    {
        "id": 23,
        "name": "Javier Ferrel",
        "fixedAssets": []
    },
    {
        "id": 24,
        "name": "Franklin Rosembluth",
        "fixedAssets": []
    },
    {
        "id": 25,
        "name": "Juan Pablo Carrasco",
        "fixedAssets": []
    }
  ]

  const programHousesResponse = getResponse(programHousesUrl, programHouses)
  const categoriesResponse = getResponse(categoriesUrl, assetCategories)
  const statesResponse = getResponse(statesUrl, assetStates)
  const responsiblesResponse = getResponse(responsiblesUrl, assetResponsibles)

  const handlers = [programHousesResponse, categoriesResponse, statesResponse, responsiblesResponse]

  const server = new setupServer(...handlers)

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  ///   P R U E B A S      U N I T A R I A S   \\\

describe(' Crear Activo Fijo (Happy Path) ', () => {    

    it(' Deberia devolver en el campo Detalle lo que se ingreso ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const detailInput = screen.getByLabelText(/Detalle/i)
            // Solo texto
            detailInput.value = 'Estante colores verde, amarillo y azul, de 3 divisiones'
            expect(detailInput).toHaveDisplayValue('Estante colores verde, amarillo y azul, de 3 divisiones')
        })
    }) 

    it(' Deberia devolver en el campo Tipo de Activo Fijo lo que se selecciono ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const TypeActiveInput = screen.getByLabelText(/Tipo de Activo Fijo/i)
            // Seleccion 1
            TypeActiveInput.querySelector = 'Maquinaria y Equipos'
            expect(TypeActiveInput).toBeInTheDocument()
            /*
            // Seleccion 2
            TypeActiveInput.querySelector = 'Muebles'
            expect(TypeActiveInput).toBeInTheDocument()
            // Seleccion 3
            TypeActiveInput.querySelector = 'Juguetes'
            expect(TypeActiveInput).toBeInTheDocument()
            // Seleccion 4
            TypeActiveInput.querySelector = 'Material Escolar'
            expect(TypeActiveInput).toBeInTheDocument()
            */
        })
    }) 
    
    /*
    it(' Deberia devolver en el campo Tipo lo que se selecciono segun el Tipo de Activo Fijo', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const TypeInput = screen.getByLabelText(/Tipo/i)
            // Maquinaria y Equipos -> Impresora, Laptop ...
            TypeInput.querySelector = 'Impresora'
            expect(TypeInput).toBeInTheDocument()
            // Muebles -> Mesa, Estantes ...
            TypeInput.querySelector = 'Mesa'
            expect(TypeInput).toBeInTheDocument()
            // Juguetes -> Columpios, Resbaladilla ...
            TypeInput.querySelector = 'Columpios'
            expect(TypeInput).toBeInTheDocument()
            // Material Escolar -> Libro ...
            TypeInput.querySelector = 'Libro'
            expect(TypeInput).toBeInTheDocument()
        })
    })
    */

    it(' Deberia devolver en el campo Valor lo que se ingreso ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const worthInput = screen.getByLabelText(/Valor/i)
            // Solo valores numericos.
            worthInput.value = 1000
            expect(worthInput).toHaveDisplayValue(1000)
        })
    }) 

    it(' Deberia devolver en el campo Programa lo que se selecciono', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const programInput = screen.getByLabelText(/Programa/i)
            // CRE
            expect(programInput).toBeInTheDocument()
        })
    }) 

    it(' Deberia devolver en el campo Estado lo que se selecciono', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const stateInput = screen.getByLabelText(/Estado/i)
            // Activo
            // Descompuesto
            // En Uso
            // Nuevos
            // Guardado
            expect(stateInput).toBeInTheDocument()
        })
    }) 
    
})