import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CrearActivoFijoForm from './components/CrearActivoFijoForm';

describe('Inputs del componente Crear Activo Fijo deben estar vacios al inicio', () => {
  it('No muestra ningun resultado al iniciar en el espacio Name', () => {
    render(<CrearActivoFijoForm/>);
    expect(screen.getByPlaceholderText('Nombre')).toHaveDisplayValue('');
  });
  it('No muestra ningun resultado al iniciar en el espacio Descripción', () => {
    render(<CrearActivoFijoForm/>);
    expect(screen.getByPlaceholderText('Descripción')).toHaveDisplayValue('');
  });
  it('No muestra ningun resultado al iniciar en el espacio Fecha de entrada', () => {
    render(<CrearActivoFijoForm/>);
    expect(screen.getByPlaceholderText('Fecha de entrada')).toHaveDisplayValue('');
  });
  it('No muestra ningun resultado al iniciar en el espacio Precio', () => {
    render(<CrearActivoFijoForm/>);
    expect(screen.getByPlaceholderText('Precio')).toHaveDisplayValue('');
  });
  it('No muestra ningun resultado al iniciar en el espacio Características', () => {
    render(<CrearActivoFijoForm/>);
    expect(screen.getByPlaceholderText('Características')).toHaveDisplayValue('');
  });
  it('No muestra ningun resultado al iniciar en el espacio Cantidad', () => {
    render(<CrearActivoFijoForm/>);
    expect(screen.getByPlaceholderText('Cantidad')).toHaveDisplayValue('');
  });
});
describe('Validando los inputs del componente Crear Activo Fijo', () => {
  it('Input Precio no puede recibir caracteres', () => {
    render(<CrearActivoFijoForm/>);
    var inputPrecio = screen.getByPlaceholderText('Precio');
    inputPrecio.value = "test";
    expect(inputPrecio).toHaveDisplayValue('');
  });
  it('Input Cantidad no puede recibir caracteres', () => {
    render(<CrearActivoFijoForm/>);
    var inputCantidad = screen.getByPlaceholderText('Cantidad');
    inputCantidad.value = "test";
    expect(inputCantidad).toHaveDisplayValue('');
  });
  it('Input Fecha no puede tener mas de 32 dias', () => {
    render(<CrearActivoFijoForm/>);
    var inputFechaEntrada = screen.getByPlaceholderText('Fecha de entrada');
    inputFechaEntrada.value = '2022-09-33';
    expect(inputFechaEntrada).toHaveDisplayValue('');
  });
  it('Input Fecha no puede tener mas de 12 meses', () => {
    render(<CrearActivoFijoForm/>);
    var inputFechaEntrada = screen.getByPlaceholderText('Fecha de entrada');
    inputFechaEntrada.value = '2022-13-03';
    expect(inputFechaEntrada).toHaveDisplayValue('');
  });
});