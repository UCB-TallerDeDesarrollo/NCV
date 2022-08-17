import InputWithLabel from './InputWithLabel';
import Button from './Button';
function Sumador() {
  return (
    <div className="Sumador">
      <h3>Sumador</h3>
      <form>
        <InputWithLabel type="number">Numero1:</InputWithLabel>
        <InputWithLabel type="number">Numero2:</InputWithLabel>
        <Button id="sumar-btn">Sumar</Button>
      </form>
    </div>
  );
}
export default Sumador;
