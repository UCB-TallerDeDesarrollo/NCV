//orderCriteria funcion que ordena la lista con la logica enviada
//searchCriteria funcion que busca con la logica enviada. Referencia en showKidsFiles.js
import InputText from './InputText'

const SearchBar = ({posts, setSearchResults, orderCriteria, searchCriteria }) => {
  const handleSubmit = (e) => e.preventDefault()
  posts = orderCriteria(posts);
  
  const handleSearchChange = (e) => {
    const resultsArray = searchCriteria(e, posts);
    setSearchResults(resultsArray);
  }

  return (
    <header>
      <form className="search" onSubmit={handleSubmit}>
        <InputText
            id="search"
            label="Buscador"
            type="text"
            onChange={handleSearchChange}
        />

      </form>
    </header>
  )
}

export default SearchBar