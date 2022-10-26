import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import InputText from './InputText'
import { Box } from '@mui/system';
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
        <Box sx={{display:'flex', flexDirection:'row', alignItems :'center'}}>
        <InputText
          className="search__input"
          type="text"
          id="search"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{color:'#989a9f'}}/>
              </InputAdornment>
            ),
            borderRadius:5
          }}
        >
        
        </InputText>
        </Box>
      </form>
    </header>
  )
}

export default SearchBar