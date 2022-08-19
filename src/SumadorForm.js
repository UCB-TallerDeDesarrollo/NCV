import InputWithLabel from './InputWithLabel';
import Button from './Button';
import {useState} from 'react';

function SumadorForm() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();
    setResultado(parseInt(numero1) + parseInt(numero2));
  }
  return (
    <div className="SumadorForm">
      <h3>Sumador</h3>
      <form onSubmit={handleFormSubmit}>
        <InputWithLabel
          type="number"
          id="numero1"
          value={numero1}
          onChange={event => setNumero1(event.target.value)}
        >
          Numero1:
        </InputWithLabel>
        <InputWithLabel
          type="number"
          id="numero2"
          value={numero2}
          onChange={event => setNumero2(event.target.value)}
        >
          Numero2:
        </InputWithLabel>
        <Button id="sumar-btn">Sumar</Button>
      </form>
      <div id="mensaje-suma">La suma de los numeros es:{resultado}</div>
    </div>
  );
}
export default SumadorForm;
