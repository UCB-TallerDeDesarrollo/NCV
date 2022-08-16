function Sumador() {
  return (
    <div className="Sumador">
      <h3>Sumador</h3>
      <form>
        <label for="numero1">Numero 1:</label>
        <input type="number" id="numero1"></input>
        <label for="numero2">Numero 2:</label>
        <input type="number" id="numero2"></input>
        <button id="sumar-btn">Sumar</button>
      </form>
    </div>
  );
}
export default Sumador;
