import { Button, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({posts, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault()
  console.log(posts);

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(posts)
    const resultsArray = posts.filter(post => post.firstName.includes(e.target.value) || post.lastName.includes(e.target.value))
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