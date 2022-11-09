import {render, screen, waitFor} from '@testing-library/react';
import SingleItemCard from './SingleItemCard';
import {BrowserRouter as Router} from 'react-router-dom';

describe('SingleItemCard', () => {
  
  it('Show image when properties url passed', () => {
    let imageUrl = "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"
    render(<Router><SingleItemCard imageUrl={imageUrl}/></Router>);
    expect(screen.queryByRole("img")).toBeVisible;
  });

  it('Show gridElements when data elements is passed', () => {
    const MyKidDetails = { 
        "Edad ": 25 ,
        "Genero ": 'Masculino',
        "Carnet de Identidad (CI) " : 8796235, 
        "Fecha de Nacimiento ": '3/3/2003',
        "Programa de Casa " : 'Av. Cualquier cosa #11',
        "Lugar de Nacimiento ": 'España',
    };
    render(<Router><SingleItemCard element={MyKidDetails}/></Router>);
    expect(screen.getByText("Edad")).toBeVisible;
    expect(screen.getByText("Genero")).toBeVisible;
    expect(screen.getByText("Carnet de Identidad (CI)")).toBeVisible;
    expect(screen.getByText("Fecha de Nacimiento")).toBeVisible;
    expect(screen.getByText("Programa de Casa")).toBeVisible;
    expect(screen.getByText("Lugar de Nacimiento")).toBeVisible;

    expect(screen.getByText(25)).toBeVisible;
    expect(screen.getByText("Masculino")).toBeVisible;
    expect(screen.getByText(8796235)).toBeVisible;
    expect(screen.getByText("3/3/2003")).toBeVisible;
    expect(screen.getByText("Av. Cualquier cosa #11")).toBeVisible;
    expect(screen.getByText("España")).toBeVisible;
  });
});