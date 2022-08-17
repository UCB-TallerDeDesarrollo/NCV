import InputWithLabel from './InputWithLabel';
import Button from './Button';
function Sumador() {
  function handleButtonClicked(event) {
    event.preventDefault();
    console.log('Activado Boton');
  }
  return (
    <div className="Sumador">
      <h3>Sumador</h3>
      <form>
        <InputWithLabel
          type="number"
          id="numero1"
          onChange={() => console.log('Activado numero 1')}
        >
          Numero1:
        </InputWithLabel>
        <InputWithLabel
          type="number"
          id="numero2"
          onChange={() => console.log('Activado numero 2')}
        >
          Numero2:
        </InputWithLabel>
        <Button id="sumar-btn" onClick={handleButtonClicked}>
          Sumar
        </Button>
      </form>
    </div>
  );
}
export default Sumador;
