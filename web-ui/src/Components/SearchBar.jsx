
const SearchBar = ({posts, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault()
  posts = posts.sort((a, b) => { return a.firstName.localeCompare(b.firstName)});
  
  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(posts)
    const resultsArray = posts.filter(post => post.firstName.includes(e.target.value) || post.lastName.includes(e.target.value) || post.ci.includes(e.target.value))
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