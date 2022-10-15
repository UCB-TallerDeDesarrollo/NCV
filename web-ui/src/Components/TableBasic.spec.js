import {render, screen, waitFor} from '@testing-library/react';
import TableBasic from './TableBasic'

describe('TableBasic', () => {
  it('should render the columnHeaders passed as an array of str', () => {
    let columnHeaders = ["Fecha","Peso","Talla"];
    render(<TableBasic columnHeaders={columnHeaders}/>);
    expect(screen.getAllByRole("columnheader").length).toBe(columnHeaders.length);
    expect(screen.getAllByRole("columnheader",{name:"Peso"}).length).toBe(1);
  });
});