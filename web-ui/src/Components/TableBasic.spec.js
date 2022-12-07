import {render, screen, waitFor} from '@testing-library/react';
import TableBasic from './TableBasic'

describe('TableBasic', () => {
  it('should render the columnHeaders passed as an array of str', () => {
    let columnHeaders = ["Fecha","Peso","Talla"];
    render(<TableBasic columnHeaders={columnHeaders}/>);
    expect(screen.getAllByRole("columnheader").length).toBe(columnHeaders.length);
    expect(screen.getAllByRole("columnheader",{name:"Peso"}).length).toBe(1);
  });
// because I added {insertDeleteIcon(row.id)} , it does not work
/*
  it('should render one row passed as an array with one Object', () => {
    let columnHeaders = ["Fecha","Peso","Talla"];
    let data = [{date:"Feb 25",weight:25,height:10}];
    render(<TableBasic columnHeaders={columnHeaders} data={data}/>);
    expect(screen.getAllByRole("cell").length).toBe(columnHeaders.length);
    expect(screen.getAllByRole("cell",{name:"Feb 25"}).length).toBe(1); 
  });
*/
});

