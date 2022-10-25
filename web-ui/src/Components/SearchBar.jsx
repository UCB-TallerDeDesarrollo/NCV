//orderCriteria funcion que ordena la lista con la logica enviada
//searchCriteria funcion que busca con la logica enviada. Referencia en showKidsFiles.js
import { Box } from '@mui/system';
import InputText from './InputText'
import SearchIcon from '@mui/icons-material/Search';


const SearchBar = ({posts, setSearchResults, orderCriteria, searchCriteria }) => {
  const handleSubmit = (e) => e.preventDefault()
  posts = orderCriteria(posts);
  
  const handleSearchChange = (e) => {
    const resultsArray = searchCriteria(e, posts);
    setSearchResults(resultsArray);
  }

  return (
    <header>
      <Box sx={{width: '30%', display:'flex', flexDirection:'row', alignItems :'center'}}>
        <SearchIcon sx={{color:'#989a9f'}}/>
        <form className="search" onSubmit={handleSubmit}>
          <InputText
              id="search"
              label="Buscar..."
              type="text"
              onChange={handleSearchChange}
          />

        </form>
      </Box>
    </header>
  )
}

export default SearchBar