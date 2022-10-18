//orderCriteria funcion que ordena la lista con la logica enviada
//searchCriteria funcion que busca con la logica enviada. Referencia en showKidsFiles.js

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
        <input
          className="search__input"
          type="text"
          id="search"
          onChange={handleSearchChange}
        />

      </form>
    </header>
  )
}

export default SearchBar