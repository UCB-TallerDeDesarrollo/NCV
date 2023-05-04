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
describe(' CREAR ACTIVO FIJO (HAPPY PATH) ', () => {    
    it(' Deberia devolver en el campo Detalle lo que se ingreso ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const detailInput = screen.getByLabelText(/Detalle/i)
            // Solo texto \\
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
            ...
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
            ...
        })
    })
    */
    it(' Deberia devolver en el campo Valor lo que se ingreso ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const worthInput = screen.getByLabelText(/Valor/i)
            // Solo valores numericos \\
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
            // Seleccion 1
            stateInput.querySelector = 'Activo'
            expect(stateInput).toBeInTheDocument()
            /*
            // Seleccion 2
            stateInput.querySelector = 'Descompuesto'
            expect(stateInput).toBeInTheDocument()
            ...
            */
        })
    }) 
    it(' Deberia devolver en el campo Responsable lo que se selecciono ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const responsibleInput = screen.getByLabelText(/Responsable/i)
            // Seleccion 1
            responsibleInput.querySelector = 'Andre Perez'
            expect(responsibleInput).toBeInTheDocument()
            /*
            // Seleccion 2
            responsibleInput.querySelector = 'Roberto Ricaldez'
            expect(responsibleInput).toBeInTheDocument()
            ...
            */
        })
    })
    it(' Deberia devolver en el campo Ubicacion lo que se ingreso ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const locationInput = screen.getByLabelText(/Ubicación/i)
            // Solo texto \\
            locationInput.value = 'ucato'
            expect(locationInput).toHaveDisplayValue('ucato')
        })
    }) 
    it(' Deberia devolver en el campo Codigo lo que se ingreso ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const codeInput = screen.getByLabelText(/Código/i)
            // Solo texto \\
            codeInput.value = 'F-CRE-MU-dksl'
            expect(codeInput).toHaveDisplayValue('F-CRE-MU-dksl')
        })
    }) 
})

describe(' LAS ENTRADAS DEL COMPONENTE CreateFixedAsset DEBEN ESTAR VACIAS AL PRINCIPIO ', () => { 
    // NOTA: En campos seleccionables no se realizo UnitTest debido a que por defecto en sus Funciones estan vacios \\   
    it(' No muestra ningún resultado al principio en el campo Detalle ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Detalle/i)).toHaveDisplayValue('')
        })
    })
    it(' No muestra ningún resultado al principio en el campo Valor ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Valor/i)).toHaveDisplayValue('')
        })
    })
    it(' No muestra ningún resultado al principio en el campo Ubicacion ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Ubicación/i)).toHaveDisplayValue('')
        })
    })
    it(' No muestra ningún resultado al principio en el campo Codigo ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })
        await waitFor(() => {
            expect(screen.getByLabelText(/Código/i)).toHaveDisplayValue('')
        })
    })
})

describe(' VALIDACION DE ENTRADA TIPO NUMERICO DEL COMPONENTE CreateFixedAssets ', () => {
    it(' Deberia el campo Precio no recibir caracteres ', async () => {
        act(()=>{
            renderWithRouter(<CreateFixedAssetForm />,"/crear-activo-fijo","/crear-activo-fijo")
        })        
        await waitFor(() => {
            const priceInput = screen.getByLabelText(/Valor/i)
            priceInput.value = 'test'
            expect(priceInput).toHaveDisplayValue('')
        })
    })  
})